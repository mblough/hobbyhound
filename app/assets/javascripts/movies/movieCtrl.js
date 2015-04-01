angular.module('hobbyhound')
.controller('MovieCtrl', ['$scope', 'users', 'movies', '$modal', '$location', 'dashboard', function($scope, users, movies, $modal, $location, dashboard) {
	$scope.profile = users.prof;

	$scope.movies = movies.movies;

	$scope.movieProgress = dashboard.movieProgress;

	$scope.rating = 0;
	$scope.max = 5;

	$scope.findProgressType = function(progress) {
		return dashboard.findProgressType(progress);
	};

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.addMovie = function() {
		movies.create({
			name: $scope.name,
			watched: $scope.watched,
			rating: $scope.rating,
			comment: $scope.comment
		});
	};

	$scope.deleteMovie = function(movieid) {
		movies.delete(movieid).then(function() {
			for (var i = 0; i < $scope.movies.length; i++) {
				if ($scope.movies[i].id === movieid) {
					$scope.movies.splice(i, 1);
					break;
				}
			}
		});
	};
}]);