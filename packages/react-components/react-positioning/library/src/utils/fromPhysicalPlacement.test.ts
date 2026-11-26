import type { Alignment, Position, Side } from '../types';
import { fromPhysicalPlacement } from './fromPhysicalPlacement';

describe('fromPhysicalPlacement', () => {
  it.each<[Side, 'start' | 'end' | undefined, Position, Alignment | undefined]>([
    ['top', 'start', 'above', 'start'],
    ['top', undefined, 'above', undefined],
    ['top', 'end', 'above', 'end'],
    ['bottom', 'start', 'below', 'start'],
    ['bottom', undefined, 'below', undefined],
    ['bottom', 'end', 'below', 'end'],
    ['left', 'start', 'before', 'top'],
    ['left', undefined, 'before', undefined],
    ['left', 'end', 'before', 'bottom'],
    ['right', 'start', 'after', 'top'],
    ['right', undefined, 'after', undefined],
    ['right', 'end', 'after', 'bottom'],
  ])('maps side %s and alignment %s to %s and %s', (side, align, position, alignment) => {
    expect(fromPhysicalPlacement(side, align)).toEqual({ position, alignment });
  });
});
