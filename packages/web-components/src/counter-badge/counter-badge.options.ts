import { BadgeOptions } from '../badge/badge.options.js';
import type { ValuesOf } from '../utils/index.js';

/**
 * CounterBadge options
 * @public
 */
export type CounterBadgeOptions = BadgeOptions;

/**
 * CounterBadgeAppearance constants
 * @public
 */
export const CounterBadgeAppearance = {
  filled: 'filled',
  ghost: 'ghost',
} as const;

/**
 * A CounterBadge can have an appearance of filled or ghost
 * @public
 */
export type CounterBadgeAppearance = ValuesOf<typeof CounterBadgeAppearance>;

/**
 * CounterBadgeColor constants
 * @public
 */
export const CounterBadgeColor = {
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
 * A CounterBadge can be one of preset colors
 * @public
 */
export type CounterBadgeColor = ValuesOf<typeof CounterBadgeColor>;

/**
 * A CounterBadge shape can be circular or rounded.
 * @public
 */
export const CounterBadgeShape = {
  circular: 'circular',
  rounded: 'rounded',
} as const;

/**
 * A CounterBadge can be one of preset colors
 * @public
 */
export type CounterBadgeShape = ValuesOf<typeof CounterBadgeShape>;

/**
 * A CounterBadge can be square, circular or rounded.
 * @public
 */
export const CounterBadgeSize = {
  tiny: 'tiny',
  extraSmall: 'extra-small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extra-large',
} as const;

/**
 * A CounterBadge can be on of several preset sizes.
 * @public
 */
export type CounterBadgeSize = ValuesOf<typeof CounterBadgeSize>;
