import { OffsetFunction } from '../types';
import { PopperOffsetFunction, getPopperOffset } from './getPopperOffset';

describe('getPopperOffset', () => {
  it('should ignore object offsets', () => {
    const offset = [10, 10];
    const transformedOffset = getPopperOffset({ crossAxis: 10, mainAxis: 10 });
    expect(transformedOffset).toEqual(offset);
  });

  it('should ignore number offsets', () => {
    const offset = 10;
    const transformedOffset = getPopperOffset(offset);
    expect(transformedOffset).toEqual([0, offset]);
  });

  it('should keep function offset as function', () => {
    const dummyRect = { x: 0, y: 0, width: 0, height: 0 };
    const offset = { crossAxis: 10, mainAxis: 10 };
    const transformedOffset = getPopperOffset(() => offset) as PopperOffsetFunction;
    expect(transformedOffset({ popper: dummyRect, reference: dummyRect, placement: 'top' })).toEqual([
      offset.crossAxis,
      offset.mainAxis,
    ]);
  });

  it('should transform placement argument in function offset', () => {
    const dummyRect = { x: 0, y: 0, width: 0, height: 0 };
    const offsetFn: OffsetFunction = ({ position, alignment }) => {
      if (position === 'above' && alignment === 'start') {
        return 1;
      }

      return -1;
    };
    const transformedOffset = getPopperOffset(offsetFn) as PopperOffsetFunction;
    expect(transformedOffset({ popper: dummyRect, reference: dummyRect, placement: 'top-start' })).toEqual([0, 1]);
  });

  it('should rename popper property to positioned', () => {
    const dummyRect = { x: 0, y: 0, width: 0, height: 0 };
    const offsetFn: OffsetFunction = ({ positionedElement }) => {
      if (positionedElement === dummyRect) {
        return 1;
      }

      return -1;
    };
    const transformedOffset = getPopperOffset(offsetFn) as PopperOffsetFunction;
    expect(transformedOffset({ popper: dummyRect, reference: dummyRect, placement: 'top-start' })).toEqual([0, 1]);
    [0, 1];
  });

  it('should rename reference property to target', () => {
    const dummyRect = { x: 0, y: 0, width: 0, height: 0 };
    const offsetFn: OffsetFunction = ({ target }) => {
      if (target === dummyRect) {
        return 1;
      }

      return -1;
    };
    const transformedOffset = getPopperOffset(offsetFn) as PopperOffsetFunction;
    expect(transformedOffset({ popper: dummyRect, reference: dummyRect, placement: 'top-start' })).toEqual([0, 1]);
  });
});
