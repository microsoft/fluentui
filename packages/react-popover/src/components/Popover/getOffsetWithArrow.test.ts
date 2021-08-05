import { Offset } from '@fluentui/react-positioning';
import { getOffsetWithArrow } from './getOffsetWithArrow';

describe('getOffsetWitArrow', () => {
  it.each([null, undefined])('should return arrow offset when user offset is %s', userOffset => {
    expect(getOffsetWithArrow(userOffset, 1)).toEqual([0, 1]);
  });

  it.each([
    [
      [0, 0],
      [0, 1],
    ],
    [
      [0, 1],
      [0, 2],
    ],
    [
      [0, undefined],
      [0, 1],
    ],
    [
      [0, null],
      [0, 1],
    ],
    [
      [undefined, 0],
      [undefined, 1],
    ],
    [
      [null, 0],
      [null, 1],
    ],
  ])('should return arrow offset when user offset is %s', (userOffset, expectedOffset) => {
    expect(getOffsetWithArrow((userOffset as unknown) as Offset, 1)).toEqual(expectedOffset);
  });
});
