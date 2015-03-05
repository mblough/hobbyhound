angular.module('hobbyhound')
.factory('games', ['$http', '$location', 'Auth', function($http, $location, Auth) {
	var g = {
		games: [],
		gameToEdit: {}
	};

	Auth.currentUser().then(function(user) {
		thisUser = user;
	});

	g.getAll = function(userid) {
		return $http.get('/users/' + userid + '/games.json').success(function(data) {
			angular.copy(data, g.games);
		});
	};

	g.create = function(game) {
		return $http.post('/users/' + thisUser.id + '/games.json', game).success(function(data) {
			g.games.push(data);
			$location.path("/users/" + thisUser.id + "/games");
		});
	};

	g.getEditGame = function(gameid) {
		return $http.get('/games/' + gameid + '/edit.json').success(function(data) {
			angular.copy(data, g.gameToEdit);
		});
	};

	g.editGame = function(game) {
		return $http.put('/games/' + game.id + '.json', game).success(function(data) {
			$location.path("/users/" + thisUser.id + "/games");
		});
	};

	g.delete = function(gameid) {
		return $http.delete('/games/' + gameid + '.json').success(function() {
		});
	};

	return g;
}]);