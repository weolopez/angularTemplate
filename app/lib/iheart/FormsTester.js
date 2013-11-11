angular.module('FormsTesterApp', ['ngRoute', 'ngAnimate', 'ngStorage', 'mongolabResourceHttp', 'AppsDirective'])
        .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/splash', {templateUrl: 'splash.html', controller: 'SplashCtrl'});
                $routeProvider.when('/login', {templateUrl: 'forms/login.html', controller: 'LoginCtrl'});
                $routeProvider.when('/apps', {templateUrl: 'apps.html', controller: 'SplashCtrl'});
                $routeProvider.when('/start', {templateUrl: 'partials/crowds.html', controller: 'CrowdsCtrl'});
                $routeProvider.when('/app/:crowdId/:appId', {templateUrl: 'apps.html', controller: 'AppsCtrl', resolve: {
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
                $routeProvider.otherwise({redirectTo: '/splash'}); //crowds/crowds/Apps
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
        .controller('AppsCtrl', function($scope, $location, $localStorage, AppConfig) {
            //INIT MONGO
            $scope.types = AppConfig[0].types;

            $scope.$watch('currentType', function(newType, oldType) {
                $localStorage.currentType = newType;
            });
            
        })
        ;

