import type { ValuesOf } from '../utils/index.js';

/**
 * Image fit
 * @public
 */
export const ImageFit = {
  none: 'none',
  center: 'center',
  contain: 'contain',
  cover: 'cover',
  default: 'default',
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
