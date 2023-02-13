import { attr, FASTElement } from '@microsoft/fast-element';
import { BorderRadius, ImageFit, ImageShape } from './image.options.js';

/**
 * The base class used for constucting a fluent image custom element
 * @public
 */
export class Image extends FASTElement {
  /**
   * Image border
   *
   * @public
   * @remarks
   * HTML attribute: border.
   */
  @attr({ mode: 'boolean' })
  public border?: boolean;
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
   * Border Radius
   *
   * @public
   * @remarks
   * Degree of border roundness.
   */
  @attr({ attribute: 'border-radius' })
  public borderRadius: BorderRadius;
  /**
   * Image fit
   *
   * @public
   * @remarks
   * HTML attribute: fit.
   */
  @attr
  public fit: ImageFit;
  /**
   * Image shape
   *
   * @public
   * @remarks
   * HTML attribute: shape.
   */
  @attr
  public shape: ImageShape;
}
