/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('ngFlippable', [])
	.directive('flippable', function() {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {},
			controller: function($scope, $element) {
				$scope.flipped = false;
				$scope.flip = function() {
					console.log('flipping..'+$scope.flipped.toString());
					$scope.flipped = !$scope.flipped;
				};
				this.addFront = function(front) {
					$scope.front = (front);
				};
				this.addBack = function(back) {
					$scope.back = (back);
				};
			},
			template:
				'<div class="flippable" ng-click="flip()">' +
				'<style>' +
				'.front { background-color: red; }' +
				'.back { background-color: blue; }' +
				'.flipped { background-color: green; }' +
				'</style>' +
				'<div ng-transclude></div>' +
				'</div>'
		};
	})
	.directive('front', function() {
		return {
			require: '^flippable',
			restrict: 'E',
			transclude: true,
			scope: {title: '@'},
			link: function(scope, element, attrs, flippableCtrl) {
				flippableCtrl.addFront(scope);
			},
			template:
				'<div class="" ng-class="{front:flipped}" ng-transclude>' +
				'</div>',
			replace: true
		};
	})
	.directive('back', function() {
		return {
			require: '^flippable',
			restrict: 'E',
			transclude: true,
			scope: {title: '@'},
			link: function(scope, element, attrs, flippableCtrl) {
				flippableCtrl.addBack(scope);
			},
			template:
				'<div class="" ng-class="{back:flipped}" ng-transclude>' +
				'</div>',
			replace: true
		};
	})
.directive('flip', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            flipped: '=?'
        },
        template:
            '<div class="flip">' +
                '<div class="card" ng-transclude></div>' +
            '</div>',
        controller: ['$scope', '$element', function($scope, $element) {
            this.toggle = function() {
                var flipped = !$element.hasClass('flipped');
                $scope.$apply(function() {
                    $scope.flipped = flipped;
                })
            };

            this.flipFront = function() {
                $scope.flipped = false;
            };

            this.flipBack = function() {
                $scope.flipped = true;
            }
        }],
        link: function(scope, elm, attrs) {
            scope.$watch('flipped', function(newValue, oldValue) {
                if (newValue) {
                    elm.addClass('flipped');
                } else {
                    elm.removeClass('flipped');
                }
            });
        }
    }
})
.directive('flipFront', function() {
    return {
        require: '^flip',
        restrict: 'E',
        replace: true,
        transclude: true,
        template:
            '<div class="face front" ng-transclude></div>'
    }
})
.directive('flipBack', function() {
    return {
        require: '^flip',
        restrict: 'E',
        replace: true,
        transclude: true,
        template:
            '<div class="face back" ng-transclude></div>'
    }
})
.directive('flipToggle', function() {
    return {
        require: '^flip',
        restrict: 'A',
        link: function(scope, elm, attrs, controller) {
            var previousValue;

            attrs.$observe('flipToggle', function(value) {
                if (!value) {
                    value = 'click'
                }

                if (previousValue) elm.off(previousValue, controller.toggle);

                previousValue = value;

                elm.on(value, controller.toggle);
            });
        }
    }
});