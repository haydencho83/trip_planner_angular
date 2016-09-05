'use strict';

tp.factory('ItinFactory', function($http){

	var itinerary = {};

	var itFactory = {};

	itFactory.createIt = function(date, attraction){
		if(itinerary[date]) itinerary[date].push(attraction);
		else itinerary[date] = [attraction];
	}

	itFactory.fetchAll = function(date){
		console.log(itinerary[1])
		return itinerary[date];
	}

	return itFactory;
})