angular.module('hobbyhound')
.controller('MovieEditCtrl', ['$scope', 'users', 'movies', '$location', 'Auth', function($scope, users, movies, $location, Auth) {

	$scope.movieToEdit = movies.movieToEdit;

	$scope.rating = 0;
	$scope.max = 5;

	$scope.thisUser;

	Auth.currentUser().then(function(user) {
		$scope.thisUser = user;
		if($scope.thisUser.id != $scope.movieToEdit.user_id) {
			$location.path("/users/" + thisUser.id + "/movies");
		}
	});

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.updateMovie = function() {
		movies.editMovie($scope.movieToEdit);
	};

}]);