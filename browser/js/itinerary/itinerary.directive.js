'use strict';

tp.directive('itineraryTab', function(){
	return {
		restrict: 'E',
		templateUrl: '/js/itinerary/itinerary.template.html',
		controller: 'ItineraryCtrl'
	}
})