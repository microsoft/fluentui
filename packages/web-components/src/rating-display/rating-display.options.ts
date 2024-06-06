import type { ValuesOf } from '../utils/index.js';

/**
 * The color of the Rating Display items can be `neutral`, `brand`, or `marigold`.
 * @public
 */
export const RatingDisplayColor = {
  neutral: 'neutral',
  brand: 'brand',
  marigold: 'marigold',
} as const;

/**
 * The size of a Rating Display can be `small`, `medium`, or `large`.
 * @public
 */
export const RatingDisplaySize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * The Rating Display items can be one of several colors.
 * @public
 */
export type RatingDisplayColor = ValuesOf<typeof RatingDisplayColor>;

/**
 * A Rating Display can be one of several preset sizes.
 * @public
 */
export type RatingDisplaySize = ValuesOf<typeof RatingDisplaySize>;
