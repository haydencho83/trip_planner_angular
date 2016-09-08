'use strict';

tp.factory('It', function($rootScope, $http){
	
	var it = {};
	it.retrieveFromDB = function(){
		return $http.get('/api/days')
			.then(function(dataRetrieved){
				return dataRetrieved.data
			})
	}
	return it;
})