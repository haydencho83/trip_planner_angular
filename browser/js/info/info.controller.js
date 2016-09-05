'user strict';

tp.controller('InfoCtrl', function($scope, MapFactory, ItinFactory){

	var req = {
		placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
	};
	function cb(place, status) {
		console.log(place.geometry.location.lat())
	}
	MapFactory.service.getDetails(req, cb);


	$scope.attraction = MapFactory.getCurrentAttraction;


	
	$scope.createNewItinerary = function(){
		ItinFactory.createIt(1, $scope.attraction());
		console.log('created successfully')
	}

})