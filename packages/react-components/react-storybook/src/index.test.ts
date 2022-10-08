import { withFluentProvider, withFluentVrTestVariants, withStrictMode } from './index';

describe(`public api`, () => {
  describe(`decorators`, () => {
    it(`should work`, () => {
      const decorators = [withFluentProvider, withStrictMode, withFluentVrTestVariants];

      // @TODO - added proper tests
      expect(decorators).toBeDefined();
    });
  });
});
