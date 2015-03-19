angular.module('hobbyhound')
.controller('BookEditCtrl', ['$scope', 'users', 'books', '$location', 'Auth', function($scope, users, books, $location, Auth) {

	$scope.bookToEdit = books.bookToEdit;
	$scope.genreList = books.genreList;

	$scope.genreChoice = $scope.genreList[$scope.genreList.map(function(e) { return e.value }).indexOf($scope.bookToEdit.genre)];

	$scope.rating = 0;
	$scope.max = 5;

	$scope.thisUser;

	Auth.currentUser().then(function(user) {
		$scope.thisUser = user;
	});

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.updateBook = function() {
		$scope.bookToEdit.genre = $scope.genreChoice.value.toString();
		books.editBook($scope.bookToEdit);
	};
	
}])