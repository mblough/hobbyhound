angular.module('hobbyhound')
.controller('ShowCtrl', ['$scope', 'users', 'shows', '$modal', '$location', 'dashboard', 'Auth', function($scope, users, shows, $modal, $location, dashboard, Auth) {
	$scope.profile = users.prof;
	$scope.isOwner = false;

	$scope.allShows = shows.shows;

	$scope.showProgress = dashboard.showProgress;
	
	$scope.rating = 0;
	$scope.max = 5;

	$scope.shows = $scope.allShows;

	Auth.currentUser().then(function(user) {
		thisUser = user;
		if(thisUser.id == $scope.profile.id) {
			$scope.isOwner = true;
		}
	});

	$scope.setFilter = function(filterType) {
		$scope.shows = [];
		var listLength = $scope.allShows.length;
		switch(filterType) {
			case 'all':
				$scope.shows = $scope.allShows;
				break;
			case 'finished':
				for (var j = 0; j < listLength; j++) {
					if ($scope.allShows[j].finished) {
						$scope.shows.push($scope.allShows[j]);
					}
				}
				break;
			case 'unfinished':
				for (var k = 0; k < listLength; k++) {
					if (!($scope.allShows[k].finished)) {
						$scope.shows.push($scope.allShows[k]);
					}
				}
				break;
			case 'watching':
				for (var h = 0; h < listLength; h++) {
					if ($scope.allShows[h].watching) {
						$scope.shows.push($scope.allShows[h]);
					}
				}
		}
	};

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value/ $scope.max);
	};

	$scope.addShow = function() {
		shows.create({
			name: $scope.name,
			showtype: $scope.showtype,
			finished: $scope.finished,
			currentepisode: $scope.currentepisode,
			totalepisodes: $scope.totalepisodes,
			watching: $scope.watching,
			rating: $scope.rating,
			comment: $scope.comment
		});
	};

	$scope.deleteShow = function(showid) {
		shows.delete(showid).then(function() {
			for (var i = 0; i < $scope.shows.length; i++) {
				if ($scope.shows[i].id === showid) {
					$scope.shows.splice(i, 1);
					break;
				}
			}
			for (var m = 0; m < $scope.allShows.length; m++) {
				if ($scope.allShows[m].id === showid) {
					$scope.allShows.splice(m, 1);
					break;
				}
			}
		});
	};

	$scope.findProgressType = function(progress) {
		return dashboard.findProgressType(progress);
	};
}]);