'use strict';

describe('Service: FlashService', function () {

  // load the service's module
  beforeEach(module('angularnodedockApp'));

  // instantiate service
  var FlashService;
  beforeEach(inject(function (_FlashService_) {
    FlashService = _FlashService_;
  }));

  it('should do something', function () {
    expect(!!FlashService).toBe(true);
  });

});
