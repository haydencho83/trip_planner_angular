'use strict';

tp.controller('DetailCtrl', function($scope, $rootScope, Gmap){

	var service = new google.maps.places.PlacesService($rootScope.map);

	$scope.$on('query_place', function(e, id){

		service.getDetails({placeId: id}, function(detail, status){

			var placeDetail = {};
			//visible part
			placeDetail.name = detail.name || null;
			placeDetail.category = detail.types.join(', ').replace(/_/g, ' ') || null;
			placeDetail.open = detail.opening_hours.open_now ? 'OPEN' : 'CLOSED' || null;
			placeDetail.price = detail.price_level || null;
			placeDetail.rating = detail.rating || null;
			placeDetail.photos = detail.photos || null;
			placeDetail.website = detail.website || null;
			
			//contact
			placeDetail.number = detail.formatted_phone_number || null;
			placeDetail.address = detail.formatted_address || null;
			
			//invisible part
			placeDetail.placeId = id;
			placeDetail.geometry = {lat: detail.geometry.location.lat(), lng: detail.geometry.location.lng()} || null;
			

			$scope.placeDetail = placeDetail;



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

  $scope.isShowingDetails = false;

  $scope.showDetails = function(){
  	$scope.isShowingDetails = !$scope.isShowingDetails;
  	return $scope.isShowingDetails;
  }

})

