'use strict';

tp.controller('NavbarCtrl', function($scope, $rootScope, Gmap){

  var typedAheadPredictions;

  $scope.queriedResults = function(query){
  	Gmap.autoCompleteService.getQueryPredictions({input: query}, function(predictions, status){
  		typedAheadPredictions = predictions;
  	})
  	return typedAheadPredictions;
  }

  $scope.assignPlaceIdToPlaceDetail = function(query){
  	$rootScope.$broadcast('query_place', query.place_id);
  }

})

