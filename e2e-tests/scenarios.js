'use strict';

describe('my app', function() {
  it('should automatically redirect to /main when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/main");
  });

  describe('mainView', function() {
    beforeEach(function() {
      browser.get('index.html#!/main');
    });

    it('should render the mainView when user navigates to /main', function() {
      expect(element.all(by.css('[ng-view] h3')).first().getText()).
        toMatch(/Most popular Books of All time/);
    });
  });
});
