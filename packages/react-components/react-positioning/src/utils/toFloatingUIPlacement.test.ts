import { toFloatingUIPlacement } from './toFloatingUIPlacement';
import type { Alignment, Position } from '../types';

describe('toFloatingUIPlacement', () => {
  it.each([
    //[align, position, placement, rtlPlacement]
    ['start', 'above', 'top-start', 'top-start'],
    ['center', 'above', 'top', 'top'],
    ['end', 'above', 'top-end', 'top-end'],
    ['start', 'below', 'bottom-start', 'bottom-start'],
    ['center', 'below', 'bottom', 'bottom'],
    ['end', 'below', 'bottom-end', 'bottom-end'],
    ['top', 'before', 'left-start', 'right-start'],
    ['center', 'before', 'left', 'right'],
    ['bottom', 'before', 'left-end', 'right-end'],
    ['top', 'after', 'right-start', 'left-start'],
    ['center', 'after', 'right', 'left'],
    ['bottom', 'after', 'right-end', 'left-end'],
    [undefined, 'above', 'top', 'top'],
    [undefined, 'below', 'bottom', 'bottom'],
    [undefined, 'before', 'left', 'right'],
    [undefined, 'after', 'right', 'left'],
  ])(
    'should use align: "%s" position: "%s" and return LTR placement: "%s" and RTL placement: "%s"',
    (align, position, expectedPlacement, expectedRtlPlacement) => {
      // Act
      const placement = toFloatingUIPlacement(align as Alignment, position as Position);
      const rtlPlacement = toFloatingUIPlacement(align as Alignment, position as Position, true);

      // Assert
      expect(placement).toEqual(expectedPlacement);
      expect(rtlPlacement).toEqual(expectedRtlPlacement);
    },
  );
});
