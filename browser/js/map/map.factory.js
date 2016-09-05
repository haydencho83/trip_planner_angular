'use strict';

tp.factory('MapFactory', function($http){

	var attractions = [];
	var attraction;
	

	var mFactory = {};
	
	mFactory.map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: -71, lng: 41},
    zoom: 17
  });

	mFactory.service = new google.maps.places.PlacesService(mFactory.map);


	mFactory.assignToAttraction = function(queryResult){
		attraction = queryResult;
		// console.log(attraction);
	}

	mFactory.getCurrentAttraction = function(){
		return attraction;
	}

	return mFactory;
})