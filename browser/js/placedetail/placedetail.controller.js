'use strict';

tp.controller('DetailCtrl', function($scope, $rootScope, Gmap){

	$scope.$on('query_place', function(e, id){

		Gmap.placeService.getDetails({placeId: id}, function(detail, status){

			var placeDetail = {};
			//visible part
			placeDetail.name = detail.name || null;
			placeDetail.category = detail.types.join(', ').replace(/_/g, ' ') || null;
			// should work on open_hours
			placeDetail.open = (detail.opening_hours.open_now ? 'OPEN' : 'CLOSED') || null;
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

			Gmap.addMarker($scope.placeDetail.geometry, null, {title: $scope.placeDetail.name});
			Gmap.setCenter($scope.placeDetail.geometry);
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

