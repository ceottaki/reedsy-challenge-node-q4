'use strict';

angular.module('myApp.mainView', ['ngRoute', 'ng-showdown'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'mainView/mainView.html',
            controller: 'MainViewCtrl'
        });
    }])

    .controller('MainViewCtrl', ['$scope', 'bookService', function ($scope, bookService) {
        $scope.pageSize = 5;
        $scope.page = 1;
        $scope.books = [];
        $scope.numPages = 0;
        $scope.pageNumArray = [];
        $scope.descriptionBookId = -1;

        $scope.moveToPage = function (newPage) {
            if (newPage < 1 || newPage > $scope.numPages) {
                return;
            }

            $scope.page = newPage;
        };

        $scope.toggleDescription = function (bookId) {
            if ($scope.descriptionBookId === bookId) {
                $scope.descriptionBookId = -1;
            } else {
                $scope.descriptionBookId = bookId;
            }
        };

        $scope.fetchBooks = function () {
            bookService.fetchBooks().then(function (books) {
                $scope.books = books;
                $scope.numPages = Math.ceil(books.length / $scope.pageSize);
                $scope.pageNumArray = new Array($scope.numPages);
            });
        };

        $scope.fetchBooks();
    }]);
