import { withStrictMode } from './index';

describe(`public api`, () => {
  describe(`decorators`, () => {
    it(`should work`, () => {
      const decorators = [withStrictMode];

      // @TODO - added proper tests
      expect(decorators).toBeDefined();
    });
  });
});
