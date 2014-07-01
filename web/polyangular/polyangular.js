/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


// Declare app level module which depends on filters, and services
angular.module('polyangular', [
    'ngRoute',
    'ngAnimate'
])
        .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/attrubutes', {templateUrl: 'polyangular/attrubutes.html', controller: 'attrubutes'});
                $routeProvider.when('/inclusion_rules', {templateUrl: 'polyangular/inclusion_rules.html', controller: 'inclusion_rules'});
                $routeProvider.when('/exclusion_rules', {templateUrl: 'polyangular/exclusion_rules.html', controller: 'exclusion_rules'});
                $routeProvider.when('/available_content', {templateUrl: 'polyangular/available_content.html', controller: 'available_content'});
                $routeProvider.otherwise({redirectTo: '/attrubutes'});
            }])
        .controller('attrubutes', function($scope) {
            $scope.name = 'weo!';
        })
        .controller('inclusion_rules', function($scope) {
            $scope.feedprovider = [
                { name:'teamsite', selected:false },
                { name:'cq5', selected:false },
                { name:'ecomm', selected:false }
            ];
            $scope.contentsize = [
                { name:'small', selected:false },
                { name:'medium', selected:false },
                { name:'large', selected:false }
            ];
            
            $scope.addProvider=true;
            $scope.checked = function(index){
               //alert($scope.feedprovider[index].selected+index);
                $scope.feedprovider[index].selected = !($scope.feedprovider[index].selected);
               //alert($scope.feedprovider[index].selected+index);
            }
            $scope.edit = function(index){
                $scope.feedprovider[index].addSize = !$scope.feedprovider[index].addSize;
                //alert($scope.feedprovider[index].selected);
            }
            $scope.addFP = function() {
                $scope.addProvider = !$scope.addProvider;
               // alert($scope.addProvider);
            }
        })
        .controller('exclusion_rules', function($scope) {
            $scope.feedprovider = [
                { name:'teamsite', selected:false },
                { name:'cq5', selected:false },
                { name:'ecomm', selected:false }
            ];
            $scope.contentsize = [
                { name:'small', selected:false },
                { name:'medium', selected:false },
                { name:'large', selected:false }
            ];
            
            $scope.addProvider=true;
            $scope.checked = function(index){
               //alert($scope.feedprovider[index].selected+index);
                $scope.feedprovider[index].selected = !($scope.feedprovider[index].selected);
               //alert($scope.feedprovider[index].selected+index);
            }
            $scope.edit = function(index){
                $scope.feedprovider[index].addSize = !$scope.feedprovider[index].addSize;
                //alert($scope.feedprovider[index].selected);
            }
            $scope.addFP = function() {
                $scope.addProvider = !$scope.addProvider;
               // alert($scope.addProvider);
            }
        })
        .controller('available_content', function($scope) {

        })
        ;

