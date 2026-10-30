import type { PositioningProps, PositioningShorthand } from './types';

type ResolvePositioningShorthand = (shorthand: PositioningShorthand | undefined | null) => Readonly<PositioningProps>;

export const resolvePositioningShorthand: ResolvePositioningShorthand = shorthand => {
  if (typeof shorthand !== 'string') {
    return shorthand ?? {};
  }

  const [position, align = 'center'] = shorthand.split('-');
  return { position, align } as PositioningProps;
};
