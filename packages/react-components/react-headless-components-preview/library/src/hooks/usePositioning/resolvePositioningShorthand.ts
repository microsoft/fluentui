import { resolvePositioningShorthand as resolveCanonicalPositioningShorthand } from '@fluentui/react-positioning';
import type { PositioningProps, PositioningShorthand } from './types';

type ResolvePositioningShorthand = (shorthand: PositioningShorthand | undefined | null) => Readonly<PositioningProps>

export const resolvePositioningShorthand = resolveCanonicalPositioningShorthand as ResolvePositioningShorthand;
