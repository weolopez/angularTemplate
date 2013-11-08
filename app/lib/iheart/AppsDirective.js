'use strict';
angular.module('AppsDirective', [])        
        .controller('SplashCtrl', function($scope, $http, $location, $rootScope, $localStorage) {
            $scope.currentCrowd = $localStorage.currentCrowd;
            if ($scope.currentCrowd === undefined) $scope.currentCrowd = 'Crowds';
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    $localStorage.position = angular.copy(position);
                });
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        })
        .directive('eatClick', function() {
            return function(scope, element, attrs) {
                $(element).click(function(event) {
                console.log('eat click');
                    event.preventDefault();
                });
            }
        })
        //TODO why does Apps exit animate not anything else
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
        .directive('crowdApps', function() {
            return {
                restrict: 'E',
                template: '<div><nav id="icon-list"><ul class="clearfix" ><li ng-repeat="type in appConfig" ng-class="{active: ( ($index === selectedIndex) && (type[\'toggle\']===undefined) )}" ng-hide="type.hide"><a ng-click="selectedType($index)"><i ng-class="type.icon"></i> <span>{{type.name}}</span></a></li></ul></nav><ng-include src="lib/iheart/forms/crowd.html"></ng-include></div>',
                scope: {
                    appConfig: '=',
                    currentType: '='
                },
                controller: function($scope, $location, $rootScope) {
                    $scope.selectedType = function(index) {
                        if (index === $scope.selectedIndex) {
                            $scope.selectedIndex = undefined;
                            $scope.currentType = undefined;
                        } else {
                            $scope.selectedIndex = index;
                            $scope.currentType = angular.copy($scope.appConfig[index]);

                            if ($scope.appConfig[index].toggle !== undefined) {
                                $scope.appConfig[index].hide = !$scope.appConfig[index].hide;
                                $scope.appConfig[$scope.appConfig[index].toggle].hide = !$scope.appConfig[$scope.appConfig[index].toggle].hide;
                            }
                        }
                        $rootScope.$broadcast("TYPE_CHANGE", $scope.currentType);
                    };
                    $scope.$on("TYPE_CHANGE", function(event, data) {
                        if (data === undefined)
                            return;

                        if (data.type === 'background')
                            $scope.isMap = !$scope.isMap;

                        if (data.type === 'nav') {
                            $location.path('/' + data.path);
                        }
                    });
                }
            };
        })
        ;


