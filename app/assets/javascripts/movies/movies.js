angular.module('hobbyhound')
.factory('movies', ['$http', '$location', 'Auth', function($http, $location, Auth) {
	var m = {
		movies: [],
		movieToEdit: {}
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

	m.getEditMovie = function(movieid) {
		return $http.get('/movies/' + movieid + '/edit.json').success(function(data) {
			angular.copy(data, m.movieToEdit);
		});
	};

	m.editMovie = function(movie) {
		return $http.put('/movies/' + movie.id + '.json', movie).success(function(data) {
			$location.path("/users/" + thisUser.id + "/movies");
		});
	};

	m.delete = function(movieid) {
		return $http.delete('/movies/' + movieid + '.json').success(function() {
		});
	};

	return m;
}]);