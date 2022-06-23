import { mergeArrowOffset } from './mergeArrowOffset';
import type { OffsetFunction, OffsetObject } from '../types';

describe('mergeArrowOffset', () => {
  it.each([null, undefined])('should return arrow offset when user offset is %s', userOffset => {
    expect(mergeArrowOffset(userOffset, 1)).toEqual({ mainAxis: 1 });
  });

  const cases = [
    [
      { crossAxis: 0, mainAxis: 0 },
      { crossAxis: 0, mainAxis: 1 },
    ],
    [
      { crossAxis: 0, mainAxis: 1 },
      { crossAxis: 0, mainAxis: 2 },
    ],
    [
      { crossAxis: 0, mainAxis: undefined },
      { crossAxis: 0, mainAxis: 1 },
    ],
    [
      { crossAxis: 0, mainAxis: null },
      { crossAxis: 0, mainAxis: 1 },
    ],
    [
      { crossAxis: undefined, mainAxis: 0 },
      { crossAxis: undefined, mainAxis: 1 },
    ],
    [
      { crossAxis: null, mainAxis: 0 },
      { crossAxis: null, mainAxis: 1 },
    ],
  ] as const;

  it.each(cases)('should return arrow offset when user offset object is %s', (userOffset, expectedOffset) => {
    const mergedOffsetObject = mergeArrowOffset(userOffset as OffsetObject, 1) as OffsetObject;

    expect(mergedOffsetObject).toEqual(expectedOffset);
  });

  it.each(cases)('should return arrow offset when user offset function returns %s', (userOffset, expectedOffset) => {
    const offsetFn = () => userOffset;
    const mergedOffsetFn = mergeArrowOffset(offsetFn as OffsetFunction, 1) as OffsetFunction;

    expect(
      mergedOffsetFn({
        positionedRect: { height: 0, x: 0, y: 0, width: 0 },
        position: 'above',
        alignment: 'start',
        targetRect: { height: 0, x: 0, y: 0, width: 0 },
      }),
    ).toEqual(expectedOffset);
  });

  it.each(cases)('should return arrow offset when user offset number shorthand is %s', (userOffset, expectedOffset) => {
    const shorthand = userOffset.mainAxis;
    const mergedOffset = mergeArrowOffset(shorthand, 1) as OffsetObject;

    const expectedOffsetWithoutCrossAxis = { mainAxis: expectedOffset.mainAxis };
    expect(mergedOffset).toEqual(expectedOffsetWithoutCrossAxis);
  });
});
