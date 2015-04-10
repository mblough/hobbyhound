angular.module('hobbyhound')
.factory('dashboard', ['$http', function($http) {
	var dash = {
		gameProgress: {},
		bookProgress: {},
		showProgress: {},
		movieProgress: {},
		comments: []
	};

	dash.getBookProgress = function(userid) {
		return $http.get('/users/' + userid + '/books/progress.json').success(function(data) {
			angular.copy(data, dash.bookProgress);
		});
	};

	dash.getBookProgress2 = function(userid) {
		$http.get('/users/' + userid + '/books/progress.json').success(function(data) {
			angular.copy(data, dash.bookProgress);
		});
		return dash.bookProgress;
	}

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
		dash.getComments(userid);
		return dash;
	};

	dash.getComments = function(userid) {
		return $http.get('/users/' + userid + '/comments.json').success(function(data) {
			angular.copy(data, dash.comments);
		});
	};

	dash.findProgressType = function(progress) {
		percentage = (progress.complete / progress.total) * 100;
		if(percentage >= 75) {
			return "success";
		}
		else if(percentage > 50) {
			return "info";
		}
		else if(percentage >= 25) {
			return "warning";
		}
		else {
			return "danger";
		}
	};

	dash.createComment = function(comment, dashid) {
		return $http.post('/users/' + dashid + '/comments.json', comment).success(function(data) {
			dash.comments.push(data);
		});
	};
	return dash;
}]);