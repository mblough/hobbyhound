angular.module('hobbyhound')
.factory('users', ['$http', function($http) {
	var profile = {
		prof: null
	};

	profile.get = function(userid) {
		return $http.get('/profiles/' + userid + '.json').success(function(data) {
			profile.prof = data;
		});
	};

	return profile;
}]);