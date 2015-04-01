angular.module('hobbyhound')
.controller('DashboardCtrl', ['$scope', 'users', 'dashboard', function($scope, users, dashboard) {
	$scope.profile = users.prof;
	$scope.bookProgress = dashboard.bookProgress;
	$scope.gameProgress = dashboard.gameProgress;
	$scope.movieProgress = dashboard.movieProgress;
	$scope.showProgress = dashboard.showProgress;

	$scope.findProgressType = function(progress) {
		return dashboard.findProgressType(progress);
	};
}]);