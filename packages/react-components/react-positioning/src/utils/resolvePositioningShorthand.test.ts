import { resolvePositioningShorthand } from './resolvePositioningShorthand';
import type { PositioningShorthandValue, PositioningProps } from '../types';

describe('resolvePositioningShorthand', () => {
  it.each<[PositioningShorthandValue, Pick<PositioningProps, 'position' | 'align'>]>([
    ['above', { position: 'above', align: 'center' }],
    ['above-start', { position: 'above', align: 'start' }],
    ['above-end', { position: 'above', align: 'end' }],
    ['below', { position: 'below', align: 'center' }],
    ['below-start', { position: 'below', align: 'start' }],
    ['below-end', { position: 'below', align: 'end' }],
    ['before', { position: 'before', align: 'center' }],
    ['before-top', { position: 'before', align: 'top' }],
    ['before-bottom', { position: 'before', align: 'bottom' }],
    ['after', { position: 'after', align: 'center' }],
    ['after-top', { position: 'after', align: 'top' }],
    ['after-bottom', { position: 'after', align: 'bottom' }],
  ])("should parse '%s' shorthand", (shorthand, expected) => {
    expect(resolvePositioningShorthand(shorthand)).toEqual(expected);
  });
});
