'user strict';

tp.controller('ItineraryCtrl', function($scope, $rootScope, $http, It, $state){

	It.retrieveFromDB()
		.then(function(retrievedData){
			$scope.itineraryList = retrievedData || [];
			$scope.setDate(1);
		})

	$scope.setDate = function(dIndex){
		$scope.currentDay = dIndex;
		$scope.showItinerary(dIndex - 1);
	}

	$scope.$on('addToItinerary', function(e, placeDetail){
		if ($scope.currentDay === null) $scope.createADay();

		$scope.itineraryList[$scope.currentDay - 1 ].push(placeDetail);

		//attraction: name, placeId, geometry
		$http.post('/api/days/' + $scope.currentDay + '/attractions', {
			name: placeDetail.name,
			placeId: placeDetail.placeId,
			geometry: placeDetail.geometry
		})
			.then(function(){
				console.log('attraction has been added to my Itinerary list')
			});

	})

	$scope.createADay = function(){
		var list = $scope.itineraryList;
		list[list.length] = [];

		$http.post('/api/days', {day: list.length})
			.then(function(){
				console.log(list.length, ' day is created');
			})

		$scope.setDate(list.length);
	}

	$scope.showItinerary = function(dIndex){
		$scope.itineraryItems = $scope.itineraryList[dIndex];
	}


	// $scope.optimize = function(itineraryList){
	// 	//optimize the distance, calculating the shortest time and distance
	// }

	$scope.delete = function(item){
		$http.delete('/api/attractions/' + item.id)
			.then(function(){
				console.log('successfully deleted');
				//refresh the page
				// $window.location.reload();
				$state.go($state.current, {}, {reload: true});
			})
	}

})