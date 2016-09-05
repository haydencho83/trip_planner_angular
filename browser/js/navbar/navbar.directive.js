'use strict';

tp.directive('navBar', function(){
	return {
		restrict: 'E',
		templateUrl: '/js/navbar/navbar.template.html',
		controller: 'NavbarCtrl'
	}
})