import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { RatingDisplayColor, RatingDisplaySize } from './rating-display.options.js';

/**
 * The base class used for constructing a fluent-rating-display custom element
 * @public
 */
export class RatingDisplay extends FASTElement {
  /**
   * The color of the rating display icons.
   *
   * @public
   * @default `marigold`
   * @remarks
   * HTML Attribute: `color`
   */
  @attr
  public color: RatingDisplayColor = RatingDisplayColor.marigold;

  /**
   * Renders a single filled icon with a label next to it.
   *
   * @public
   * @remarks
   * HTML Attribute: `compact`
   */
  @attr({ attribute: 'compact', mode: 'boolean' })
  public compact: boolean = false;
  protected compactChanged(): void {
    if (this.compact) {
      this.max = 1;
    }
  }

  /**
   * The number of ratings.
   *
   * @public
   * @remarks
   * HTML Attribute: `count`
   */
  @attr({ converter: nullableNumberConverter })
  public count?: number;

  /**
   * The maximum possible value of the rating.
   * This attribute determines the number of icons displayed.
   * Must be a whole number greater than 1.
   *
   * @public
   * @remarks
   * HTML Attribute: `max`
   */
  @attr({ converter: nullableNumberConverter })
  public max: number = 5;

  /**
   * The size of the component.
   *
   * @public
   * @default 'medium'
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size: RatingDisplaySize = RatingDisplaySize.medium;

  /**
   * The value of the rating.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ converter: nullableNumberConverter })
  public value: number = 0;

  /**
   * Returns an array of icon values based on the `max` attribute.
   *
   * @internal
   */
  public get icons(): number[] {
    // Create an array of values from 0.5 to the max value, incrementing by 0.5.
    return Array.from({ length: Math.round(Math.abs(this.compact ? 1 : this.max)) * 2 }, (_, i) => (i + 1) / 2);
  }

  /**
   * Returns a boolean that determines if the icon passed as an argument is selected.
   *
   * @internal
   */
  public isIconSelected(iconValue: number): boolean {
    // Compare the argument to the value attribute, rounded to the nearest half.
    return iconValue === Math.round((this.compact ? 1 : this.value) * 2) / 2;
  }

  /**
   * The ID of the rating value and count label elements.
   *
   * @internal
   */
  public readonly uid: string = uniqueId('rating-display-');
}
