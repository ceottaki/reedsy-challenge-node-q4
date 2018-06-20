'use strict';

angular.module('myApp')
    .service('bookService', ['$q', '$http', function ($q, $http) {
        var self = this;
        this.fetchBooks = function () {
            if (this.books) {
                return $q.when(this.books);
            }

            var deferred = $q.defer();
            $http.get('assets/books.json').then(function (response) {
                self.books = response.data.books;
                deferred.resolve(self.books);
            }).catch(function (error) {
                console.error(error);
                deferred.reject(error);
            });

            return deferred.promise;
        };
    }]);
