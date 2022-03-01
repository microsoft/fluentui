import { mergeArrowOffset } from './mergeArrowOffset';
import type { Offset } from '../types';

describe('mergeArrowOffset', () => {
  it.each([null, undefined])('should return arrow offset when user offset is %s', userOffset => {
    expect(mergeArrowOffset(userOffset, 1)).toEqual({ crossAxis: 0, mainAxis: 1 });
  });

  it.each([
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
  ])('should return arrow offset when user offset is %s', (userOffset, expectedOffset) => {
    expect(mergeArrowOffset((userOffset as unknown) as Offset, 1)).toEqual(expectedOffset);
  });
});
