import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * Border radius
 * @public
 */
export const BorderRadius = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'x-large',
} as const;
/**
 * Types for border radius
 * @public
 */
export type BorderRadius = ValuesOf<typeof BorderRadius>;
/**
 * Image fit
 * @public
 */
export const ImageFit = {
  none: 'none',
  center: 'center',
  contain: 'contain',
  cover: 'cover',
  default: 'default', // fluent UI React v9 shows 'default'. Essentially when fit is unspecified.
  // Is default and none the same?
} as const;
/**
 * Types for image fit
 * @public
 */
export type ImageFit = ValuesOf<typeof ImageFit>;

/**
 * Image shape
 * @public
 */
export const ImageShape = {
  circular: 'circular',
  rounded: 'rounded',
  square: 'square',
} as const;

export type ImageShape = ValuesOf<typeof ImageShape>;
