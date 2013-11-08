angular.module('App', ['ngRoute', 'ngAnimate', 'ngStorage', 'mongolabResourceHttp', 'AppsDirective', 'photoShareDirective', 'MapDirective'])
        .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/splash', {templateUrl: '../iheart/splash.html', controller: 'SplashCtrl'});
                $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
                $routeProvider.when('/apps', {templateUrl: '../iheart/apps.html', controller: 'SplashCtrl'});
                $routeProvider.when('/start', {templateUrl: 'partials/crowds.html', controller: 'CrowdsCtrl'});
                $routeProvider.when('/app/:crowdId/:appId', {templateUrl: '../iheart/apps.html', controller: 'AppsCtrl', resolve: {
                        crowdName: function($route) {
                            return $route.current.params.crowdId;
                        },
                        AppConfig: function(App, $route) {
                            return App.getCollection($route.current.params.appId).all();
                        }
                    }});
                $routeProvider.otherwise({redirectTo: '/splash'}); //crowds/crowds/Apps
            }])
        .constant('MONGOLAB_CONFIG', {API_KEY: '50f36e05e4b0b9deb24829a0', DB_NAME: 'weolopez'})
        .directive('eatClick', function() {
            return function(scope, element, attrs) {
                $(element).click(function(event) {
                    console.log('eat click');
                    event.preventDefault();
                });
            };
        })
        .animation('.animate-enter', function() {
            return {
                enter: function(element, done) {
                    $('#splash-screen').find('a').each(function(i) {
                        $(this).delay(i * 400).fadeIn();
                    });
                },
                leave: function(element, done) {
                    $('#splash-screen').find('a').each(function(i) {
                        $(this).hide();
                    });
                    jQuery(element).css({
                        position: 'absolute',
                        'z-index': 101,
                        top: 0,
                        opacity: 1
                    });
                    jQuery(element).animate({
                        top: -600,
                        opacity: 0
                    }, done);
                }
            };
        })
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
        .controller('SplashCtrl', function($scope, $http, $location, $rootScope, $localStorage) {
            $scope.currentCrowd = $localStorage.currentCrowd;
            if ($scope.currentCrowd === undefined)
                $scope.currentCrowd = 'Crowds';
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    $localStorage.position = angular.copy(position);
                });
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        })
        .controller('LoginCtrl', function($scope, $http, $location, $rootScope) {
        })
        .controller('CrowdsCtrl', function($scope, $http, $location, $rootScope, $window) {
        })
        .controller('AppsCtrl', function($scope, $http, $location, $rootScope, $localStorage, $sessionStorage, crowdName, AppConfig, PhotoServices) {
            var initializing = true;
            $scope.crowdName = crowdName;

            //INIT from mongo
            $scope.types = AppConfig[0].types;
            $scope.base = AppConfig[0].base;
            $scope.isMap = (AppConfig[0].isMap === 'true');
            $scope.appName = AppConfig[0].appName;

            //INIT APP STATE (TYPES) //TODO Normalize Types
            $scope.$sessionStorage = $localStorage;
            $scope.currentType = $localStorage.currentType;
            $scope.currentPin = $localStorage.currentPin;
            if ($scope.currentPin === undefined)
                $scope.currentPin = {
                    lat: $localStorage.position.coords.latitude,
                    lng: $localStorage.position.coords.longitude
                };

            if ($scope.currentType !== undefined)
                for (var i = 0; i < $scope.types.length; i++)
                    if ($scope.types[i].name === $scope.currentType.name) {
                        $scope.selectedIndex = i;
                        $scope.currentType = $scope.types[i];
                    }

            $scope.$on("TYPE_CHANGE", function(event, data) {
                if (initializing) {
                    initializing = false;
                    return;
                }
                $localStorage.currentType = data;
                if (newType === undefined) {
                    $scope.markers = {};
                    return;
                }

                //      if ($scope.currentType.type === 'background')
                //          $scope.isMap = !$scope.isMap;
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

            $scope.$on("PIN_CHANGE", function(event, data) {
                $localStorage.currentPin = data;
                if ($localStorage.currentPin.type.appType === 'setting') {
                    $scope.crowd = $localStorage.currentPin.crowd;
                    $scope.pinClicked = true;
                }
                else {
                var path = '/' + $localStorage.currentPin.type.appType + '/' + $scope.crowdName + '/' + $localStorage.currentPin.type.path;
                    console.log("Path" + path);
                    console.log($localStorage.currentPin.type.appTypee + "Marker:click:" + path);
                    $location.path(path);
                }
            });

            $scope.albums = {
                name: "PCHRY",
                deletehash: "2OOgsRAJRG2fK7T"
            };
        })
        ;

