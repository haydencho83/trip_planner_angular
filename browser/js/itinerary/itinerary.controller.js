'use strict';

tp.controller('ItineraryCtrl', function($log, $scope, $rootScope, $http, It, $state, Gmap){

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
	};

	$scope.deleteADay = function(){
		var newCurrentDay;
		$http.delete('/api/days/' + $scope.currentDay)
			.then(function(){
				$scope.itineraryList.splice($scope.currentDay - 1, 1);
				console.log($scope.currentDay + ' day is deleted');
				newCurrentDay = $scope.currentDay -1;
				$scope.setDate(newCurrentDay);
			})
			.then(function(){
				console.log('newCurrentDay: ', newCurrentDay);
				//update the day number if the deleted day was in the middle of itinerary list
				for (var i = 1; i <= $scope.itineraryList.length; i++){
					if ( i > newCurrentDay){//3
						return $http.put('/api/days/' + Number(i));//4
					}
				}
			})
			.then(function(){
				console.log('deleted')
			})
			.catch($log.error)
	};


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
				Gmap.calculateRoute($scope.itineraryItems);
				$scope.$evalAsync();
				// $scope.showItinerary($scope.currentDay - 1);
			})
	}

	$scope.getDetail = function(itineraryItem){
		$rootScope.$broadcast('query_place', itineraryItem.placeId);
	}

	$scope.optimize = function(itineraryItems){
		//optimize the distance, calculating the shortest time and distance
		// Gmap.calculateRoute(itineraryItems);
	}



})

