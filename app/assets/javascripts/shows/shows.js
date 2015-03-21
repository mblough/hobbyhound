angular.module('hobbyhound')
.factory('shows', ['$http', '$location', 'Auth', function($http, $location, Auth) {
	var s = {
		shows: [],
		showToEdit: {},
	};

	Auth.currentUser().then(function(user) {
		thisUser = user;
	});

	s.getAll = function(userid) {
		return $http.get('/users/' + userid + '/shows.json').success(function(data) {
			angular.copy(data, s.shows);
		});
	};

	s.create = function(show) {
		return $http.post('/users/' + thisUser.id + '/shows.json', show).success(function(data) {
			s.shows.push(data);
			$location.path("/users/" + thisUser.id + "/shows");
		});
	};

	s.getEditShow = function(showid) {
		return $http.get('/shows/' + showid + '/edit.json').success(function(data) {
			angular.copy(data, s.showToEdit);
		});
	};

	s.editShow = function(show) {
		return $http.put('/shows/' + show.id + '.json', show).success(function(data) {
			$location.path("/users/" + thisUser.id + "/shows");
		});
	};

	s.delete = function(showid) {
		return $http.delete('/shows/' + showid + '.json').success(function() {
		});
	};

	return s;
}]);