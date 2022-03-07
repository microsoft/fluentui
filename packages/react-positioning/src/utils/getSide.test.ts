import * as FloatingUI from '@floating-ui/dom';
import { getSide } from './getSide';

describe('getSide', () => {
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
    expect(getSide((placement as unknown) as FloatingUI.Placement)).toEqual(basePlacement);
  });
});
