'use strict';

var tp = angular.module('TripPlanner', ['ui.router', 'ngMessages', 'ui.bootstrap']);

tp.run(function($state){
	$state.go('login');
});

