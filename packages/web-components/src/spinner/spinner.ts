import { BaseSpinner } from './spinner.base.js';
import type { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

/**
 * A Spinner Custom HTML Element.
 * Based on BaseSpinner and includes style and layout specific attributes
 *
 * @tag fluent-spinner
 *
 * @presentational {SpinnerAppearance | undefined} appearance - The appearance of the spinner.
 * @presentational {SpinnerSize | undefined} size - The size of the spinner.
 *
 * @public
 */
export class Spinner extends BaseSpinner {}
