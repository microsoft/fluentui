import type { ValuesOf } from '../utils/typings.js';
import { FluentDesignSystem } from '../fluent-design-system.js';

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

/**
 * The tag name for the rating display element.
 *
 * @public
 */
export const tagName = `${FluentDesignSystem.prefix}-rating-display` as const;
