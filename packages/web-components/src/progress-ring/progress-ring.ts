import { BaseProgress } from '../progress-bar/base-progress.js';

/**
 * An circular Progress HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#progressbar | ARIA progressbar }.
 *
 * @slot indeterminate - The slot for a custom indeterminate indicator
 * @slot determinate - The slot for a custom determinate indicator
 * @csspart progress - Represents the progress element
 * @csspart determinate - The determinate indicator
 * @csspart background - The background
 *
 * @public
 */
export class ProgressRing extends BaseProgress {}
