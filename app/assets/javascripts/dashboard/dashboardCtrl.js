angular.module('hobbyhound')
.controller('DashboardCtrl', ['$scope', 'users', 'dashboard', function($scope, users, dashboard) {
	$scope.profile = users.prof;
	$scope.bookProgress = dashboard.bookProgress;
	$scope.gameProgress = dashboard.gameProgress;
	$scope.movieProgress = dashboard.movieProgress;
	$scope.showProgress = dashboard.showProgress;

	$scope.findProgressType = function(progress) {
		percentage = (progress.complete / progress.total) * 100;
		if(percentage > 75) {
			return "success";
		}
		else if(percentage > 50) {
			return "info";
		}
		else if(percentage > 25) {
			return "warning";
		}
		else {
			return "danger";
		}
	};
}]);