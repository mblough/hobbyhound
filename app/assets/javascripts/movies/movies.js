angular.module('hobbyhound')
.factory('movies', ['$http', '$location', 'Auth', function($http, $location, Auth) {
	var m = {
		movies: []
	};
	Auth.currentUser().then(function(user) {
		thisUser = user;
	});

	m.getAll = function(userid) {
		return $http.get('/users/' + userid + '/movies.json').success(function(data) {
			angular.copy(data, m.movies);
		});
	};

	m.create = function(movie) {
		return $http.post('/users/' + thisUser.id + '/movies.json', movie).success(function(data) {
			m.movies.push(data);
			$location.path("/users/" + thisUser.id + "/movies");
		});
	};

	return m;
}]);