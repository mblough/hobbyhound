angular.module('hobbyhound')
.controller('MovieCtrl', ['$scope', 'users', 'movies', function($scope, users, movies) {
	$scope.profile = users.prof;

	$scope.movie = {};
	$scope.max = 10;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	
}]);