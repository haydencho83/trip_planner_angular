'use strict';

tp.config(function($stateProvider){
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '/js/login/login.template.html',
		controller: 'LoginCtrl'
	})
});
