angular.module('hobbyhound')
.controller('BookCtrl', ['$scope', 'users', 'books', '$modal', '$location', 'dashboard', function($scope, users, books, $modal, $location, dashboard) {
	$scope.profile = users.prof;

	$scope.allBooks = books.books;
	$scope.genreList = books.genreList;

	$scope.bookProgress = dashboard.bookProgress;

	$scope.rating = 0;
	$scope.max = 5;

	$scope.books = $scope.allBooks;

	$scope.setFilter = function(filterType) {
		$scope.books = [];
		var listLength = $scope.allBooks.length;
		switch(filterType) {
			case 'all':
				$scope.books = $scope.allBooks;
				break;
			case 'read':
				for (var j = 0; j < listLength; j++) {
					if ($scope.allBooks[j].read) {
						$scope.books.push($scope.allBooks[j]);
					}
				}
				break;
			case 'unread':
				for (var k = 0; k < listLength; k++) {
					if (!($scope.allBooks[k].read)) {
						$scope.books.push($scope.allBooks[k]);
					}
				}
				break;
			case 'reading':
				for (var h = 0; h < listLength; h++) {
					if ($scope.allBooks[h].reading) {
						$scope.books.push($scope.allBooks[h]);
					}
				}
		}
	};

	$scope.findProgressType = function(progress) {
		return dashboard.findProgressType(progress);
	}

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