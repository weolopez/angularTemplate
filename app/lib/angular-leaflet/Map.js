angular.module('mapApp', ['ngRoute', 'ngAnimate', 'leaflet-directive', 'mongolabResourceHttp', 'ngStorage', 'firebase', 'iLoveCrowdsApp','photoShareDirective'])
        .config(['$routeProvider', function($routeProvider) {
                $routeProvider.otherwise({redirectTo: '/home'});
                $routeProvider.when('/map/:crowdId/:appId', {templateUrl: 'Map.html', controller: 'MapCtrl', resolve: {
                        appName: function($route) {
                            return $route.current.params.appId;
                        },
                        crowdName: function($route) {
                            return $route.current.params.crowdId;
                        },
                        AppConfig: function(App, $route) {
                            return App.getCollection($route.current.params.appId).all();
                        }
                    }});
                $routeProvider.when('/home', {templateUrl: 'splash.html', controller: 'SplashCtrl'});
            }])
        .constant('MONGOLAB_CONFIG', {API_KEY: '50f36e05e4b0b9deb24829a0', DB_NAME: 'weolopez'})
        .value('fbURL', 'https://crowds.firebaseio.com/')
        .factory('App', function($mongolabResourceHttp) {
            return {
                getCollection: function(collection) {
//                    console.log(collection);
                    return $mongolabResourceHttp(collection);
                }
            };
        })
        .factory('PhotoServices', function($http) {
            return {
                createAlbum: function(crowdName, album, successCreate) {
                if (album !== undefined)
                    return;

                var postData = {
                    title: crowdName,
                    privacy: "public"
                };

                $http({method: 'POST', url: 'https://api.imgur.com/3/album/',
                    headers: {'Authorization': 'Client-ID 4a358d16e826c56'},
                    data: postData
                }).success(successCreate).error(function(data, status, hearders, config) {
                    console.log('ERROR');
                });
            }
            };
        })
        .controller('MapCtrl', function($scope, $http, $location, $rootScope, $localStorage, $sessionStorage, appName, crowdName, angularFire, fbURL, AppConfig, PhotoServices) {
            //SPECIAL CROWD USECASE
            if (appName === 'Crowd')
                appName = 'Crowds';

            //INIT MONGO
            $scope.AppConfig = AppConfig[0]; //TODO handle Mongo Down

            //INIT APP STATE (TYPES) //TODO Normalize Types
            $scope.$sessionStorage = $localStorage;
            $scope.currentType = $localStorage.currentType;
            $scope.types = $scope.AppConfig.types;
            if ($scope.currentType !== undefined)
                for (var i = 0; i < $scope.types.length; i++)
                    if ($scope.types[i].name === $scope.currentType.name) {
                        $scope.selectedIndex = i;
                        $scope.currentType = $scope.types[i];
                    }
                        
            $scope.albums = {
                name: "PCHRY",
                deletehash: "2OOgsRAJRG2fK7T"
            };
            
            //APP FUNCTION
            $scope.selectedType = function(index) {
                if (index === $scope.selectedIndex) {
//TODO reduce to 1                    
                    $scope.selectedIndex = undefined;
                    $scope.currentType = undefined;
                    $localStorage.currentType = undefined;
                    $scope.markers = {};
                    return;
                } else {
                    $scope.selectedIndex = index;
                    $scope.currentType = angular.copy($scope.types[index]);
                    $localStorage.currentType = $scope.currentType;
                }

                if ($scope.types[index].toggle !== undefined) {
                    $scope.types[index].hide = !$scope.types[index].hide;
                    $scope.types[$scope.types[index].toggle].hide = !$scope.types[$scope.types[index].toggle].hide;
                }
                if ($scope.currentType.type === 'background')
                    $scope.isMap = !$scope.isMap;

                if ($scope.currentType.type === 'marker') {
                    if ($scope.pins === undefined)
                        return;
                    $scope.markers = {};
                    for (var i = 0; i < $scope.pins.length; i++) {
                        var pin = $scope.pins[i];
                        if (pin.type === $scope.currentType.name)
                            addPin(pin);
                    }
                }
                if ($scope.currentType.type === 'nav') {
                    $location.path('/' + $scope.currentType.path);
                }
                if ($scope.currentType.type === 'edit') {
                    $location.path('/' + $scope.currentType.path);
                }
            };            
            
            //INIT MAP
            $scope.markers = {};
            angular.extend($scope, $scope.AppConfig.base);
            angular.extend($scope.center, $scope.AppConfig.base.center);
            angular.extend($scope.center, {
                lat: $localStorage.position.coords.latitude,
                lng: $localStorage.position.coords.longitude
            });

            //INIT FIREBASE current APP State
            var fb = fbURL + crowdName + '/' + appName;
            var firePromis = angularFire(fb, $scope, 'pins');
            firePromis.then(function(pins) {
                $scope.$watch('pins', function(updatedPins) {
                    if (($scope.currentType === undefined) ||
                            ($scope.pins !== updatedPins) ||
                            (updatedPins === undefined)
                            )
                        return;
                    
                    var serverPins = [];
                    for (var i = 0; i < updatedPins.length; i++) {
                        var pin = updatedPins[i];
                        if ($scope.currentType.name === pin.type)
                            serverPins.push(pin);
                    }

                    for (var i = 0; i < serverPins.length; i++) {
                        var pin = serverPins[i];
                        addPin(pin);
                    }
//TODO remove PIN from current Markers             
                    /*
                     angular.forEach($scope.markers, function(marker, key) {
                     if (marker.title !== currentType) {
                     delete $scope.markers[key];
                     }
                     });
                     */
                }, true);
            });
//TODO take $scope out of function
            function addPin(pin) {
                var marker = {};
                var redMarker = L.AwesomeMarkers.icon({
                    icon: pin.icon,
                    color: 'red'
                });
                marker[pin.name] = {
                    lat: pin.lat,
                    lng: pin.lng,
                    title: pin.type,
                    focus: false,
                    draggable: true
                };
                marker[pin.name].icon = redMarker;
                angular.extend($scope.markers, marker);
            }

            $scope.$on('leafletDirectiveMap.click', function(e, args) {
                console.log("MAP:click");
                if ($scope.currentType === undefined) {
                    alert("Please select a line type.");
                    return;
                }

                var name = crowdName + appName + $scope.pins.length;
                var pin = {
                    name: name,
                    crowd: crowdName,
                    app: appName,
                    type: $scope.currentType.name,
                    icon: $scope.currentType.icon,
                    lat: args.leafletEvent.latlng.lat,
                    lng: args.leafletEvent.latlng.lng
                };
                addPin(pin);
                $scope.pins.push(pin);
            });
            var currentPinIndex = undefined;
            $scope.$on('leafletDirectiveMarker.click', function(e, args) {
                for (var i = 0; i < $scope.pins.length; i++) {
                    if ($scope.pins[i].name === args.markerName) {
                        $localStorage.currentPin = $scope.pins[i];
                        currentPinIndex = i;
                        var path = '/' + $scope.currentType.appType + '/' + crowdName + '/' + $scope.currentType.path;

                        $localStorage.position.coords.latitude = args.leafletEvent.latlng.lat;
                        $localStorage.position.coords.longitude = args.leafletEvent.latlng.lng;
                        console.log($scope.currentType.appType + "Marker:click:" + path);

                        if ($scope.currentType.appType === '') {
                            $scope.crowd = $scope.pins[i].crowd;
                            $scope.pinClicked = true;
                        }
                        else
                            $location.path(path);
                    }
                }
            });
            $scope.$on('leafletDirectiveMarker.dragend', function(e, args) {
                console.log("Marker:dragend" + args.leafletEvent.target.getLatLng().lat);
                console.log(args);
                for (var i = 0; i < $scope.pins.length; i++) {
                    if ($scope.pins[i].name === args.markerName) {
                        $scope.pins[i].lat = args.leafletEvent.target.getLatLng().lat;
                        $scope.pins[i].lng = args.leafletEvent.target.getLatLng().lng;
                    }
                }
            });
            
            $scope.saveCrowd = function() {
                PhotoServices.createAlbum($scope.crowd.name + $scope.pins[currentPinIndex].name, $scope.pins[currentPinIndex].album,successCreateAlbum);

                $scope.pins[currentPinIndex].crowd = $scope.crowd;
                $scope.pinClicked = false;
                $localStorage.currentCrowd = $scope.crowd.name;
                $location.path('/');
            };
            $scope.addPhoto = function() {
                PhotoServices.createAlbum($scope.crowd.name + $scope.pins[currentPinIndex].name, $scope.pins[currentPinIndex].album, successCreateAlbum);

                $('#fileinput').click();
            };
            $scope.deleteCrowd = function() {
                delete $scope.pins[currentPinIndex];
                $location.path('/');
            };
            function successCreateAlbum(data, status, headers, config) {
                    var ref = new Firebase(fb);
                    angular.extend($scope.pins[currentPinIndex], {album: data.data});
                    ref.set($scope.pins);
                };
                
            
            $scope.uploadFile = function(files) {
                var fd = new FormData();
                var file = files[0];
                fd.append("image", file);
                fd.append("album", $scope.pins[currentPinIndex].album.deletehash);
                fd.append("Authorization", "Client-ID 4a358d16e826c56");
                $http.post('https://api.imgur.com/3/image', fd, {
                    headers: {
                        "Accept": "*/*",
                        "Authorization": "Client-ID 4a358d16e826c56"
                    },
                    transformRequest: function(data) {
                        return file;
                    },
                    album: $scope.pins[currentPinIndex].album.deletehash
                })
                        .success(function(data, status, headers, config) {
                            if ($scope.pins[currentPinIndex].album.photos === undefined)
                                $scope.pins[currentPinIndex].album.photos = [];
                            var ref = new Firebase(fb);
                            $scope.pins[currentPinIndex].album.photos.push(data.data);
                            ref.set($scope.pins);
                        })
                        .error(function(data, status, hearders, config) {
                            console.log('ERROR');
                        });
            };
        })
        ;

