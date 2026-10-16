import type { PositioningShorthand, PositioningProps } from '../types';

export function resolvePositioningShorthand(
  shorthand: PositioningShorthand | undefined | null,
): Readonly<PositioningProps> {
  if (shorthand === undefined || shorthand === null) {
    return {};
  }

  if (typeof shorthand === 'string') {
    // shorthands are `position` or `position-align`, e.g. `above-start`
    const [position, align = 'center'] = shorthand.split('-');
    return { position, align } as Pick<PositioningProps, 'position' | 'align'>;
  }

  return shorthand as Readonly<PositioningProps>;
}
