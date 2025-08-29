import { attr } from '@microsoft/fast-element';
import { BaseRatingDisplay } from './rating-display.base.js';
import type { RatingDisplayColor, RatingDisplaySize } from './rating-display.options.js';

/**
 * A Rating Display Custom HTML Element.
 * Based on BaseRatingDisplay and includes style and layout specific attributes
 *
 * @tag fluent-rating-display
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
   * Renders a single filled icon with a label next to it.
   *
   * @public
   * @remarks
   * HTML Attribute: `compact`
   */
  @attr({ mode: 'boolean' })
  public compact: boolean = false;
}
