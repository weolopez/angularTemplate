angular.module('photoShareDirective',[])
        .directive('photoShare', function() {
    return {
        restrict: 'E',
        template: '<ul data-rn-carousel class="image" > <li ng-repeat="picture in pictures" style="background-image:url({{ picture.link}}); background-position: center; background-size: auto {{windowHeight}}px; background-repeat: no-repeat; height: {{windowHeight}}px;"> </li> </ul> <input id="fileinput" style="display: none;" type="file" name="file" onchange="angular.element(this).scope().uploadFile(this.files)"/>',
        scope: {
            onUpload: '&',
            album: '='
        },
        link: function(scope) {
            if (typeof window.innerWidth !== 'undefined') {
                scope.windowHeight = window.innerHeight - 40;
                scope.windowWidth = window.innerWidth - 40;
            }
           // $('.image').height('100%').parent().height('500px');
        },
        controller: function($scope, $http) {
            //TODO REMOVE STATIC DATA
          //  var album = "PCHRY";
          //  var albumDelete = "2OOgsRAJRG2fK7T";
            
            $http({method: 'GET', url: 'https://api.imgur.com/3/album/' + $scope.album.name + '/images',
                headers: {'Authorization': 'Client-ID 4a358d16e826c56'}})
                    .success(function(data, status, headers, config) {
                        $scope.pictures = data.data;//.slice(0, 5);
                    })
                    .error(function(data, status, hearders, config) {
                        console.log('ERROR');
                    });

            $scope.uploadFile = function(files) {
                var fd = new FormData();
                var file = files[0];
                fd.append("image", file);
                fd.append("album", $scope.album.deletehash );
                fd.append("Authorization", "Client-ID 4a358d16e826c56");
                $http.post('https://api.imgur.com/3/image', fd, {
                    headers: {
                        "Accept": "*/*",
                        "Authorization": "Client-ID 4a358d16e826c56"
                    },
                    transformRequest: function(data) {
                        return file;
                    },
                    album: $scope.album.deletehash
                })
                        .success(function(data, status, hearders, config) {
                            $scope.onUpload(data, status, hearders, config);
                })
                        .error(function(data, status, hearders, config) {
                            console.log('ERROR');
                        });
            };
            function createAlbum(crowdName, album, successCreate) {
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
        }
    };
});
