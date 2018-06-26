'use strict';

describe('myApp.mainView module', function () {
    beforeEach(module('myApp', 'myApp.mainView'));

    describe('MainView controller', function () {
        var $controller;
        var mainViewCtrl;
        var $scope;
        var mockBookService;
        var deferredFetchBooks;
        var books = getMockBooks();

        beforeEach(inject(function ($injector, _$controller_, $rootScope) {
            //var bookService = $injector.get('bookService');
            var $q = $injector.get('$q');
            deferredFetchBooks = $q.defer();
            mockBookService = constructMockBookService($q);
            $controller = _$controller_;
            $scope = $rootScope.$new();
            mainViewCtrl = $controller('MainViewCtrl', {
                $scope: $scope,
                bookService: mockBookService
            });
        }));

        it('should have instantiated correctly', function () {
            expect(mainViewCtrl).toBeDefined();
        });

        it('should have the correct number of pages', function () {
            $scope.pageSize = 2;
            deferredFetchBooks.resolve(books);
            $scope.$apply();
            expect($scope.numPages).toBe(Math.ceil(books.length / $scope.pageSize));
        });

        it('should update the page when moving to that page', function () {
            deferredFetchBooks.resolve(books);
            $scope.$apply();
            $scope.moveToPage(2);
            expect($scope.page).toBe(2);
        });

        it('should set the id of the description being displayed to the correct book', function () {
            deferredFetchBooks.resolve(books);
            $scope.$apply();
            $scope.toggleDescription(4);
            expect($scope.descriptionBookId).toBe(4);
        });

        it('should unset the id of the description being displayed when toggling the same book', function () {
            deferredFetchBooks.resolve(books);
            $scope.$apply();
            $scope.toggleDescription(4);
            $scope.toggleDescription(4);
            expect($scope.descriptionBookId).toBeUndefined();
        });

        it('should not update the page when moving to a page smaller than 1', function () {
            deferredFetchBooks.resolve(books);
            $scope.$apply();
            $scope.moveToPage(0);
            expect($scope.page).toBe(1);
        });

        it('should not update the page when moving to a page greater than the number of pages', function () {
            deferredFetchBooks.resolve(books);
            $scope.$apply();
            $scope.moveToPage($scope.numPages + 1);
            expect($scope.page).toBe(1);
        });

        function constructMockBookService($q) {
            return {
                fetchBooks: function () {
                    return deferredFetchBooks.promise;
                }
            };
        }

        function getMockBooks() {
            return [{
                    "id": 1,
                    "title": "In Search of Lost Time",
                    "author": "Marcel Proust",
                    "coverUrl": "assets/covers/proust-lost-time.jpg",
                    "yearPublished": "1913",
                    "rating": 9.3,
                    "description": "Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work.",
                    "storeLinks": [{
                        "storeName": "Amazon",
                        "url": "https://www.amazon.co.uk/Search-Lost-Time-Marcel-Proust/dp/150778399X/"
                    }, {
                        "storeName": "iBooks",
                        "url": "https://itunes.apple.com/gb/book/id490484795"
                    }, {
                        "storeName": "Play Store",
                        "url": "https://play.google.com/store/search?q=9780679645689&c=books"
                    }]
                },
                {
                    "id": 2,
                    "title": "Don Quixote",
                    "author": "Miguel de Cervantes",
                    "coverUrl": "assets/covers/no-cover1.jpg",
                    "yearPublished": "1605",
                    "rating": 9.7,
                    "description": "Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper.",
                    "storeLinks": [{
                            "storeName": "Amazon",
                            "url": "https://www.amazon.co.uk/Quixote-Wordsworth-Classics-Cervantes-Saavedra/dp/1853260363/"
                        },
                        {
                            "storeName": "iBooks",
                            "url": "https://itunes.apple.com/gb/book/don-quixote/id1290770793"
                        }
                    ]
                },
                {
                    "id": 3,
                    "title": "Ulysses",
                    "author": "James Joyce",
                    "coverUrl": "assets/covers/no-cover2.jpg",
                    "yearPublished": "1605",
                    "rating": 9.7,
                    "description": "Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyssey.",
                    "storeLinks": [{
                        "storeName": "iBooks",
                        "url": "https://itunes.apple.com/gb/book/don-quixote/id1290770793"
                    }]
                },
                {
                    "id": 4,
                    "title": "The Great Gatsby",
                    "author": "F. Scott Fitzgerald",
                    "coverUrl": "assets/covers/no-cover3.jpg",
                    "yearPublished": "1605",
                    "rating": 9.7,
                    "description": "The novel chronicles an era that Fitzgerald himself dubbed the \"Jazz Age\". Following the shock and chaos of World War I, American society enjoyed unprecedented levels of prosperity.",
                    "storeLinks": [{
                        "storeName": "Amazon",
                        "url": "https://www.amazon.co.uk/Quixote-Wordsworth-Classics-Cervantes-Saavedra/dp/1853260363/"
                    }]
                },
                {
                    "id": 5,
                    "title": "Moby Dick",
                    "author": "Herman Melville",
                    "coverUrl": "assets/covers/no-cover4.jpg",
                    "yearPublished": "1605",
                    "rating": 9.7,
                    "description": "First published in 1851, Melville's masterpiece is, in Elizabeth Hardwick's words, \"the greatest novel in American literature.\" The saga of Captain Ahab and his monomaniacal pursuit of the white whale.",
                    "storeLinks": [{
                        "storeName": "Play Store",
                        "url": "https://play.google.com/store/search?q=9780679645689&c=books"
                    }]
                },
                {
                    "id": 6,
                    "title": "Hamlet",
                    "author": "William Shakespeare",
                    "coverUrl": "assets/covers/no-cover1.jpg",
                    "yearPublished": "1605",
                    "rating": 9.7,
                    "description": "The Tragedy of Hamlet, Prince of Denmark, or more simply Hamlet, is a tragedy by William Shakespeare, believed to have been written between 1599 and 1601.",
                    "storeLinks": [{
                            "storeName": "iBooks",
                            "url": "https://itunes.apple.com/gb/book/don-quixote/id1290770793"
                        },
                        {
                            "storeName": "Play Store",
                            "url": "https://play.google.com/store/search?q=9780679645689&c=books"
                        }
                    ]
                }
            ];
        }
    });
});
