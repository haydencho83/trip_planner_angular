'user strict';

tp.controller('ItineraryCtrl', function($scope, $rootScope){
	$scope.itineraryList = [];

	$rootScope.$on('addToItinerary', function(e, placeDetail){
		$scope.itineraryList.push(placeDetail);
	})
	
})