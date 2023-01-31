import { attr } from '@microsoft/fast-element';
import { FASTImage } from '@microsoft/fast-foundation';
import { ImageAlignContent, ImageAppearance } from './image.options.js';

/**
 * @class Image component
 *
 * @remarks
 * This class extends the FASTImage. A image groups sections of content to create visual rhythm and hierarchy. Use images along with spacing and headers to organize content in your layout.
 */
export class Image extends FASTImage {
  /**
   * @property alignContent
   * @default center (ImageAlignContent.center)
   * @remarks
   * Determines the alignment of the content within the image. Select from center, start, or end.
   */
  @attr({ attribute: 'align-content' })
  public alignContent?: ImageAlignContent;

  /**
   * @property appearance
   * @default default (ImageAppearance.default)
   * @remarks
   * A image can have one of the preset appearances. When not specified, the image has its default appearance. Select from strong, brand, subtle, default.
   */
  @attr({ attribute: 'appearance' })
  public appearance?: ImageAppearance;

  /**
   * @property inset
   * @default false
   * @remarks
   * Adds padding to the beginning and end of the image.
   */
  @attr({ mode: 'boolean' })
  public inset?: boolean;
}
