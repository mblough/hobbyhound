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
		});
	$urlRouterProvider.otherwise('home');
}]);