import type { PositioningProps, PositioningShorthand, PositioningShorthandValue } from '@fluentui/react-positioning';

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
  shorthand: PositioningShorthand | null | undefined,
): Readonly<PositioningProps> {
  if (shorthand === null || shorthand === undefined) {
    return {};
  }

  return typeof shorthand === 'string' ? shorthandLookup[shorthand] : shorthand;
}
