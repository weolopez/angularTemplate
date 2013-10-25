angular.module('mapApp', ['ngRoute', 'ngAnimate', 'leaflet-directive', 'mongolabResourceHttp', 'ngStorage', 'firebase'])
        .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/map/:id', {templateUrl: 'Map.html', controller: 'MapCtrl', resolve: {
                        AppConfig: function(App, $route) {
                            if ($route.current.params.id === undefined) return {};
                            else return App.getCollection($route.current.params.id).all();
                        },
                        app: function($route) {
                            return $route.current.params.id;
                        }
                    }});
                $routeProvider.otherwise({redirectTo: '/map/Crowds'});
            }])
        .constant('MONGOLAB_CONFIG', {API_KEY: '50f36e05e4b0b9deb24829a0', DB_NAME: 'weolopez'})
        .value('fbURL', 'https://crowds.firebaseio.com/')
        .value('AppConfig', {})
        .factory('App', function($mongolabResourceHttp) {
            return {
                getCollection: function(collection) {
                    console.log(collection);
                    return $mongolabResourceHttp(collection);
                }
            };
        })
        .directive('fileButton', function() {
            return {
                restrict: "A",
                template: '<form id="fileButton" method="post" enctype="multipart/form-data" ><input id="uploadInput" type="file" ng-model="file" style="display:none"/></form>',
                replace: true,
                controller: function($scope, $element, $rootScope) {
                    $rootScope.$on('handleBroadcast', function() {
                        $element.find('input').click();
                    });
                },
                link: function(scope, element, attributes, $rootScope) {
                    scope.album = '';
                    var albumDelete = "2OOgsRAJRG2fK7T";

                    element.find('input').on('click', function() {
                        this.value = null;
                    });
                    element.find('input').on('change', function() {
                        var file = this.files[0];
                        var fd = new FormData();
                        fd.append("image", file);
                        fd.append("album", albumDelete);
                        fd.append("Authorization", "4a358d16e826c56");
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", "https://api.imgur.com/3/image");
                        xhr.setRequestHeader("Authorization", "Client-ID 4a358d16e826c56");
                        xhr.send(fd);
                    });
                }
            };
        })
        .controller('MapCtrl', function($scope, $http, $location, $rootScope, $localStorage, $sessionStorage, App, angularFire, fbURL, AppConfig) {
            var url = $location.url();
            $scope.app = url.substring(url.lastIndexOf('/'),url.length);
            if (jQuery.isEmptyObject(AppConfig))
                $scope.AppConfig = App.getCollection($scope.app).all();
            else 
                $scope.AppConfig = AppConfig;
            $scope.$storage = $localStorage;
            var base = {
                center: {
                    zoom: 11
                },
                defaults: {
                    maxZoom: 25,
                    minZoom: 11,
                    controlLayersPosition: "topleft",
                    attributionControl: false,
                    tileLayer: "",
                    tileLayerOptions: {},
                    zoomControl: false
                },
                layers: {
                    baselayers: {
                        googleStreet: {
                            name: "Google Street",
                            layerType: "ROADMAP",
                            type: "google",
                            layerParams: {},
                            layerOptions: {}
                        },
                        googleTerrain: {
                            name: "Google Terrain",
                            layerType: "SATELLITE",
                            ltype: "google",
                            layerParams: {},
                            layerOptions: {}
                        }
                    }
                }
            };

            angular.extend($scope, base);
            $scope.$watch('AppConfig', function(appConfig) {
                if (appConfig === undefined)
                    return;
                $scope.appConfig = appConfig[0];
                $scope.types = $scope.appConfig.types;
                angular.extend($scope.center, {
                    lat: $localStorage.position.coords.latitude,
                    lng: $localStorage.position.coords.longitude,
                    zoom: $scope.appConfig.base.center.zoom
                });
            });

            var firePromis = angularFire(fbURL, $scope, 'crowds');

            firePromis.then(function(crowds) {
                $scope.$watch('crowds', function(updatedCrowds) {
                    updateMarkers();
                }, true);
            });

            function updateMarkers() {
                if ($scope.selectedIndex === undefined)
                    return;
                var currentType = $scope.appConfig.types[$scope.selectedIndex].name;
                for (var i = 0; i < $scope.crowds.length; i++) {
                    var marker = $scope.crowds[i];
                    if ((marker !== undefined) && (marker.marker !== undefined)) {
                        marker = marker.marker;
                        if (marker.type === currentType) {
                            marker.value[Object.keys(marker.value)[0]].icon = L.AwesomeMarkers.icon({
                                icon: $scope.types[$scope.selectedIndex].icon,
                                color: 'red'
                            });
                            angular.extend($scope.markers, marker.value);
                        }
                    }
                }

                angular.forEach($scope.markers, function(marker, key) {
                    if (marker.title !== currentType) {
                        delete $scope.markers[key];
                    }
                });
            }

            $scope.selectedType = function(index) {
                $scope.selectedIndex = index;

                if (index === $scope.CAMERA)
                    $rootScope.$broadcast('handleBroadcast');
                if ($scope.appConfig.types[index].type === 'marker') {
                    updateMarkers();
                }
            };

            $scope.$on('leafletDirectiveMap.click', function(e, args) {
                if ($scope.types[$scope.selectedIndex] === undefined)
                    alert("Please select a line type.");

                var count = Object.keys($scope.markers).length;
                var name = $scope.types[$scope.selectedIndex].name + count.toString();
                var marker = {};
                var redMarker = L.AwesomeMarkers.icon({
                    icon: $scope.types[$scope.selectedIndex].icon,
                    color: 'red'
                });
                marker[name] = {
                    lat: args.leafletEvent.latlng.lat,
                    lng: args.leafletEvent.latlng.lng,
                    title: $scope.types[$scope.selectedIndex].name,
                    focus: false,
                    draggable: true
                };
                $scope.crowds.push({marker: {
                        type: $scope.types[$scope.selectedIndex].name,
                        value: marker
                    }});
                marker[name].icon = redMarker;
                angular.extend($scope.markers, marker);

                //     console.log($scope.lines);
                //    $scope.allLines.$saveOrUpdate(changeSuccess, changeSuccess, changeError, changeError);
            });

            $scope.$on('leafletDirectiveMarker.click', function(e, args) {
                console.log(args);


                $localStorage.currentCrowd = args.leafletEvent.target.options.title;

                if ($scope.app === 'EditCrowd')
                    $scope.pinClicked = true;
                else {
                    $localStorage.currentCrowd = args.leafletEvent.target.options.title;
                    $location.path('/map/EditCrowd');
                }
            });
            $scope.$on('leafletDirectiveMarker.dragend', function(e, args) {
                console.log(args);
                $scope.crowds.push({marker: {
                        type: $scope.types[$scope.selectedIndex].name,
                        value: args.target
                    }});
            });

            function changeSuccess() {
                console.log("SUCCESS");
            }
            ;
            function changeError() {
                console.log("changeError");
            }
            ;
        })
        ;

