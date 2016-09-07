tp.controller('LoginCtrl', function($scope, $http, $state){

	$scope.login = function(user){
		console.log(user);//email, password

		$http.post('/login', {email: user.email, password: user.password})
			.then(function(result){
				console.log('success: ', result)
			})
			.catch(function(fail){
				console.log('fail: ', fail)
			})
	}
})