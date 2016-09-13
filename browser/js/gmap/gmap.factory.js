'use strict';

tp.factory('Gmap', function($rootScope){
	
	var myLatLng = {lat: 40.71, lng: -74.00};
	var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 15, center: myLatLng});

	var gmap = {};
	gmap.map = map;
	gmap.autoCompleteService = new google.maps.places.AutocompleteService();
	gmap.placeService = new google.maps.places.PlacesService(map);
	gmap.directionsService = new google.maps.DirectionsService();
	gmap.directionsDisplay = new google.maps.DirectionsRenderer;


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

	gmap.calculateRoute = function(itineraryItems){
		if (itineraryItems.length < 2 || !itineraryItems.length) return;
		var waypts = [];
		for (var i = 1; i < itineraryItems.length - 1; i++){
			waypts.push({location: itineraryItems[i].geometry, stopover: true});
		}

		gmap.directionsService.route({
			origin: new google.maps.LatLng(itineraryItems[0].geometry),
			destination: new google.maps.LatLng(itineraryItems[itineraryItems.length-1].geometry),
			waypoints: waypts,
			optimizeWaypoints: false,
			travelMode: 'DRIVING'
		}, function(response, status){
			
			for (var i = 0; i < response.routes[0].legs.length; i++){
				itineraryItems[i + 1].distance = (response.routes[0].legs[i].distance.text);
				itineraryItems[i + 1].duration = (response.routes[0].legs[i].duration.text);
			}
			
			gmap.directionsDisplay.setMap(map);
			gmap.directionsDisplay.setDirections(response);
			$rootScope.$broadcast('updatedDirections', itineraryItems);
		});

		// return itineraryItems;
	}

	return gmap;
})