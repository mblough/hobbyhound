angular.module('hobbyhound')
.controller('MovieCtrl', ['$scope', 'users', 'movies', function($scope, users, movies) {
	$scope.profile = users.prof;

	$scope.movies = movies.movies

	$scope.rating = 0;
	$scope.max = 10;

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
	}
}]);