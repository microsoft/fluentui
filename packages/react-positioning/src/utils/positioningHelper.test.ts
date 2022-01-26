import { getPlacement, applyRtlToOffset } from './positioningHelper';
import type { Alignment, Position, OffsetFunction, OffsetFunctionParam } from '../types';

describe('getPlacement', () => {
  it.each([
    //[align, position, placement, rtlPlacement]
    ['start', 'above', 'top-start', 'top-end'],
    ['center', 'above', 'top', 'top'],
    ['end', 'above', 'top-end', 'top-start'],
    ['start', 'below', 'bottom-start', 'bottom-end'],
    ['center', 'below', 'bottom', 'bottom'],
    ['end', 'below', 'bottom-end', 'bottom-start'],
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
    [undefined, undefined, 'auto', 'auto'],
  ])(
    'should use align: "%s" position: "%s" and return LTR placement: "%s" and RTL placement: "%s"',
    (align, position, expectedPlacement, expectedRtlPlacement) => {
      // Act
      const placement = getPlacement(align as Alignment, position as Position);
      const rtlPlacement = getPlacement(align as Alignment, position as Position, true);

      // Assert
      expect(placement).toEqual(expectedPlacement);
      expect(rtlPlacement).toEqual(expectedRtlPlacement);
    },
  );
});

describe('applyRtlOffset', () => {
  it('flips an axis value RTL for an array', () => {
    expect(applyRtlToOffset([10, 10])).toEqual([-10, 10]);
  });

  it('flips an axis value RTL for a function', () => {
    // Arrange
    const offsetFn: OffsetFunction = () => [10, 10];
    const flippedFn = applyRtlToOffset(offsetFn) as OffsetFunction;

    // Assert
    expect(flippedFn(({} as unknown) as OffsetFunctionParam)).toEqual([-10, 10]);
  });
});
