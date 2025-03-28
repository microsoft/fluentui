import { attr } from '@microsoft/fast-element';
import { swapStates } from '../utils/element-internals.js';
import { BaseSpinner } from './spinner.base.js';
import { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

/**
 * A Spinner Custom HTML Element.
 * Based on BaseSpinner and includes style and layout specific attributes
 *
 * @tag fluent-spinner
 */
export class Spinner extends BaseSpinner {
  /**
   * The size of the spinner
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: SpinnerSize;

  /**
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: SpinnerSize | undefined, next: SpinnerSize | undefined) {
    swapStates(this.elementInternals, prev, next, SpinnerSize);
  }

  /**
   * The appearance of the spinner
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: SpinnerAppearance;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: SpinnerAppearance | undefined, next: SpinnerAppearance | undefined) {
    swapStates(this.elementInternals, prev, next, SpinnerAppearance);
  }
}
