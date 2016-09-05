'use strict';

tp.controller('NavbarCtrl', function($scope, MapFactory){

  var service = new google.maps.places.AutocompleteService();
  var typedAheadPredictions;

  $scope.queriedResults = function(query){
  	service.getQueryPredictions({input: query}, function(predictions, status){
  		typedAheadPredictions = predictions;
  	})
  	return typedAheadPredictions;
  }

  $scope.assignToAttraction = MapFactory.assignToAttraction;

})

