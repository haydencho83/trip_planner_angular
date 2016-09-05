'use strict';

tp.directive('placeDetail', function(){
	return {
		restrict: 'E',
		templateUrl: '/js/placedetail/placedetail.template.html',
		controller: 'DetailCtrl'
	}
})