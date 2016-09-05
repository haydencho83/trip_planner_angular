'use strict';

tp.controller('DetailCtrl', function($scope, $rootScope){

	var service = new google.maps.places.PlacesService($rootScope.map);

	
	$rootScope.$on('query_place', function(e, id){
		$scope.place_id = id;
		service.getDetails({placeId: id}, function(detail, status){
			$scope.placeDetail = {
				place_id: id,
				name: detail.name,
				category: detail.types,
				address: detail.formatted_address,
				phone_number: detail.formatted_phone_number,
				opening_hours: detail.opening_hours.weekday_text,
				geometry: {lat: detail.geometry.location.lat(), lng: detail.geometry.location.lng()}
			}

			function addMarker(pos, img, obj){
			  var marker = new google.maps.Marker({
			    position: pos,
			    draggable: true,
			    icon: img,
			    title: obj.title
				  });
				marker.setMap($rootScope.map);
			}

			var myMarker = addMarker($scope.placeDetail.geometry, null, {title: $scope.placeDetail.name})
			$rootScope.map.setCenter($scope.placeDetail.geometry);
			myMarker.setMap($rootScope.map);

		})
	})
  
  $scope.addToItinerary = function(placeDetail){
  	$rootScope.$broadcast('addToItinerary', placeDetail)	
  }

})

