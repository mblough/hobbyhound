angular.module('hobbyhound')
.controller('DashboardCtrl', ['$scope', 'users', 'dashboard', 'Auth', function($scope, users, dashboard, Auth) {
	$scope.profile = users.prof;
	$scope.bookProgress = dashboard.getBookProgress2($scope.profile.id);
	$scope.gameProgress = dashboard.gameProgress;
	$scope.movieProgress = dashboard.movieProgress;
	$scope.showProgress = dashboard.showProgress;
	$scope.comments = dashboard.comments;
	$scope.isAuthorized = false;

	Auth.currentUser().then(function(user) {
		thisUser = user;
		if(thisUser != null) {
			$scope.isAuthorized = true;
		}
	});

	$scope.$apply;
	$scope.findProgressType = function(progress) {
		return dashboard.findProgressType(progress);
	};

	$scope.addComment = function() {
		dashboard.createComment({
			body: $scope.body,
			author: thisUser.id,
			authorname: thisUser.username
		}, $scope.profile.id);
	};
}]);