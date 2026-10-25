import { resolvePositioningShorthand as resolveCanonicalPositioningShorthand } from '@fluentui/react-positioning';
import type { PositioningProps as CanonicalPositioningProps } from '@fluentui/react-positioning';
import type { PositioningEngine, PositioningShorthand } from './types';

/**
 * A positioning configuration after shorthand resolution.
 *
 * Widened to the canonical option shape because an engine legitimately receives the full option
 * set; the narrowing that keeps unsupported options out lives on `PositioningShorthand`, which is
 * what components accept.
 */
export type ResolvedPositioning = CanonicalPositioningProps & { engine?: 'default' | PositioningEngine };

type ResolvePositioningShorthand = (
  shorthand: PositioningShorthand | undefined | null,
) => Readonly<ResolvedPositioning>;

export const resolvePositioningShorthand = resolveCanonicalPositioningShorthand as ResolvePositioningShorthand;
