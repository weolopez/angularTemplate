'use strict';
angular.module('AppsDirective', [])
        .directive('crowdApps', function() {
            return {
                restrict: 'E',
                template: '<nav id="icon-list"><ul class="clearfix" ><li ng-repeat="type in appConfig" ng-class="{active: ( ($index === selectedIndex) && (type[\'toggle\']===undefined) )}" ng-hide="type.hide"><a ng-click="selectedType($index)"><i ng-class="type.icon"></i> <span>{{type.name}}</span></a></li></ul></nav>',
                scope: {
                    appConfig: '=',
                    currentType: '='
                },
                controller: function($scope, $location) {
                    $scope.selectedType = function(index) {
                        if (index === $scope.selectedIndex) {
//TODO reduce to 1                    
                            $scope.selectedIndex = undefined;
                            $scope.currentType = undefined;
                          //  $scope.markers = {};
                            return;
                        } else {
                            $scope.selectedIndex = index;
                            $scope.currentType = angular.copy($scope.appConfig[index]);
                        }

                        if ($scope.currentType.toggle !== undefined) {
                            $scope.appConfig[index].hide = !$scope.appConfig[index].hide;
                            $scope.appConfig[$scope.appConfig[index].toggle].hide = !$scope.appConfig[$scope.appConfig[index].toggle].hide;
                        }
                        
                        if ($scope.currentType.type === 'background')
                            $scope.isMap = !$scope.isMap;
                        
                        if ($scope.currentType.type === 'nav') {
                            $location.path('/' + $scope.currentType.path);
                        }
                        
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
                        
                    };
                }
            };

        })
        ;


