import type { ValuesOf } from '../utils/index.js';

/**
 * A Labels font size can be small, medium, or large
 */
export const LabelSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * Applies font size to label
 * @public
 */
export type LabelSize = ValuesOf<typeof LabelSize>;

/**
 * A label can have a font weight of regular or strong
 */
export const LabelWeight = {
  regular: 'regular',
  semibold: 'semibold',
} as const;

/**
 * Applies font weight to label
 * @public
 */
export type LabelWeight = ValuesOf<typeof LabelWeight>;
