'user strict';

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
				$scope.showItinerary($scope.currentDay-1);
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
		for (var i = 0; i < $scope.itineraryItems.length; i++){
			$scope.itineraryItems[i].distance = '';
			$scope.itineraryItems[i].duration = '';
		}
		$scope.itineraryItems = Gmap.calculateRoute($scope.itineraryItems);
		console.log($scope.itineraryItems);
		//NOW WE HAVE DISTANCE, DURATION
		//NEED TO REFLECT IN THE TEMPLATE AGAIN
	}

	$scope.delete = function(item){
		//ISSUE HERE(MIDDLE ITEM DELETION)
		$http.delete('/api/attractions/' + item.id)
			.then(function(){
				console.log('successfully deleted');
				$scope.itineraryItems = $scope.itineraryItems.filter(function(newItem){
					return newItem.id !== item.id;
				});
			})
			.then(function(){
				console.log('HIT this')
				$scope.showItinerary($scope.currentDay - 1);
			})
	}


	$scope.optimize = function(itineraryItems){
		//optimize the distance, calculating the shortest time and distance
		// Gmap.calculateRoute(itineraryItems);
	}



})