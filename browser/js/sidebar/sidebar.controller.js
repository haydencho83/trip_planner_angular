'use strict';

tp.controller('SidebarCtrl', function($scope, $http){

	$http.get('/api/hotel')
		.then(function(hotels){
			$scope.hotels = hotels.data;
		})


	$http.get('/api/restaurant')
		.then(function(restaurants){
			$scope.restaurants = restaurants.data;
		})

	$http.get('/api/activity')
		.then(function(activities){
			$scope.activities = activities.data;
		})


})