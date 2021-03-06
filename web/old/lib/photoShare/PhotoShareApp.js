angular.module('photoShareApp', ['ngRoute', 'ngAnimate', 'photoShareDirective'])
        .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/photoShare', {templateUrl: 'photoShare.html', controller: 'PhotoShareCtrl'});
                $routeProvider.otherwise({redirectTo: '/photoShare'});
            }])
        .controller('PhotoShareCtrl', function($scope, $http, $rootScope) {
            $scope.albums = {
                name: "PCHRY",
                deletehash: "2OOgsRAJRG2fK7T"
            };
            $scope.COMMENT = 1;
            $scope.CAMERA = 0;

            $scope.types = [
                {
                    "name": "Add ",
                    "icon": "icon-camera"
                },
                {
                    "name": "Comment ",
                    "icon": "icon-comment"
                }
            ];
            $scope.commentActions = [
                {
                    "name": "Add",
                    "icon": "icon-camera"
                },
                {
                    "name": "Comment ",
                    "icon": "icon-comment"
                }
            ];
            $scope.comments = [
                {
                    id: "1",
                    text: "This was so funny"
                },
                {
                    id: "2",
                    text: "I love this line!"
                },
                {
                    id: "1",
                    text: "This was so funny"
                },
                {
                    id: "2",
                    text: "I love this line!"
                },
                {
                    id: "1",
                    text: "This was so funny"
                },
                {
                    id: "2",
                    text: "I love this line!"
                },
                {
                    id: "1",
                    text: "This was so funny"
                },
                {
                    id: "2",
                    text: "I love this line!"
                },
                {
                    id: "1",
                    text: "This was so funny"
                },
                {
                    id: "2",
                    text: "I love this line!"
                },
                {
                    id: "1",
                    text: "This was so funny"
                },
                {
                    id: "2",
                    text: "I love this line!"
                },
                {
                    id: "1",
                    text: "This was so funny"
                },
                {
                    id: "2",
                    text: "I love this line!"
                },
                {
                    id: "1",
                    text: "This was so funny"
                },
                {
                    id: "2",
                    text: "I love this line!"
                },
                {
                    id: "1",
                    text: "This was so funny"
                },
                {
                    id: "2",
                    text: "I love this line!"
                },
                {
                    id: "1",
                    text: "I love this crowd!"
                }
            ];

            $scope.crowd = "work";
            var postData = {
                title: $scope.crowd,
                privacy: "public"
            };

            /*   $http({method: 'POST', url: 'https://api.imgur.com/3/album/',
             headers: {'Authorization': 'Client-ID 4a358d16e826c56'},
             data: postData
             }).success(function(data, status, headers, config) {
             $scope.album = data; 
             })
             .error(function(data, status, hearders, config) {
             console.log('ERROR');
             });
             
             
             $http({method: 'GET', url: 'https://api.imgur.com/3/album/' + album + '/images',
             headers: {'Authorization': 'Client-ID 4a358d16e826c56'}})
             .success(function(data, status, headers, config) {
             $scope.pictures = data.data;//.slice(0, 5);
             })
             .error(function(data, status, hearders, config) {
             console.log('ERROR');
             });
             */
            $scope.sportImages = [];
            for (var j = 0; j < 10; j++) {
                $scope.sportImages.push('http://lorempixel.com/400/200/sports/' + j + '/');
            }

            if (typeof window.innerWidth !== 'undefined') {
                $scope.windowHeight = window.innerHeight - 40;
                $scope.windowWidth = window.innerWidth - 40;
            }

            $scope.selectedType = function(index) {
                if (index === $scope.CAMERA)
                    $('#fileinput').click();
                //  $rootScope.$broadcast('handleBroadcast');
                
                if (index === $scope.selectedIndex) {
                    $scope.selectedIndex = undefined;
                    return;
                }
                $scope.selectedIndex = index;
            };
            
            $scope.uploaded = function(data, status, headers, config) {
                if ($scope.pins[currentPinIndex].album.photos === undefined)
                    $scope.pins[currentPinIndex].album.photos = [];
                var ref = new Firebase(fb);
                $scope.pins[currentPinIndex].album.photos.push(data.data);
                ref.set($scope.pins);
            };
            
            $scope.uploadFile = function(files) {
                var fd = new FormData();
                var file = files[0];
                fd.append("image", file);
                fd.append("album", albumDelete);
                fd.append("Authorization", "Client-ID 4a358d16e826c56");
                $http.post('https://api.imgur.com/3/image', fd, {
                    headers: {
                        "Accept": "*/*",
                        "Authorization": "Client-ID 4a358d16e826c56"
                    },
                    transformRequest: function(data) {
                        return file;
                    },
                    album: albumDelete
                })
                        .success(function(data, status, headers, config) {
                            console.log('success' + data);//.slice(0, 5);
                        })
                        .error(function(data, status, hearders, config) {
                            console.log('ERROR');
                        });

            };
        });

/*
 * data
 Object { id="PCHRY", deletehash="2OOgsRAJRG2fK7T"}
 
 id
 "PCHRY"
 
 deletehash
 "2OOgsRAJRG2fK7T"
 */