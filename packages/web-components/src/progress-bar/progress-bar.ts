import { attr } from '@microsoft/fast-element';
import { BaseProgress } from './base-progress.js';
import { ProgressBarShape, ProgressBarThickness, ProgressBarValidationState } from './progress-bar.options.js';

/**
 * An Progress HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#progressbar | ARIA progressbar }.
 *
 * @slot indeterminate - The slot for a custom indeterminate indicator
 * @csspart progress - Represents the progress element
 * @csspart determinate - The determinate indicator
 * @csspart indeterminate - The indeterminate indicator
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
