import { attr } from '@microsoft/fast-element';
import { FASTProgress } from '@microsoft/fast-foundation';
import type { ProgressBarShape, ProgressBarThickness, ProgressBarValidationState } from './progress-bar.options.js';

/**
 * The base class used for constructing a fluent-progress-bar custom element
 * @public
 */
export class ProgressBar extends FASTProgress {
  /**
   * The thickness of the progress bar
   *
   * @public
   * @remarks
   * HTML Attribute: thickness
   */
  @attr
  public thickness: ProgressBarThickness;

  /**
   * The shape of the progress bar
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape: ProgressBarShape;

  /**
   * The validation state of the progress bar
   * @public
   * @remarks
   * HTML Attribute: validation-state
   */
  @attr({ attribute: 'validation-state' })
  public validationState: ProgressBarValidationState | null;
}
