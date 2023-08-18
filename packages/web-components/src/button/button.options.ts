import type { ButtonOptions } from '@microsoft/fast-foundation/button.js';
import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';

/**
 * ButtonAppearance constants
 * @public
 */
export const ButtonAppearance = {
  primary: 'primary',
  outline: 'outline',
  subtle: 'subtle',
  secondary: 'secondary',
  transparent: 'transparent',
} as const;

/**
 * A Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export type ButtonAppearance = ValuesOf<typeof ButtonAppearance>;

/**
 * A Button can be square, circular or rounded.
 * @public
 */
export const ButtonShape = {
  circular: 'circular',
  rounded: 'rounded',
  square: 'square',
} as const;

/**
 * A Button can be square, circular or rounded
 * @public
 */
export type ButtonShape = ValuesOf<typeof ButtonShape>;

/**
 * A Button can be a size of small, medium or large.
 * @public
 */
export const ButtonSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * A Button can be on of several preset sizes.
 * @public
 */
export type ButtonSize = ValuesOf<typeof ButtonSize>;

export { ButtonOptions };
