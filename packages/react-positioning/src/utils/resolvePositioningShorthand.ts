import type { PositioningShorthand, PositioningShorthandValue, PositioningProps } from '../types';

// Look up table for shorthand to avoid parsing strings
const shorthandLookup: Record<PositioningShorthandValue, Pick<PositioningProps, 'position' | 'align'>> = {
  above: { position: 'above', align: 'center' },
  'above-start': { position: 'above', align: 'start' },
  'above-end': { position: 'above', align: 'end' },
  below: { position: 'below', align: 'center' },
  'below-start': { position: 'below', align: 'start' },
  'below-end': { position: 'below', align: 'end' },
  before: { position: 'before', align: 'center' },
  'before-top': { position: 'before', align: 'top' },
  'before-bottom': { position: 'before', align: 'bottom' },
  after: { position: 'after', align: 'center' },
  'after-top': { position: 'after', align: 'top' },
  'after-bottom': { position: 'after', align: 'bottom' },
};

export function resolvePositioningShorthand(
  shorthand: PositioningShorthand | undefined | null,
): Readonly<PositioningProps> {
  if (shorthand === undefined || shorthand === null) {
    return {};
  }

  if (typeof shorthand === 'string') {
    return shorthandLookup[shorthand];
  }

  return shorthand as Readonly<PositioningProps>;
}
