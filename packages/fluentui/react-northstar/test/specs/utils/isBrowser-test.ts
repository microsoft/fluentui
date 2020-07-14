import { isBrowser } from 'src/utils/isBrowser';

describe('isBrowser', () => {
  describe('browser', () => {
    test('should return true in a browser', () => {
      expect(isBrowser()).toBe(true);
    });
  });
});
