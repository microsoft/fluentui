import { ImageRole, ValuesOf } from '@microsoft/fast-foundation';
import { Orientation } from '@microsoft/fast-web-utilities';

/**
 * Fast Foundation ImageRole property
 * @public
 */
export { ImageRole };

/**
 * Fast Web Utilties Orientation property
 * @public
 */
export { Orientation as ImageOrientation };

/**
 * Align content within image
 * @public
 */
export const ImageAlignContent = {
  center: 'center',
  start: 'start',
  end: 'end',
} as const;

/**
 * The types for ImageAlignContent
 * @public
 */
export type ImageAlignContent = ValuesOf<typeof ImageAlignContent>;

/**
 * ImageAppearance - image color defined by a design token alias.
 * @public
 */
export const ImageAppearance = {
  strong: 'strong',
  brand: 'brand',
  subtle: 'subtle',
  default: 'default',
} as const;

/**
 * The types for Appearance
 * @public
 */
export type ImageAppearance = ValuesOf<typeof ImageAppearance>;
