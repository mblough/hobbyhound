angular.module('hobbyhound')
.controller('MovieCtrl', ['$scope', 'users', 'movies', '$modal', '$location', function($scope, users, movies, $modal, $location) {
	$scope.profile = users.prof;

	$scope.movies = movies.movies;

	$scope.rating = 0;
	$scope.max = 5;

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

	$scope.deleteMovie = function(movie) {
		movies.delete(movie).then(function() {
			for (var i = 0; i < $scope.movies.length; i++) {
				if ($scope.movies[i].id === movie.id) {
					$scope.movies.splice(i, 1);
					break;
				}
			}
		});
	};
}]);