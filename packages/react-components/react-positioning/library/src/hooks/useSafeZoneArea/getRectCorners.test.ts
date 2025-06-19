import { getRectCorners } from './getRectCorners';
import type { Point } from './types';

/**
 * Creates a mock DOMRect object since JSDOM doesn't provide DOMRect
 */
function createDOMRectMock({ top, left, height, width }: Pick<DOMRect, 'top' | 'left' | 'height' | 'width'>): DOMRect {
  return {
    top,
    left,
    right: left + width,
    bottom: top + height,

    height,
    width,

    x: left,
    y: top,

    toJSON: () => '',
  } as DOMRect;
}

describe('getRectCorners', () => {
  it('should correctly calculate rectangle corners with zero offset', () => {
    const rect = createDOMRectMock({ top: 20, left: 10, width: 100, height: 50 });
    const offset: Point = [0, 0];

    expect(getRectCorners(rect, offset)).toEqual({
      topLeft: [10, 20],
      topRight: [110, 20],
      bottomRight: [110, 70],
      bottomLeft: [10, 70],
    });
  });

  it('should correctly calculate rectangle corners with positive offset', () => {
    const rect = createDOMRectMock({ top: 20, left: 10, width: 100, height: 50 });
    const offset: Point = [5, 10];

    expect(getRectCorners(rect, offset)).toEqual({
      topLeft: [5, 10],
      topRight: [105, 10],
      bottomRight: [105, 60],
      bottomLeft: [5, 60],
    });
  });
});
