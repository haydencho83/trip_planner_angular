'use strict';

tp.directive('myItinerary', function(){
	return {
		restrict: 'E',
		templateUrl: '/js/myit/myit.template.html',
		controller: 'ItinCtrl'
	}
})