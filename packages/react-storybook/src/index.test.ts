import { withFluentProvider, withStrictMode } from './index';

describe(`public api`, () => {
  describe(`decorators`, () => {
    it(`should work`, () => {
      const decorators = [withFluentProvider, withStrictMode];

      // @TODO - added proper tests
      expect(decorators).toBeDefined();
    });
  });
});
