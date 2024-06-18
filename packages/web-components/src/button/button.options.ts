import { StartEndOptions } from '../patterns/index.js';
import type { ValuesOf } from '../utils/index.js';
import type { Button } from './button.js';

/**
 * ButtonAppearance constants
 * @public
 */
export const ButtonAppearance = {
  primary: 'primary',
  outline: 'outline',
  subtle: 'subtle',
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

/**
 * Button type values.
 *
 * @public
 */
export const ButtonType = {
  submit: 'submit',
  reset: 'reset',
  button: 'button',
} as const;

/**
 * Type for button type values.
 *
 * @public
 */
export type ButtonType = ValuesOf<typeof ButtonType>;

/**
 * Button configuration options.
 * @public
 */
export type ButtonOptions = StartEndOptions<Button>;

/**
 * Button `formtarget` attribute values.
 * @public
 */
export const ButtonFormTarget = {
  blank: '_blank',
  self: '_self',
  parent: '_parent',
  top: '_top',
} as const;

/**
 * Types for the `formtarget` attribute values.
 * @public
 */
export type ButtonFormTarget = ValuesOf<typeof ButtonFormTarget>;
