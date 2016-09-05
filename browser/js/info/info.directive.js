'use strict';

tp.directive('infoWindow', function(){
	return {
		restrict: 'E',
		templateUrl: '/js/info/info.template.html',
		controller: 'InfoCtrl'
	}
})