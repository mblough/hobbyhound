angular.module('hobbyhound')
.controller('GameCtrl', ['$scope', 'users', 'games', '$modal', '$location', 'dashboard', 'Auth', function($scope, users, games, $modal, $location, dashboard, Auth) {
	$scope.profile = users.prof;
	$scope.isOwner = false;

	$scope.allGames = games.games;
	$scope.systemList = games.systemList;

	$scope.gameProgress = dashboard.gameProgress;

	$scope.rating = 0;
	$scope.max = 5;

	$scope.games = $scope.allGames;

	Auth.currentUser().then(function(user) {
		thisUser = user;
		if(thisUser.id == $scope.profile.id) {
			$scope.isOwner = true;
		}
	});

	$scope.setFilter = function(filterType) {
		$scope.games = [];
		var listLength = $scope.allGames.length;
		switch(filterType) {
			case 'all':
				$scope.games = $scope.allGames;
				break;
			case 'beaten':
				for (var j = 0; j < listLength; j++) {
					if ($scope.allGames[j].beaten) {
						$scope.games.push($scope.allGames[j]);
					}
				}
				break;
			case 'unfinished':
				for (var k = 0; k < listLength; k++) {
					if (!($scope.allGames[k].beaten)) {
						$scope.games.push($scope.allGames[k]);
					}
				}
				break;
			case 'playing':
				for (var h = 0; h < listLength; h++) {
					if ($scope.allGames[h].playing) {
						$scope.games.push($scope.allGames[h]);
					}
				}
		}
	};

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

	$scope.deleteGame = function(game) {
		if ($scope.isOwner) {
			games.delete(game.id).then(function() {
				if(game.beaten) {
					$scope.gameProgress.complete--;
				}
				$scope.gameProgress.total--;
				for (var i = 0; i < $scope.games.length; i++) {
					if ($scope.games[i].id === game.id) {
						$scope.games.splice(i, 1);
						break;
					}
				}
				for (var m = 0; m < $scope.allGames.length; m++) {
					if ($scope.allGames[m].id === game.id) {
						$scope.allGames.splice(m, 1);
						break;
					}
				}
			});
		}
	};
}]);