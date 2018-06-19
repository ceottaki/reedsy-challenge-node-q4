'use strict';

angular.module('myApp.bookRow', [])
    .directive('bookRow', function () {
        return {
            restrict: 'A',
            templateUrl: 'components/bookRow/bookRow.html',
            scope: {
                book: '=book'
            }
        }
    });
