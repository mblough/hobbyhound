angular.module('hobbyhound')
.controller('GameCtrl', ['$scope', 'users', 'games', '$modal', '$location', 'dashboard', function($scope, users, games, $modal, $location, dashboard) {
	$scope.profile = users.prof;

	$scope.games = games.games;
	$scope.systemList = games.systemList;

	$scope.gameProgress = dashboard.gameProgress;

	$scope.rating = 0;
	$scope.max = 5;

	$scope.findProgressType = function(progress) {
		return dashboard.findProgressType(progress);
	};

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value/ $scope.max);
	};

	$scope.addGame = function() {
		games.create({
			name: $scope.name,
			system: $scope.system.value.toString(),
			beaten: $scope.beaten,
			playing: $scope.playing,
			rating: $scope.rating,
			comment: $scope.comment
		});
	};

	$scope.deleteGame = function(gameid) {
		games.delete(gameid).then(function() {
			for (var i = 0; i < $scope.games.length; i++) {
				if ($scope.games[i].id === gameid) {
					$scope.games.splice(i, 1);
					break;
				}
			}
		});
	};
}]);