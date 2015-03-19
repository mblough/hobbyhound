angular.module('hobbyhound')
.factory('books', ['$http', '$location', 'Auth', function($http, $location, Auth) {
	var b = {
		books: [],
		bookToEdit: {},
		genreList: [
			{ label: 'Biography', value: 'Biography' },
			{ label: 'Fantasy', value: 'Fantasy' },
			{ label: 'Folktale', value: 'Folktale' },
			{ label: 'Historical', value: 'Historical' },
			{ label: 'Mystery', value: 'Mystery' },
			{ label: 'Poetry', value: 'Poetry' },
			{ label: 'Sci-Fi', value: 'Sci-Fi' },
			{ label: 'Autobiography', value: 'Autobiography' },
			{ label: 'Comic', value: 'Comic' },
			{ label: 'Graphic Novel', value: 'Graphic Novel' },
			{ label: 'Other', value: 'Other' }
		]
	};

	Auth.currentUser().then(function(user) {
		thisUser = user;
	});

	b.getAll = function(userid) {
		return $http.get('/users/' + userid + '/books.json').success(function(data) {
			angular.copy(data, b.books);
		});
	};

	b.create = function(book) {
		return $http.post('/users/' + thisUser.id + '/books.json', book).success(function(data) {
			b.books.push(data);
			$location.path("/users/" + thisUser.id + "/books");
		});
	};

	b.getEditBook = function(bookid) {
		return $http.get('/books/' + bookid + '/edit.json').success(function(data) {
			angular.copy(data, b.bookToEdit);
		});
	};

	b.editBook = function(book) {
		return $http.put('/books/' + book.id + '.json', book).success(function(data) {
			$location.path("/users/" + thisUser.id + "/books");
		});
	};

	b.delete = function(bookid) {
		return $http.delete('/books/' + bookid + '.json').success(function() {
		});
	};

	return b;
}]);