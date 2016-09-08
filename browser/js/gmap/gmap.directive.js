'use strict';

tp.directive('googleMap', function(){
	return {
		restrict: 'E',
		template: "<div class='map-container' id='map-canvas'></div>"
	}
})