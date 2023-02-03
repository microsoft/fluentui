import { attr, FASTElement } from '@microsoft/fast-element';
import { BorderRadius, ImageFit, ImageShape } from './image.options.js';

/**
 * The base class used for constucting a fluent image custom element
 * @public
 */
export class Image extends FASTElement {
  /**
   * Image description
   *
   * @public
   * @remarks
   * HTML attribute: alt.
   */
  @attr
  public alt: string;
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
  public border?: boolean;
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
   * Image margin
   *
   * @public
   * @remarks
   * HTML attribute: margin.
   */
  @attr({ mode: 'boolean' })
  public margin?: boolean;
  /**
   * presentation
   *
   * @public
   * @remarks
   * HTML attribute: role="presentation"
   */
  @attr({ mode: 'boolean' })
  public presentation?: boolean;
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
   * Image shape
   *
   * @public
   * @remarks
   * HTML attribute: shape.
   */
  @attr
  public shape: ImageShape;
  /**
   * Image source
   *
   * @public
   * @remarks
   * HTML attribute: src.
   */
  @attr
  public src: string;
}
