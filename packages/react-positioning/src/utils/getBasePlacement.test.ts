import * as PopperJs from '@popperjs/core';
import { getBasePlacement } from './getBasePlacement';

describe('getBasePlacement', () => {
  it.each([
    ['top', 'top'],
    ['bottom', 'bottom'],
    ['right', 'right'],
    ['left', 'left'],
    ['top-start', 'top'],
    ['top-end', 'top'],
    ['bottom-start', 'bottom'],
    ['bottom-end', 'bottom'],
    ['right-start', 'right'],
    ['right-end', 'right'],
    ['left-start', 'left'],
    ['left-end', 'left'],
  ])('should return %s from %s', (placement, basePlacement) => {
    expect(getBasePlacement((placement as unknown) as PopperJs.Placement)).toEqual(basePlacement);
  });
});
