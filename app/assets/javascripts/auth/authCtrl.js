angular.module('hobbyhound')
.controller('AuthCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth) {
	$scope.now = {};
	$scope.login = function() {
		Auth.login($scope.user).then(function() {
			$state.go('home');
		});
	};

	$scope.register = function() {
		Auth.register($scope.user).then(function() {
			$state.go('home');
		});
	};

	$scope.cancel = function() {
		$state.go('home');
	};

	$scope.updatePassword = function() {
		Auth.currentUser().then(function(user) {
			$scope.current_user = user;
			$scope.user.email = $scope.current_user.email;
			Auth.update($scope.user).then(function() {
				$scope.now.email = $scope.user.email;
				$scope.now.password = $scope.user.password;
				Auth.login($scope.now).then(function() {
					$state.go('home');
				});
			});
		});
	}
}]);