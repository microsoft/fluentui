import { StartEndOptions } from '../../patterns/index.js';
import type { StaticallyComposableHTML, ValuesOf } from '../../utils/index.js';
import type { KumoBadge } from './badge.js';

/**
 * @internal - marking as internal update when Badge PR for start/end is in
 */
export type KumoBadgeOptions = StartEndOptions<KumoBadge> & {
  defaultContent?: StaticallyComposableHTML;
};

/**
 * KumoBadgeAppearance constants
 * @public
 */
export const KumoBadgeAppearance = {
  neutral: 'neutral',
  brand: 'brand',
  transparent: 'transparent',
} as const;

/**
 * A Badge can be neutral, brand, transparent
 * @public
 */
export type KumoBadgeAppearance = ValuesOf<typeof KumoBadgeAppearance>;
