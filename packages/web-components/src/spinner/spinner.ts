import { attr } from '@microsoft/fast-element';
import { BaseProgress } from '../progress-bar/base-progress.js';
import type { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

/**
 * The base class used for constructing a fluent-spinner custom element
 * @public
 */
export class Spinner extends BaseProgress {
  /**
   * The size of the spinner
   *
   * @public
   * @default 'medium'
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: SpinnerSize;

  /**
   * The appearance of the spinner
   * @public
   * @default 'primary'
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: SpinnerAppearance;
}
