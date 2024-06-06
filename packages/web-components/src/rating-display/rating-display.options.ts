import type { ValuesOf } from '../utils/index.js';

/**
 * The size of a Rating Display can be `small`, `medium` or `large`.
 * @public
 */
export const RatingDisplaySize = {
  medium: 'medium',
} as const;

/**
 * A Rating Display can be one of several preset sizes.
 * @public
 */
export type RatingDisplaySize = ValuesOf<typeof RatingDisplaySize>;
