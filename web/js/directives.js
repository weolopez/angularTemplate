'use strict';

/* Directives */


angular.module('myApp.directives', []).
        directive('appVersion', ['version', function(version) {
                return function(scope, elm, attrs) {
                    elm.text(version);
                };
            }])
        .directive("scroll", function() {
            return function(scope, element, attrs) {
                
                angular.element(element).bind("scroll", function() {
                    if (scope.y > this.scrollTop) {
                     //  console.log("scroll up");
                        scope.$root.scrolledUp = true;
                        scope.$root.direction = "UP";
                    }
                    else {
                       // console.log("scroll down");
                        scope.$root.scrolledUp = false;
                        var s = scope;
                        s.$root.direction = "DOWN";
                    }
                    scope.y = this.scrollTop;
                    scope.$apply();
                });
            }
        })        
        .directive('cols', function() {
            return function(scope, elm, attrs) {
                scope.tileWidth = (window.innerWidth / attrs.cols);
                    elm.css('width', scope.tileWidth+'px');
                    elm.css('height', ((scope.tileWidth*3) /4)+'px');
                    elm.css('font-size', ((scope.tileWidth*3) /4)+'px');
            }
        });
