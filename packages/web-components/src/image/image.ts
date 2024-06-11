import { attr, FASTElement } from '@microsoft/fast-element';
import { ImageFit, ImageShape } from './image.options.js';

/**
 * An Image component that provides a customizable image element.
 * @class Image
 * @extends FASTElement
 *
 * @attr block - Image layout.
 * @attr bordered - Image border.
 * @attr shadow - Image shadow.
 * @attr fit - Image fit.
 * @attr shape - Image shape.
 *
 * @csspart root - The root element of the image.
 *
 * @slot - Default slot for the content of the image.
 *
 * @summary The Image component functions as a customizable image element.
 *
 * @tag fluent-image
 *
 * @public
 */

export class Image extends FASTElement {
  /**
   * Image layout
   *
   * @public
   * @remarks
   * HTML attribute: block.
   */
  @attr({ mode: 'boolean' })
  public block?: boolean;
  /**
   * Image border
   *
   * @public
   * @remarks
   * HTML attribute: border.
   */
  @attr({ mode: 'boolean' })
  public bordered?: boolean;
  /**
   * Image shadow
   *
   * @public
   * @remarks
   * HTML attribute: shadow.
   */
  @attr({ mode: 'boolean' })
  public shadow?: boolean;
  /**
   * Image fit
   *
   * @public
   * @remarks
   * HTML attribute: fit.
   */
  @attr
  public fit?: ImageFit;
  /**
   * Image shape
   *
   * @public
   * @remarks
   * HTML attribute: shape.
   */
  @attr
  public shape?: ImageShape;
}
