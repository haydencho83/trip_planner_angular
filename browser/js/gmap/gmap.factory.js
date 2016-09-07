'use strict';

tp.factory('Gmap', function($rootScope){
	
	var myLatLng = {lat: 40.71, lng: -74.00};
	var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 15, center: myLatLng});

	var gmap = {};
	gmap.autoCompleteService = new google.maps.places.AutocompleteService();
	gmap.placeService = new google.maps.places.PlacesService(map);
	

	gmap.addMarker = function(pos, img, obj){
		var marker = new google.maps.Marker({
			position: pos,
			draggable: true,
			icon: img,
			title: obj.title
		});
		marker.setMap(map)
	}

	gmap.setCenter = function(geometry){
		map.setCenter(geometry);
	}



	return gmap;
})