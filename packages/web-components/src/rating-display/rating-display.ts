import { attr } from '@microsoft/fast-element';
import { swapStates } from '../utils/element-internals.js';
import { BaseRatingDisplay } from './rating-display.base.js';
import { RatingDisplayColor, RatingDisplaySize } from './rating-display.options.js';

/**
 * A Rating Display Custom HTML Element.
 * Based on BaseRatingDisplay and includes style and layout specific attributes
 *
 * @public
 */
export class RatingDisplay extends BaseRatingDisplay {
  /**
   * The color of the rating display icons.
   *
   * @public
   * @default `marigold`
   * @remarks
   * HTML Attribute: `color`
   */
  @attr
  public color?: RatingDisplayColor;

  /**
   * Handles changes to the color attribute.
   *
   * @param prev - The previous state
   * @param next - The next state
   */
  public colorChanged(prev: RatingDisplayColor | undefined, next: RatingDisplayColor | undefined): void {
    swapStates(this.elementInternals, prev, next, RatingDisplayColor);
  }

  /**
   * The size of the component.
   *
   * @public
   * @default 'medium'
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: RatingDisplaySize;

  /**
   * Handles changes to the size attribute.
   *
   * @param prev - The previous state
   * @param next - The next state
   */
  public sizeChanged(prev: RatingDisplaySize | undefined, next: RatingDisplaySize | undefined) {
    swapStates(this.elementInternals, prev, next, RatingDisplaySize);
  }

  /**
   * Renders a single filled icon with a label next to it.
   *
   * @public
   * @remarks
   * HTML Attribute: `compact`
   */
  @attr({ mode: 'boolean' })
  public compact: boolean = false;

  /**
   * Overrides the selected value and returns 1 if compact is true.
   *
   * @override
   */
  protected override getSelectedValue(): number {
    return Math.round((this.compact ? 1 : this.value ?? 0) * 2) / 2;
  }

  /**
   * Overrides the maximum icons and returns a max of 1 if compact is true.
   *
   * @override
   */
  protected override getMaxIcons(): number {
    return (this.compact ? 1 : this.max ?? 5) * 2;
  }
}
