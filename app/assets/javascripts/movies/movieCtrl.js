angular.module('hobbyhound')
.controller('MovieCtrl', ['$scope', 'users', 'movies', function($scope, users, movies) {
	$scope.profile = users.prof;
}]);