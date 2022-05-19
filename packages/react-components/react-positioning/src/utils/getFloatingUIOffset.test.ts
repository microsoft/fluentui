import { OffsetFunction } from '../types';
import { FloatingUIOffsetFunction, getFloatingUIOffset } from './getFloatingUIOffset';

describe('getFloatingUIOffset', () => {
  it('should ignore object offsets', () => {
    const offset = { crossAxis: 10, mainAxis: 10 };
    const transformedOffset = getFloatingUIOffset({ crossAxis: 10, mainAxis: 10 });
    expect(transformedOffset).toEqual(offset);
  });

  it('should ignore number offsets', () => {
    const offset = 10;
    const transformedOffset = getFloatingUIOffset(offset);
    expect(transformedOffset).toEqual(offset);
  });

  it('should keep function offset as function', () => {
    const dummyRect = { x: 0, y: 0, width: 0, height: 0 };
    const offset = { crossAxis: 10, mainAxis: 10 };
    const transformedOffset = getFloatingUIOffset(() => offset) as FloatingUIOffsetFunction;
    expect(transformedOffset({ floating: dummyRect, reference: dummyRect, placement: 'top' })).toEqual(offset);
  });

  it('should transform placement argument in function offset', () => {
    const dummyRect = { x: 0, y: 0, width: 0, height: 0 };
    const offsetFn: OffsetFunction = ({ position, alignment }) => {
      if (position === 'above' && alignment === 'start') {
        return 1;
      }

      return -1;
    };
    const transformedOffset = getFloatingUIOffset(offsetFn) as FloatingUIOffsetFunction;
    expect(transformedOffset({ floating: dummyRect, reference: dummyRect, placement: 'top-start' })).toEqual(1);
  });

  it('should rename floating property to positioned', () => {
    const dummyRect = { x: 0, y: 0, width: 0, height: 0 };
    const offsetFn: OffsetFunction = ({ positioned }) => {
      if (positioned === dummyRect) {
        return 1;
      }

      return -1;
    };
    const transformedOffset = getFloatingUIOffset(offsetFn) as FloatingUIOffsetFunction;
    expect(transformedOffset({ floating: dummyRect, reference: dummyRect, placement: 'top-start' })).toEqual(1);
  });

  it('should rename reference property to target', () => {
    const dummyRect = { x: 0, y: 0, width: 0, height: 0 };
    const offsetFn: OffsetFunction = ({ target }) => {
      if (target === dummyRect) {
        return 1;
      }

      return -1;
    };
    const transformedOffset = getFloatingUIOffset(offsetFn) as FloatingUIOffsetFunction;
    expect(transformedOffset({ floating: dummyRect, reference: dummyRect, placement: 'top-start' })).toEqual(1);
  });
});
