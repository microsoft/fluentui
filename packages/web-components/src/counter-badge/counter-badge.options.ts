import { FluentDesignSystem } from '../fluent-design-system.js';
import type { StartEndOptions } from '../patterns/start-end.js';
import type { ValuesOf } from '../utils/typings.js';
import type { CounterBadge } from './counter-badge.js';

/**
 * Template options for CounterBadge component.
 *
 * @public
 */
export type CounterBadgeOptions = StartEndOptions<CounterBadge>;

/**
 * Values for the `appearance` attribute on CounterBadge elements.
 *
 * @public
 */
export const CounterBadgeAppearance = {
  filled: 'filled',
  ghost: 'ghost',
} as const;

/**
 * Type for the `appearance` attribute on CounterBadge elements, based on the CounterBadgeAppearance constants.
 * @public
 */
export type CounterBadgeAppearance = ValuesOf<typeof CounterBadgeAppearance>;

/**
 * Values for the `color` attribute on CounterBadge elements.
 *
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
 * Type for the `color` attribute on CounterBadge elements, based on the CounterBadgeColor constants.
 * @public
 */
export type CounterBadgeColor = ValuesOf<typeof CounterBadgeColor>;

/**
 * Values for the `shape` attribute on CounterBadge elements.
 *
 * @public
 */
export const CounterBadgeShape = {
  circular: 'circular',
  rounded: 'rounded',
} as const;

/**
 * Type for the `shape` attribute on CounterBadge elements, based on the CounterBadgeShape constants.
 *
 * @public
 */
export type CounterBadgeShape = ValuesOf<typeof CounterBadgeShape>;

/**
 * Values for the `size` attribute on CounterBadge elements.
 *
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
 * Type for the `size` attribute on CounterBadge elements, based on the CounterBadgeSize constants.
 *
 * @public
 */
export type CounterBadgeSize = ValuesOf<typeof CounterBadgeSize>;

/**
 * The tag name for the counter badge element.
 *
 * @public
 */
export const tagName = `${FluentDesignSystem.prefix}-counter-badge` as const;
