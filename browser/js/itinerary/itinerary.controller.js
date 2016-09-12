'use strict';

tp.controller('ItineraryCtrl', function($scope, $rootScope, $http, It, $state, Gmap){

	It.retrieveFromDB()
		.then(function(retrievedData){
			$scope.itineraryList = retrievedData || [];
			$scope.setDate(1);
		})

	$scope.setDate = function(dIndex){
		$scope.currentDay = dIndex;
		$scope.showItinerary(dIndex - 1);
	}

	$scope.$on('updatedDirections', function(e, updatedItineraryItems){
		$scope.itineraryItems = updatedItineraryItems;
		$scope.$evalAsync();
	});


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
				console.log('attraction has been added to my Itinerary list');
				// Gmap.calculateRoute($scope.itineraryItems);
				$scope.showItinerary($scope.currentDay - 1);
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
		 Gmap.calculateRoute($scope.itineraryList[dIndex]);
		 $scope.itineraryItems = $scope.itineraryList[$scope.currentDay - 1];
	}

	$scope.delete = function(item){
		$http.delete('/api/attractions/' + item.id)
			.then(function(){
				console.log('successfully deleted');
				$scope.itineraryItems = $scope.itineraryItems.filter(function(newItems){
					return newItems.id !== item.id;
				});
			})
			.then(function(){
				$scope.$evalAsync();
				// $scope.showItinerary($scope.currentDay - 1);

			})
	}


	$scope.optimize = function(itineraryItems){
		//optimize the distance, calculating the shortest time and distance
		// Gmap.calculateRoute(itineraryItems);
	}



})

