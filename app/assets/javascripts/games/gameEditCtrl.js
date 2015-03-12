angular.module('hobbyhound')
.controller('GameEditCtrl', ['$scope', 'users', 'games', '$location', 'Auth', function($scope, users, games, $location, Auth) {

	$scope.gameToEdit = games.gameToEdit;
	$scope.systemList = games.systemList;

	$scope.systemChoice = $scope.systemList[$scope.systemList.map(function(e) { return e.value }).indexOf($scope.gameToEdit.system)];

	$scope.rating = 0;
	$scope.max = 5;

	$scope.thisUser;

	Auth.currentUser().then(function(user) {
		$scope.thisUser = user;
	});

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.updateGame = function() {
		$scope.gameToEdit.system = $scope.systemChoice.value.toString();
		games.editGame($scope.gameToEdit);
	};

}])