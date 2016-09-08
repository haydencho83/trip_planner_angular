tp.controller('LoginCtrl', function($scope, $http, $state){

	$scope.login = function(user){

		$http.post('/login', {email: user.email, password: user.password})
			.then(function(){
				$state.go('home')
			})
			.catch(function(){
				$state.go('loginfailure')
			})
	}
});