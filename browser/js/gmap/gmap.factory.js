'use strict';

tp.factory('Gmap', function($rootScope){
	var gmap = {};


	gmap.addMarker = function(pos, img, obj){
		var marker = new google.maps.Marker({
			position: pos,
			draggable: true,
			icon: img,
			title: obj.title
		});

		marker.setMap($rootScope.map)
	}




	return gmap;
})