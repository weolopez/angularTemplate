angular.module('mapApp', ['ngRoute', 'ngAnimate', 'mongolabResourceHttp', 'ngStorage', 'iLoveCrowdsApp', 'photoShareDirective', 'AppsDirective', 'MapDirective'])
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
        .controller('MapCtrl', function($scope, $http, $location, $rootScope, $localStorage, $sessionStorage, appName, crowdName, AppConfig, PhotoServices) {
            var initializing = true;
    
            //SPECIAL CROWD USECASE
            if (appName === 'Crowd')
                appName = 'Crowds';
            $scope.appName = appName;
            $scope.crowdName = crowdName;
            
            //INIT from mongo
            $scope.types = AppConfig[0].types;
            $scope.base = AppConfig[0].base;           
            
            if ($scope.base === undefined)
                $scope.isMap = true;
            else
                $scope.isMap = false;
            //INIT APP STATE (TYPES) //TODO Normalize Types
            $scope.$sessionStorage = $localStorage;
            $scope.currentType = $localStorage.currentType;
            if ($scope.currentType !== undefined)
                for (var i = 0; i < $scope.types.length; i++)
                    if ($scope.types[i].name === $scope.currentType.name) {
                        $scope.selectedIndex = i;
                        $scope.currentType = $scope.types[i];
                    }

            $scope.$watch('currentType', function(newType, oldType) {
                if (initializing) {
                    initializing = false;
                    return;
                }
                $localStorage.currentType = newType;
                if (newType === undefined) {
                    $scope.markers = {};
                    return;
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
                    console.log("Path" + $scope.currentType.path);
                    //    $location.path('/' + $scope.currentType.path);
                }
                if ($scope.currentType.type === 'edit') {
                    console.log("Path" + $scope.currentType.path);
                    //    $location.path('/' + $scope.currentType.path);
                }

            });
            $scope.albums = {
                name: "PCHRY",
                deletehash: "2OOgsRAJRG2fK7T"
            };
            $scope.saveCrowd = function() {
                PhotoServices.createAlbum($scope.crowd.name + $scope.pins[currentPinIndex].name, $scope.pins[currentPinIndex].album, successCreateAlbum);
                $scope.pins[currentPinIndex].crowd = $scope.crowd;
                $scope.pinClicked = false;
                $localStorage.currentCrowd = $scope.crowd.name;
                console.log("Path" + "/");
                //     $location.path('/');
            };
            $scope.addPhoto = function() {
                PhotoServices.createAlbum($scope.crowd.name + $scope.pins[currentPinIndex].name, $scope.pins[currentPinIndex].album, successCreateAlbum);
                $('#fileinput').click();
            };
            $scope.deleteCrowd = function() {
                delete $scope.pins[currentPinIndex];
                console.log("Path" + "/");
                //     $location.path('/');
            };
            function successCreateAlbum(data, status, headers, config) {
                var ref = new Firebase(fb);
                angular.extend($scope.pins[currentPinIndex], {album: data.data});
                ref.set($scope.pins);
            }
            ;
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

