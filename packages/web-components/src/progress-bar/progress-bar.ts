import { attr } from '@microsoft/fast-element';
import { BaseProgress } from './base-progress.js';
import { ProgressBarShape, ProgressBarThickness, ProgressBarValidationState } from './progress-bar.options.js';

/**
 * A ProgressBar component that provides a customizable progress bar element.
 * @class ProgressBar
 * @extends BaseProgress
 *
 * @attr thickness - The thickness of the progress bar.
 * @attr shape - The shape of the progress bar.
 * @attr validation-state - The validation state of the progress bar.
 *
 * @csspart progress - Represents the progress element.
 * @csspart determinate - The determinate indicator.
 * @csspart indeterminate - The indeterminate indicator.
 *
 * @slot indeterminate - The slot for a custom indeterminate indicator.
 *
 * @summary The ProgressBar component functions as a customizable progress bar element.
 *
 * @tag fluent-progress-bar
 *
 * @public
 */

export class ProgressBar extends BaseProgress {
  /**
   * The thickness of the progress bar
   *
   * @public
   * @remarks
   * HTML Attribute: thickness
   */
  @attr
  public thickness?: ProgressBarThickness;

  /**
   * The shape of the progress bar
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: ProgressBarShape;

  /**
   * The validation state of the progress bar
   * @public
   * @remarks
   * HTML Attribute: validation-state
   */
  @attr({ attribute: 'validation-state' })
  public validationState: ProgressBarValidationState | null = null;
}
