angular.module('hobbyhound')
.factory('games', ['$http', '$location', 'Auth', function($http, $location, Auth) {
	var g = {
		games: [],
		gameToEdit: {}
		systemList: [
			{ label: 'NES', value: 'NES' },
			{ label: 'SNES', value: 'SNES' },
			{ label: 'Nintendo 64', value: 'Nintendo 64' },
			{ label: 'Gamecube', value: 'Gamecube' },
			{ label: 'Wii', value: 'Wii' },
			{ label: 'Wii U', value: 'Wii U' },
			{ label: 'Game Boy', value: 'Game Boy' },
			{ label: 'GBC', value: 'GBC'}
			{ label: 'GBA', value: 'GBA' },
			{ label: 'NDS', value: 'NDS' },
			{ label: '3DS', value: '3DS' },
			{ label: 'PlayStation', value: 'PlayStation' },
			{ label: 'PlayStation 2', value: 'PlayStation 2' },
			{ label: 'PlayStation 3', value: 'PlayStation 3' },
			{ label: 'PlayStation 4', value: 'PlayStation 4' },
			{ label: 'PSP', value: 'PSP' },
			{ label: 'PSVita', value: 'PSVita' }
			{ label: 'Xbox', value: 'Xbox' },
			{ label: 'Xbox 360', value: 'Xbox 360' },
			{ label: 'Xbox One', value: 'Xbox One' },
			{ label: 'Genesis', value: 'Genesis' },
			{ label: 'Saturn', value: 'Saturn' },
			{ label: 'Dreamcast', value: 'Dreamcast' },
			{ label: 'Game Gear', value: 'Game Gear' },
		]
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