angular.module('hobbyhound')
.factory('movies', ['$http', function($http) {
	var m = {
		movies: []
	};

	m.getAll = function(userid) {
		return $http.get('/users/' + userid + '/movies.json').success(function(data) {
			angular.copy(data, m.movies);
		});
	};

	m.create = function(userid, movie) {
		return $http.post('/users/' + userid + '/movies.json', movie).success(function(data) {
			m.movies.push(data);
		});
	};

	return m;
}]);