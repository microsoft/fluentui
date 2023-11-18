import { getScrollHeight, getScrollYPosition, setScrollYPosition } from './scroll';

describe('List scroll utils', () => {
  describe('getScrollHeight', () => {
    it('should return scrollHeight for an HTML element', () => {
      const mockElement = {
        scrollHeight: 123,
      };

      expect(getScrollHeight(mockElement as HTMLElement)).toBe(123);
    });

    it('should return scrollHeight for a Window object', () => {
      const mockWindow = {
        document: {
          documentElement: {
            scrollHeight: 456,
          },
        },
      };

      expect(getScrollHeight(mockWindow as Window)).toBe(456);
    });

    it('should return 0 for an undefined object', () => {
      expect(getScrollHeight(undefined)).toBe(0);
    });
  });

  describe('getScrollYPosition', () => {
    it('should return scrollTop for an HTML element', () => {
      const mockElement = {
        scrollTop: 1.2,
      };

      expect(getScrollYPosition(mockElement as HTMLElement)).toBe(2);
    });

    it('should return scrollY for a Window object', () => {
      const mockWindow = {
        scrollY: 5.6,
      };

      expect(getScrollYPosition(mockWindow as Window)).toBe(6);
    });

    it('should return 0 for an undefined object', () => {
      expect(getScrollYPosition(undefined)).toBe(0);
    });
  });

  describe('setScrollYPosition', () => {
    it('should set scrollTop for an HTML element', () => {
      const mockElement = {
        scrollTop: 5,
      };

      setScrollYPosition(mockElement as HTMLElement, 6.7);
      expect(mockElement.scrollTop).toBe(6.7);
    });

    it('should call scrollTo() on a Window object', () => {
      const scrollTo = jest.fn();
      const mockWindow = {
        scrollX: 5,
        scrollY: 5,
        scrollTo,
      };

      setScrollYPosition(mockWindow as unknown as Window, 7.5);

      expect(scrollTo.mock.calls[0][0]).toBe(5);
      expect(scrollTo.mock.calls[0][1]).toBe(7.5);
    });
  });
});
