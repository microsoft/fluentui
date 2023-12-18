import { StartEndOptions } from '../patterns/index.js';
import type { StaticallyComposableHTML, ValuesOf } from '../utils/index.js';
import type { Badge } from './badge.js';

/**
 * @internal - marking as internal update when Badge PR for start/end is in
 */
export type BadgeOptions = StartEndOptions<Badge> & {
  defaultContent?: StaticallyComposableHTML;
};

/**
 * BadgeAppearance constants
 * @public
 */
export const BadgeAppearance = {
  filled: 'filled',
  ghost: 'ghost',
  outline: 'outline',
  tint: 'tint',
} as const;

/**
 * A Badge can be filled, outline, ghost, inverted
 * @public
 */
export type BadgeAppearance = ValuesOf<typeof BadgeAppearance>;

/**
 * BadgeColor constants
 * @public
 */
export const BadgeColor = {
  brand: 'brand',
  danger: 'danger',
  important: 'important',
  informative: 'informative',
  severe: 'severe',
  subtle: 'subtle',
  success: 'success',
  warning: 'warning',
} as const;

/**
 * A Badge can be one of preset colors
 * @public
 */
export type BadgeColor = ValuesOf<typeof BadgeColor>;

/**
 * A Badge can be square, circular or rounded.
 * @public
 */
export const BadgeShape = {
  circular: 'circular',
  rounded: 'rounded',
  square: 'square',
} as const;

/**
 * A Badge can be one of preset colors
 * @public
 */
export type BadgeShape = ValuesOf<typeof BadgeShape>;

/**
 * A Badge can be square, circular or rounded.
 * @public
 */
export const BadgeSize = {
  tiny: 'tiny',
  extraSmall: 'extra-small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extra-large',
} as const;

/**
 * A Badge can be on of several preset sizes.
 * @public
 */
export type BadgeSize = ValuesOf<typeof BadgeSize>;
