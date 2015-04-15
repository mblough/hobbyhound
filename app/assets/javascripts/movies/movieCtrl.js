angular.module('hobbyhound')
.controller('MovieCtrl', ['$scope', 'users', 'movies', '$modal', '$location', 'dashboard', function($scope, users, movies, $modal, $location, dashboard) {
	$scope.profile = users.prof;

	$scope.allMovies = movies.movies;

	$scope.movieProgress = dashboard.movieProgress;

	$scope.rating = 0;
	$scope.max = 5;

	$scope.movies = $scope.allMovies;

	$scope.findProgressType = function(progress) {
		return dashboard.findProgressType(progress);
	};

	$scope.setFilter = function(filterType) {
		$scope.movies = [];
		switch(filterType) {
			case 'all':
				$scope.movies = $scope.allMovies;
				break;
			case 'watched':
				for (var j = 0; j < $scope.allMovies.length; j++) {
					if($scope.allMovies[j].watched) {
						$scope.movies.push($scope.allMovies[j]);
					}
				}
				break;
			case 'unwatched':
				for (var k = 0; k < $scope.allMovies.length; k++) {
					if (!($scope.allMovies[k].watched)) {
						$scope.movies.push($scope.allMovies[k]);
					}
				}
				break;
		}
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
			for (var m = 0; m < $scope.allMovies.length; m++) {
				if ($scope.allMovies[m].id === movieid) {
					$scope.allMovies.splice(m, 1);
					break;
				}
			}
		});
	};
}]);