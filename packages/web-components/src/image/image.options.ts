import { ValuesOf } from '@microsoft/fast-foundation';

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
