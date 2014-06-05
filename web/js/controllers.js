'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource']).
        controller('MyCtrl1', [function() {

            }])
        .controller('MyCtrl2', function($scope, $resource) {
            var teams = $resource('teams.json').get(function(t) {
                $scope.teams = t.teams;
                $scope.games = t.games;
                $scope.v = t.flagurl;

                angular.forEach($scope.games, function(game, key) {
                    angular.forEach($scope.teams, function(team, key) {
                        if ((this.homeTeamName === team.Name) ||
                                (this.awayTeamName === team.Name)) {
                            if (team.games === undefined)
                                team.games = [];
                            team.games.push(this);
                        }
                    }, game);
                });
            });
            $scope.getURL = function(abbr) {
                return $scope.v.replace('XXXX', abbr);
            };
            $scope.getWidth = function(team) {

                if (window.innerWidth <= window.screen.width)
                    team.width = (window.innerWidth / 4) - 5;
                else
                    team.width = (window.screen.width / 1) - 1;
                return team.width;
                alert(window.innerWidth.toString() + "|" + window.screen.width + "|" + team.width)
            };
            $scope.flip = function(team) {
                team.isShown = !team.isShown;
                var mvp = document.getElementsByTagName('body');
                //mvp.setAttribute('style', 'transform translate(500px, 500px) scale(5,5);transform-origin 100px 100px');
                alert(mvp.getAttribute('testViewport'))
            }
            $scope.isShown = function(team) {
                if (team.isShown === undefined)
                    team.isShown = false;
                return team.isShown;
            }


        })
        .controller('main', function($scope, $resource) {
            $scope.$root.scrolledUp=true;
            $scope.isActive = true;
            $scope.clickHam = function() {
                $scope.isActive = !$scope.isActive;
            }
            var teams = $resource('teams.json').get(function(t) {
                $scope.teams = t.teams;
                $scope.games = t.games;
                $scope.v = t.flagurl;

                angular.forEach($scope.games, function(game, key) {
                    angular.forEach($scope.teams, function(team, key) {
                        if ((this.homeTeamName === team.Name) ||
                                (this.awayTeamName === team.Name)) {
                            if (team.games === undefined)
                                team.games = [];
                            team.games.push(this);
                        }
                    }, game);
                });
            });
            
        });