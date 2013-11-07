'use strict';
//TODO merge localStorage and angularFire into a service

angular.module('MapDirective', ['firebase', 'leaflet-directive', 'ngStorage'])
        .value('fbURL', 'https://crowds.firebaseio.com/')
        .directive('mapSynch', function() {
            return {
                restrict: 'E',
                template: '<leaflet defaults="defaults" markers="markers" center="center" layers="layers" events="events" height="100%" width="100%" style="position: absolute"></leaflet>',
                scope: {
                    base: '=',
                    crowdName: '=',
                    isMap: '=',
                    appName: '='
                },
                controller: function($scope, $location, $rootScope, $localStorage, angularFire, fbURL) {                    
                    if ($scope.base === undefined)
                        return;
                    $scope.currentPin = $localStorage.currentPin;
                    
                    //INIT MAP
                    $scope.markers = {};
                    angular.extend($scope, $scope.base);
                    angular.extend($scope.center, $scope.base.center);
                    angular.extend($scope.center, {
                        lat: $localStorage.position.coords.latitude,
                        lng: $localStorage.position.coords.longitude
                    });    
                    
                    if ($scope.currentPin !== undefined) addPin($scope.currentPin);

                    $scope.$on("TYPE_CHANGE", function(event, data) {
                        $scope.currentType = data;

                        if (data === undefined) {
                            $scope.markers = {};
                            return;
                        }
                        if (data.type === 'marker') {
                            if ($scope.pins === undefined)
                                return;
                            $scope.markers = {};
                            for (var i = 0; i < $scope.pins.length; i++) {
                                var pin = $scope.pins[i];
                                if (pin.type === data.name)
                                    addPin(pin);
                            }
                        }
                    });

                    //INIT FIREBASE current APP State
                    var fb = fbURL + $scope.crowdName + '/' + $scope.appName;
                    var firePromis = angularFire(fb, $scope, 'pins');
                    firePromis.then(function(pins) {
                        $scope.$watch('pins', function(updatedPins) {
                            if (($scope.currentType === undefined) ||
                                    ($scope.pins !== updatedPins) ||
                                    (updatedPins === undefined))
                                return;

                            var serverPins = [];
                            for (var i = 0; i < updatedPins.length; i++) {
                                var pin = updatedPins[i];
                                if ($scope.currentType.name === pin.type)
                                    serverPins.push(pin);
                            }

                            for (var i = 0; i < serverPins.length; i++) {
                                var pin = serverPins[i];
                                addPin(pin);
                            }
//TODO remove PIN from current Markers             
                            /*
                             angular.forEach($scope.markers, function(marker, key) {
                             if (marker.title !== currentType) {
                             delete $scope.markers[key];
                             }
                             });
                             */
                        }, true);
                    });
//TODO take $scope out of function
                    function addPin(pin) {
                        var marker = {};
                        var redMarker = L.AwesomeMarkers.icon({
                            icon: pin.icon,
                            color: 'red'
                        });
                        marker[pin.name] = {
                            lat: pin.lat,
                            lng: pin.lng,
                            title: pin.type,
                            focus: false,
                            draggable: true
                        };
                        marker[pin.name].icon = redMarker;
                        angular.extend($scope.markers, marker);
                    }

                    $scope.$on('leafletDirectiveMap.click', function(e, args) {
                        console.log("MAP:click");
                        if ($scope.currentType === undefined) {
                            alert("Please select a line type.");
                            return;
                        }

                        var name = $scope.crowdName + $scope.appName + $scope.pins.length;
                        var pin = {
                            name: name,
                            crowd: $scope.crowdName,
                            app: $scope.appName,
                            type: $scope.currentType.name,
                            icon: $scope.currentType.icon,
                            lat: args.leafletEvent.latlng.lat,
                            lng: args.leafletEvent.latlng.lng
                        };
                        addPin(pin);
                        $scope.pins.push(pin);
                    });
                    
                    $scope.$on('leafletDirectiveMarker.click', function(e, args) {
                        for (var i = 0; i < $scope.pins.length; i++) {
                            if ($scope.pins[i].name === args.markerName) {
                                $localStorage.currentPin = $scope.pins[i]; 
                                $rootScope.$broadcast("PIN_CHANGE", $scope.pins[i]);
                                
                                var path = '/' + $scope.currentType.appType + '/' + $scope.crowdName + '/' + $scope.currentType.path;

                                $localStorage.position.coords.latitude = args.leafletEvent.latlng.lat;
                                $localStorage.position.coords.longitude = args.leafletEvent.latlng.lng;
                                console.log($scope.currentType.appType + "Marker:click:" + path);

                                if ($scope.currentType.appType === '') {
                                    $scope.crowd = $scope.pins[i].crowd;
                                    $scope.pinClicked = true;
                                }
                                else {
                                    console.log("Path" + path);
                                    $location.path(path);
                                }
                            }
                        }
                    });
                    $scope.$on('leafletDirectiveMarker.dragend', function(e, args) {
                        console.log("Marker:dragend" + args.leafletEvent.target.getLatLng().lat);
                        console.log(args);
                        for (var i = 0; i < $scope.pins.length; i++) {
                            if ($scope.pins[i].name === args.markerName) {
                                $scope.pins[i].lat = args.leafletEvent.target.getLatLng().lat;
                                $scope.pins[i].lng = args.leafletEvent.target.getLatLng().lng;
                            }
                        }
                    });
                }
            };
        })
        ;


