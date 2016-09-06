'user strict';

tp.controller('ItineraryCtrl', function($scope, $rootScope){
	$scope.itineraryList = [];

	$rootScope.$on('addToItinerary', function(e, placeDetail){
		$scope.itineraryList.push(placeDetail);
	})
	

	$scope.saveToItineraryList = function(list){
		//save to my Itinerary List
	}

	$scope.optimize = function(itineraryList){
		//optimize the distance, calculating the shortest time and distance
	}

})