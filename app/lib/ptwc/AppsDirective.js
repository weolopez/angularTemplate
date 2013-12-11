'use strict';
angular.module('AppsDirective', [])              
        .directive('crowdApps', function() {
            return {
                restrict: 'E',
                template: '<div id="il-wrap"><nav id="icon-list"><ul class="clearfix" ><li ng-repeat="type in appConfig" ng-class="{active: ( ($index === selectedIndex) && (type[\'toggle\']===undefined) )}" ng-hide="type.hide"><a ng-click="selectedType($index)"><i ng-class="type.icon"></i> <span>{{type.name}}</span></a></li></ul></nav></div>',
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


