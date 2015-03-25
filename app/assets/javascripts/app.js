angular.module('hobbyhound', ['ui.router', 'templates', 'Devise', 'ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home/_home.html',
			controller: 'MainCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'auth/_login.html',
			controller: 'AuthCtrl',
			onEnter: ['$state', 'Auth', function($state, Auth) {
				Auth.currentUser().then(function() {
					$state.go('home');
				})
			}]
		})
		.state('register', {
			url: '/register',
			templateUrl: 'auth/_register.html',
			controller: 'AuthCtrl',
			onEnter: ['$state', 'Auth', function($state, Auth) {
				Auth.currentUser().then(function() {
					$state.go('home');
				})
			}]
		})
		.state('movies', {
			url: '/users/{user_id}/movies',
			templateUrl: 'movies/_movies.html',
			controller: 'MovieCtrl',
			resolve: {
				profilePromise: ['$stateParams', 'users', function($stateParams, users) {
					return users.get($stateParams.user_id);
				}],
				postPromise: ['$stateParams', 'movies', function($stateParams, movies) {
					return movies.getAll($stateParams.user_id);
				}]
			}
		})
		.state('createMovie', {
			url: '/movies/create',
			templateUrl: 'movies/_createMovie.html',
			controller: 'MovieCtrl'
		})
		.state('editMovie', {
			url: '/movies/{movie_id}/edit',
			templateUrl: 'movies/_editMovie.html',
			controller: 'MovieEditCtrl',
			resolve: {
				moviePromise: ['$stateParams', 'movies', function($stateParams, movies) {
					return movies.getEditMovie($stateParams.movie_id);
				}]
			}
		})
		.state('games', {
			url: '/users/{user_id}/games',
			templateUrl: 'games/_games.html',
			controller: 'GameCtrl',
			resolve: {
				profilePromise: ['$stateParams', 'users', function($stateParams, users) {
					return users.get($stateParams.user_id);
				}],
				postPromise: ['$stateParams', 'games', function($stateParams, games) {
					return games.getAll($stateParams.user_id);
				}]
			}
		})
		.state('createGame', {
			url: '/games/create',
			templateUrl: 'games/_createGame.html',
			controller: 'GameCtrl'
		})
		.state('editGame', {
			url: '/games/{game_id}/edit',
			templateUrl: 'games/_editGame.html',
			controller: 'GameEditCtrl',
			resolve: {
				gamePromise: ['$stateParams', 'games', function($stateParams, games) {
					return games.getEditGame($stateParams.game_id);
				}]
			}
		})
		.state('books', {
			url: '/users/{user_id}/books',
			templateUrl: 'books/_books.html',
			controller: 'BookCtrl',
			resolve: {
				profilePromise: ['$stateParams', 'users', function($stateParams, users) {
					return users.get($stateParams.user_id);
				}],
				postPromise: ['$stateParams', 'books', function($stateParams, books) {
					return books.getAll($stateParams.user_id);
				}]
			}
		})
		.state('createBook', {
			url: '/books/create',
			templateUrl: 'books/_createBook.html',
			controller: 'BookCtrl'
		})
		.state('editBook', {
			url: '/books/{book_id}/edit',
			templateUrl: 'books/_editBook.html',
			controller: 'BookEditCtrl',
			resolve: {
				bookPromise: ['$stateParams', 'books', function($stateParams, books) {
					return books.getEditBook($stateParams.book_id);
				}]
			}
		})
		.state('shows', {
			url: '/users/{user_id}/shows',
			templateUrl: 'shows/_shows.html',
			controller: 'ShowCtrl',
			resolve: {
				profilePromise: ['$stateParams', 'users', function($stateParams, users) {
					return users.get($stateParams.user_id);
				}],
				postPromise: ['$stateParams', 'shows', function($stateParams, shows) {
					return shows.getAll($stateParams.user_id);
				}]
			}
		})
		.state('createShow', {
			url: '/shows/create',
			templateUrl: 'shows/_createShow.html',
			controller: 'ShowCtrl'
		})
		.state('editShow', {
			url: '/shows/{show_id}/edit',
			templateUrl: 'shows/_editShow.html',
			controller: 'ShowEditCtrl',
			resolve: {
				showPromise: ['$stateParams', 'shows', function($stateParams, shows) {
					return shows.getEditShow($stateParams.show_id);
				}]
			}
		});

	$urlRouterProvider.otherwise('home');
}]);