tp.controller('SignupCtrl', function($scope, $http, $state){

	$scope.signup = function(user){

		$http.post('/api/users', user)
			.then(function(createdUser){
				console.log(createdUser+' has been created');
				$state.go('home')
			})
	}
});