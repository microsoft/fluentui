import { OffsetFunction } from '../types';
import type { Rect } from '@popperjs/core';
import { PopperOffsetFunction, getPopperOffset } from './getPopperOffset';

describe('getPopperOffset', () => {
  it('should ignore object offsets', () => {
    const transformedOffset = getPopperOffset({ crossAxis: 10, mainAxis: 10 });
    expect(transformedOffset).toEqual([10, 10]);
  });

  it('should ignore number offsets', () => {
    const transformedOffset = getPopperOffset(10);
    expect(transformedOffset).toEqual([0, 10]);
  });

  it('should keep function offset as function', () => {
    const dummyRect: Rect = { x: 0, y: 0, width: 0, height: 0 };
    const offset = { crossAxis: 10, mainAxis: 10 };
    const transformedOffset = getPopperOffset(() => offset) as PopperOffsetFunction;
    expect(transformedOffset({ popper: dummyRect, reference: dummyRect, placement: 'top' })).toEqual([
      offset.crossAxis,
      offset.mainAxis,
    ]);
  });

  it('should transform placement argument in function offset', () => {
    const dummyRect: Rect = { x: 0, y: 0, width: 0, height: 0 };
    const offsetFn: OffsetFunction = ({ position, alignment }) => {
      if (position === 'above' && alignment === 'start') {
        return 1;
      }

      return -1;
    };
    const transformedOffset = getPopperOffset(offsetFn) as PopperOffsetFunction;
    expect(transformedOffset({ popper: dummyRect, reference: dummyRect, placement: 'top-start' })).toEqual([0, 1]);
    expect(transformedOffset({ popper: dummyRect, reference: dummyRect, placement: 'bottom-end' })).toEqual([0, -1]);
  });

  it('should rename popper property to positionedRect', () => {
    const dummyRect: Rect = { x: 0, y: 0, width: 0, height: 0 };
    const offsetFn: OffsetFunction = ({ positionedRect }) => {
      if (positionedRect === dummyRect) {
        return 1;
      }

      return -1;
    };
    const transformedOffset = getPopperOffset(offsetFn) as PopperOffsetFunction;
    expect(transformedOffset({ popper: dummyRect, reference: dummyRect, placement: 'top-start' })).toEqual([0, 1]);
  });

  it('should rename reference property to targetRect', () => {
    const dummyRect: Rect = { x: 0, y: 0, width: 0, height: 0 };
    const offsetFn: OffsetFunction = ({ targetRect }) => {
      if (targetRect === dummyRect) {
        return 1;
      }

      return -1;
    };
    const transformedOffset = getPopperOffset(offsetFn) as PopperOffsetFunction;
    expect(transformedOffset({ popper: dummyRect, reference: dummyRect, placement: 'top-start' })).toEqual([0, 1]);
  });
});
