import { getScrollUtils } from './scroll';
import type { ScrollUtils } from './scroll';

describe('Sticky scroll utils', () => {
  describe('get utils', () => {
    it('should return utils', () => {
      const utils = getScrollUtils();
      expect(Object.keys(utils)).toEqual(['getScrollTopInRange']);
    });
  });

  describe('getScrollTopInRange', () => {
    let utils: ScrollUtils | undefined;
    beforeEach(() => {
      utils = getScrollUtils();
    });

    afterEach(() => {
      utils = undefined;
    });

    it('should return scrollTop when it has no value for the element', () => {
      const element = {
        scrollTop: 5,
      };

      expect(utils!.getScrollTopInRange(element as HTMLElement, 1)).toBe(5);
    });

    it('should return the same scrollTop when the values are the same', () => {
      const element = {
        scrollTop: 5,
      };

      utils!.getScrollTopInRange(element as HTMLElement, 1);

      expect(utils!.getScrollTopInRange(element as HTMLElement, 1)).toBe(5);
    });

    it('should return the same scrollTop when the values are within the range', () => {
      const element = {
        scrollTop: 5,
      };

      utils!.getScrollTopInRange(element as HTMLElement, 1);

      element.scrollTop = 6;
      expect(utils!.getScrollTopInRange(element as HTMLElement, 1)).toBe(5);

      element.scrollTop = 4;
      expect(utils!.getScrollTopInRange(element as HTMLElement, 1)).toBe(5);

      element.scrollTop = 6 - Number.EPSILON;
      expect(utils!.getScrollTopInRange(element as HTMLElement, 1)).toBe(5);

      element.scrollTop = 4 + Number.EPSILON;
      expect(utils!.getScrollTopInRange(element as HTMLElement, 1)).toBe(5);

      element.scrollTop = 10;
      expect(utils!.getScrollTopInRange(element as HTMLElement, 6)).toBe(5);

      element.scrollTop = 0;
      expect(utils!.getScrollTopInRange(element as HTMLElement, 6)).toBe(5);
    });

    it('should return the new scrollTop when the values are outside the range', () => {
      const element = {
        scrollTop: 5,
      };

      utils!.getScrollTopInRange(element as HTMLElement, 1);

      element.scrollTop = 7;
      expect(utils!.getScrollTopInRange(element as HTMLElement, 1)).toBe(7);

      element.scrollTop = 4;
      expect(utils!.getScrollTopInRange(element as HTMLElement, 1)).toBe(4);

      element.scrollTop = 70;
      expect(utils!.getScrollTopInRange(element as HTMLElement, 20)).toBe(70);

      element.scrollTop = 33;
      expect(utils!.getScrollTopInRange(element as HTMLElement, 20)).toBe(33);
    });

    it('should return different scrollTops for different elements', () => {
      const element1 = {
        scrollTop: 5,
      };

      const element2 = {
        scrollTop: 50,
      };

      expect(utils!.getScrollTopInRange(element1 as HTMLElement, 1)).toBe(5);
      expect(utils!.getScrollTopInRange(element2 as HTMLElement, 1)).toBe(50);
      expect(utils!.getScrollTopInRange(element1 as HTMLElement, 1)).toBe(5);

      element1.scrollTop = 10;
      expect(utils!.getScrollTopInRange(element1 as HTMLElement, 1)).toBe(10);
      expect(utils!.getScrollTopInRange(element2 as HTMLElement, 1)).toBe(50);

      element2.scrollTop = 60;
      expect(utils!.getScrollTopInRange(element2 as HTMLElement, 1)).toBe(60);
      expect(utils!.getScrollTopInRange(element1 as HTMLElement, 1)).toBe(10);
    });
  });
});
