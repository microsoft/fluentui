import { getClassName } from './compose';

describe('compose', () => {
  describe('getClassName', () => {
    it('returns nothing in the default case', () => {
      expect(getClassName({}, {}, '', [])).toEqual({});
    });

    it('returns classNames for a single slot', () => {
      expect(getClassName({}, {}, '', ['root'])).toEqual({ root: '' });
    });
  });
});
