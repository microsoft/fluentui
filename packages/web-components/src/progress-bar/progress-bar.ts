import { attr } from '@microsoft/fast-element';
import { BaseProgressBar } from './progress-bar.base.js';
import type { ProgressBarShape, ProgressBarThickness } from './progress-bar.options.js';

/**
 * A Progress HTML Element.
 * Based on BaseProgressBar and includes style and layout specific attributes
 *
 * @tag fluent-progress-bar
 *
 * @public
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
   * The shape of the progress bar
   * @public
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: ProgressBarShape;
}
