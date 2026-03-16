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
   * The thickness of the progress bar
   *
   * HTML Attribute: `thickness`
   *
   * @public
   */
  @attr
  public thickness?: ProgressBarThickness;

  /**
   * The shape of the progress bar
   * The shape of the progress bar
   *
   * HTML Attribute: `shape`
   *
   * @public
   */
  @attr
  public shape?: ProgressBarShape;
}
