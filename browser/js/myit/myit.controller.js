'user strict';

tp.controller('ItinCtrl', function($scope, ItinFactory){

	$scope.getAllItinerary = function(){
		var it = ItinFactory.fetchAll(1);
		console.log(it)
		return it;
		}
	
})