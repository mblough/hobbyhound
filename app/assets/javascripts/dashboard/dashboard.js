angular.module('hobbyhound')
.factory('dashboard', ['$http', function($http) {
	var dash = {
		gameProgress: {},
		bookProgress: {},
		showProgress: {},
		movieProgress: {}
	};

	dash.getBookProgress = function(userid) {
		return $http.get('/users/' + userid + '/books/progress.json').success(function(data) {
			angular.copy(data, dash.bookProgress);
		});
	};

	dash.getGameProgress = function(userid) {
		return $http.get('/users/' + userid + '/games/progress.json').success(function(data) {
			angular.copy(data, dash.gameProgress);
		});
	};

	dash.getMovieProgress = function(userid) {
		return $http.get('/users/' + userid + '/movies/progress.json').success(function(data) {
			angular.copy(data, dash.movieProgress);
		});
	};

	dash.getShowProgress = function(userid) {
		return $http.get('/users/' +userid + '/shows/progress.json').success(function(data) {
			angular.copy(data, dash.showProgress);
		});
	};

	dash.getAll = function(userid) {
		dash.getBookProgress(userid);
		dash.getGameProgress(userid);
		dash.getMovieProgress(userid);
		dash.getShowProgress(userid);
		return dash;
	};

	dash.findProgressType = function(progress) {
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

	return dash;
}]);