import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * Types of image fit
 * @public
 */
export type ImageFit = 'none' | 'center' | 'contain' | 'cover';

/**
 * @internal
 */
export class Image extends FASTElement {
  /**
   * An image can appear with rectangular border.
   *
   * @public
   * @remarks
   * HTML Attribute: bordered
   */
  @attr({ mode: 'boolean' })
  public bordered: boolean = false;

  /**
   * An image can set how it should be resized to fit its container.
   *
   * @public
   * @remarks
   * HTML Attribute: fit
   */
  @attr
  public fit: ImageFit;

  /**
   * An image can take up the width of its container.
   *
   * @public
   * @remarks
   * HTML Attribute: block
   */
  @attr({ mode: 'boolean' })
  block: boolean = false;

  /**
   * An image can appear square, circular, or rounded.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  shape: 'square' | 'circular' | 'rounded';

  /**
   * An image can appear elevated with shadow.
   *
   * @public
   * @remarks
   * HTML Attribute: shadow
   */
  shadow: boolean;
}
