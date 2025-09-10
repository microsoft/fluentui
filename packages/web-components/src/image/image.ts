import { attr, FASTElement } from '@microsoft/fast-element';
import { ImageFit, ImageShape } from './image.options.js';

/**
 * The base class used for constucting a fluent image custom element
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
