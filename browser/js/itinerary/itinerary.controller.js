'user strict';

tp.controller('ItineraryCtrl', function($scope, $rootScope){

	$scope.currentDay = null;

	$scope.setDate = function(dIndex){
		$scope.currentDay = dIndex;
		$scope.showItinerary(dIndex);
	}

	$scope.itineraryList = [];

	$rootScope.$on('addToItinerary', function(e, placeDetail){
		if(!$scope.currentDay) $scope.createADay();
		$scope.itineraryList[$scope.currentDay].push(placeDetail);
	})
	

	$scope.saveToItineraryList = function(list){
		//save to my Itinerary List
	}

	

	$scope.createADay = function(){
		var list = $scope.itineraryList;
		var i = list.length;
		list[list.length] = [];
		$scope.setDate(list.length - 1);
	}

	$scope.showItinerary = function(dIndex){
		$scope.itineraryItems = $scope.itineraryList[dIndex];
	}


	// $scope.optimize = function(itineraryList){
	// 	//optimize the distance, calculating the shortest time and distance
	// }

})