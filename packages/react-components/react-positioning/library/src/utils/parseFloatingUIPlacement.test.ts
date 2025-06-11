import * as FloatingUI from '@floating-ui/dom';
import { parseFloatingUIPlacement } from './parseFloatingUIPlacement';

describe('getSide', () => {
  it.each([
    ['top', { side: 'top' }],
    ['bottom', { side: 'bottom' }],
    ['right', { side: 'right' }],
    ['left', { side: 'left' }],
    ['top-start', { side: 'top', alignment: 'start' }],
    ['top-end', { side: 'top', alignment: 'end' }],
    ['bottom-start', { side: 'bottom', alignment: 'start' }],
    ['bottom-end', { side: 'bottom', alignment: 'end' }],
    ['right-start', { side: 'right', alignment: 'start' }],
    ['right-end', { side: 'right', alignment: 'end' }],
    ['left-start', { side: 'left', alignment: 'start' }],
    ['left-end', { side: 'left', alignment: 'end' }],
  ])('should return %s from %s', (placement, basePlacement) => {
    expect(parseFloatingUIPlacement(placement as unknown as FloatingUI.Placement)).toEqual(basePlacement);
  });
});
