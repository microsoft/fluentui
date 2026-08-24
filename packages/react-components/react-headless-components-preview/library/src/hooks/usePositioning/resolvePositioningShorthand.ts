import { resolvePositioningShorthand as resolveCanonicalPositioningShorthand } from '@fluentui/react-positioning';
import type { PositioningProps, PositioningShorthand } from './types';

export function resolvePositioningShorthand(
  shorthand: PositioningShorthand | undefined | null,
): Readonly<PositioningProps> {
  return resolveCanonicalPositioningShorthand(shorthand) as Readonly<PositioningProps>;
}
