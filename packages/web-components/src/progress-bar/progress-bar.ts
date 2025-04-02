import { attr } from '@microsoft/fast-element';
import { swapStates } from '../utils/element-internals.js';
import { BaseProgressBar } from './progress-bar.base.js';
import { ProgressBarShape, ProgressBarThickness } from './progress-bar.options.js';

/**
 * A Progress HTML Element.
 * Based on BaseProgressBar and includes style and layout specific attributes
 *
 * @tag fluent-progress-bar
 *
 */
export class ProgressBar extends BaseProgressBar {
  /**
   * The thickness of the progress bar
   *
   * @public
   * HTML Attribute: `thickness`
   */
  @attr
  public thickness?: ProgressBarThickness;

  /**
   * Handles changes to thickness attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public thicknessChanged(prev: ProgressBarThickness | undefined, next: ProgressBarThickness | undefined) {
    swapStates(this.elementInternals, prev, next, ProgressBarThickness);
  }

  /**
   * The shape of the progress bar
   * @public
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: ProgressBarShape;

  /**
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: ProgressBarShape | undefined, next: ProgressBarShape | undefined) {
    swapStates(this.elementInternals, prev, next, ProgressBarShape);
  }
}
