angular.module('hobbyhound')
.controller('ShowCtrl', ['$scope', 'users', 'shows', '$modal', '$location', 'dashboard', function($scope, users, shows, $modal, $location, dashboard) {
	$scope.profile = users.prof;

	$scope.shows = shows.shows;

	$scope.showProgress = dashboard.showProgress;
	
	$scope.rating = 0;
	$scope.max = 5;

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
		});
	};

	$scope.findProgressType = function(progress) {
		return dashboard.findProgressType(progress);
	};
}]);