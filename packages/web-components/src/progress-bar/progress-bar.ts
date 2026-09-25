import { BaseProgressBar } from './progress-bar.base.js';
import type { ProgressBarShape, ProgressBarThickness } from './progress-bar.options.js';

/**
 * A Progress HTML Element.
 * Based on BaseProgressBar and includes style and layout specific attributes
 *
 * @tag fluent-progress-bar
 * @csspart indicator - The internal progress indicator element.
 * @presentational {ProgressBarThickness | undefined} thickness - The thickness of the progress bar.
 * @presentational {ProgressBarShape | undefined} shape - The shape of the progress bar.
 *
 * @public
 */
export class ProgressBar extends BaseProgressBar {}
