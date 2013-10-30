angular.module('mapApp', ['ngRoute', 'ngAnimate', 'leaflet-directive', 'mongolabResourceHttp', 'ngStorage', 'firebase', 'iLoveCrowdsApp'])
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
        .directive('fileButton', function() {
            return {
                restrict: "A",
                template: '<form id="fileButton" method="post" enctype="multipart/form-data" ><input id="uploadInput" type="file" ng-model="file" style="display:none"/></form>',
                replace: true,
                controller: function($scope, $element, $rootScope) {
                    $rootScope.$on('handleBroadcast', function() {
                        $element.find('input').click();
                    });
                },
                link: function(scope, element, attributes, $rootScope, $localStorage) {
                    scope.album = '';
                    var albumDelete = "2OOgsRAJRG2fK7T";

                    element.find('input').on('click', function() {
                        this.value = null;
                    });
                    element.find('input').on('change', function() {
                        var file = this.files[0];
                        var fd = new FormData();
                        fd.append("image", file);
                        fd.append("album", albumDelete);
                        fd.append("Authorization", "4a358d16e826c56");
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", "https://api.imgur.com/3/image");
                        xhr.setRequestHeader("Authorization", "Client-ID 4a358d16e826c56");
                        xhr.send(fd);
                    });
                }
            };
        })
        .controller('MapCtrl', function($scope, $http, $location, $rootScope, $localStorage, $sessionStorage, appName, crowdName, angularFire, fbURL, AppConfig) {
            if (appName === 'Crowd')
                appName = 'Crowds';
            var fb = fbURL + crowdName + '/' + appName;
            $scope.AppConfig = AppConfig[0]; //TODO handle Mongo Down
            $scope.$sessionStorage = $localStorage;
            $scope.currentType = $localStorage.currentType;
            if ($scope.currentType !== undefined)
                for (var i = 0; i < $scope.AppConfig.types.length; i++)
                    if ($scope.AppConfig.types[i].name === $scope.currentType.name) {
                        $scope.selectedIndex = i;
                        $scope.currentType = $scope.AppConfig.types[i];
                    }
            $scope.markers = {};
            angular.extend($scope, $scope.AppConfig.base);
            angular.extend($scope.center, $scope.AppConfig.base.center);
            angular.extend($scope.center, {
                lat: $localStorage.position.coords.latitude,
                lng: $localStorage.position.coords.longitude
            });
            $scope.types = $scope.AppConfig.types;
            var firePromis = angularFire(fb, $scope, 'pins');
            firePromis.then(function(pins) {
                $scope.$watch('pins', function(updatedPins) {
                    if (($scope.currentType === undefined) ||
                            ($scope.pins !== updatedPins) ||
                            (updatedPins === undefined)
                            )
                        return;
                    console.log($scope.pins.length + "&" + updatedPins.length);
                    var serverPins = getMarkersFromServer(updatedPins);
                    mergePins(serverPins);
//TODO remove PIN from current Markers                    
                }, true);
            });
            function mergePins(serverPins) {
                for (var i = 0; i < serverPins.length; i++) {
                    var pin = serverPins[i];
                    addPin(pin);
                }
            }
            /*
             angular.forEach($scope.markers, function(marker, key) {
             if (marker.title !== currentType) {
             delete $scope.markers[key];
             }
             });
             */
            function getMarkersFromServer(updatedPins) {
                var localPins = [];
                for (var i = 0; i < updatedPins.length; i++) {
                    var pin = updatedPins[i];
                    if ($scope.currentType.name === pin.type)
                        localPins.push(pin);
                }
                return localPins;
            }

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


            $scope.selectedType = function(index) {
                if (index === $scope.selectedIndex) {
//TODO reduce to 1                    
                    $scope.selectedIndex = undefined;
                    $scope.currentType = undefined;
                    $localStorage.currentType = undefined;
                    $scope.markers = {};
                    return;
                }
                $scope.selectedIndex = index;
                $scope.currentType = angular.copy($scope.AppConfig.types[index]);
                $localStorage.currentType = $scope.currentType;
                if (index === $scope.CAMERA) // TODO make mongo defined
                    $rootScope.$broadcast('handleBroadcast');
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
            function changeSuccess() {
                console.log("SUCCESS");
            }
            ;
            function changeError() {
                console.log("changeError");
            }
            ;
            $scope.saveCrowd = function() {
                createAlbum($scope.crowd.name + $scope.pins[currentPinIndex].name);

                $scope.pins[currentPinIndex].crowd = $scope.crowd;
                $scope.pinClicked = false;
                $localStorage.currentCrowd = $scope.crowd.name;
                $location.path('/');
            };
            $scope.click = function() {                
                createAlbum($scope.crowd.name + $scope.pins[currentPinIndex].name);
                
                $rootScope.$broadcast('handleBroadcast');
                $location.path('/');
            };
            $scope.deleteCrowd = function() {
                delete $scope.pins[currentPinIndex];
                $location.path('/');
            };
            function createAlbum(crowdName) {
                
                if ($scope.pins[currentPinIndex].data !== undefined) return;
                
                var postData = {
                    title: crowdName,
                    privacy: "public"
                };

                $http({method: 'POST', url: 'https://api.imgur.com/3/album/',
                    headers: {'Authorization': 'Client-ID 4a358d16e826c56'},
                    data: postData
                }).success(function(data, status, headers, config) {
                    $scope.album = data;
                    var ref = new Firebase(fb);
                    angular.extend($scope.pins[currentPinIndex],data);
                    ref.set($scope.pins);
                }).error(function(data, status, hearders, config) {
                    console.log('ERROR');
                });
            }
        })
        ;

