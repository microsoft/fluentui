import { attr } from '@microsoft/fast-element';
import { FASTFlipper } from '@microsoft/fast-foundation';
import { FlipperSize } from './flipper.options.js';

export class Flipper extends FASTFlipper {
  /**
   * Size for the flipper component. Sets the render size of the flipper component
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size: FlipperSize = FlipperSize.medium;

  /**
   * Inline
   *
   * @public
   * @remarks
   * HTML Attribute: inline
   */
  @attr({ mode: 'boolean' })
  public inline: boolean = false;
}
