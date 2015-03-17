angular.module('hobbyhound')
.controller('BookCtrl', ['$scope', 'users', 'books', '$modal', '$location', function($scope, users, books, $modal, $location) {
	$scope.profile = users.prof;

	$scope.books = books.books;
	$scope.genreList = games.genreList;

	$scope.rating = 0;
	$scope.max = 5;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value/ $scope.max);
	};

	$scope.addBook = function() {
		books.create({
			name: $scope.name,
			genre: $scope.genre.value.toString(),
			read: $scope.read,
			currentpage: $scope.currentpage,
			totalpages: $scope.totalpages,
			reading: $scope.reading,
			rating: $scope.rating,
			comment: $scope.comment
		});
	};

	$scope.deleteBook = function(bookid) {
		books.delete(bookid).then(function() {
			for (var i = 0; i < $scope.books.length; i++) {
				if ($scope.books[i].id === bookid) {
					$scope.books.splice(i, 1);
					break;
				}
			}
		});
	};
}]);