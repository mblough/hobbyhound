angular.module('hobbyhound')
.controller('ShowEditCtrl', ['$scope', 'users', 'shows', '$location', 'Auth', function($scope, users, shows, $location, Auth) {

	$scope.showToEdit = shows.showToEdit;

	$scope.rating = 0;
	$scope.max = 5;

	$scope.thisUser;

	Auth.currentUser().then(function(user) {
		$scope.thisUser = user;
		if($scope.thisUser.id != $scope.showToEdit.user_id) {
			$location.path("/users/" + thisUser.id + "/shows");
		}
	});

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.updateShow = function() {
		shows.editShow($scope.showToEdit);
	};
	
}])