'use strict';

tp.controller('NavbarCtrl', function($scope, $rootScope, Gmap){

  var myLatLng = {lat: 40.71, lng: -74.00};
  $rootScope.map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 15, center: myLatLng});


  var service = new google.maps.places.AutocompleteService();

  var typedAheadPredictions;

  $scope.queriedResults = function(query){
  	service.getQueryPredictions({input: query}, function(predictions, status){
  		typedAheadPredictions = predictions;
  	})
  	return typedAheadPredictions;
  }

  $scope.assignPlaceIdToAttraction = function(query){
  	$rootScope.$broadcast('query_place', query.place_id);
  }

})

