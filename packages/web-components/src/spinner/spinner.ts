import { attr } from '@microsoft/fast-element';
import { FASTProgressRing } from '@microsoft/fast-foundation';
import type { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

export class Spinner extends FASTProgressRing {
  /**
   * The size of the spinner
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size: SpinnerSize;

  /**
   * The appearance of the progress bar
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: SpinnerAppearance;
}
