import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { RatingDisplayColor, RatingDisplaySize } from './rating-display.options.js';

/**
 * The base class used for constructing a fluent-rating-display custom element
 * @public
 */
export class RatingDisplay extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

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
    if (prev) toggleState(this.elementInternals, prev, false);
    if (next) toggleState(this.elementInternals, next, true);
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
  public max?: number;

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
  public sizeChanged(prev: RatingDisplaySize | undefined, next: RatingDisplaySize | undefined): void {
    if (prev) toggleState(this.elementInternals, prev, false);
    if (next) toggleState(this.elementInternals, next, true);
  }

  /**
   * The value of the rating.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ converter: nullableNumberConverter })
  public value?: number;

  private intlNumberFormatter = new Intl.NumberFormat();

  constructor() {
    super();

    this.elementInternals.role = 'img';
  }

  /**
   * Returns "count" as string, formatted according to the locale.
   *
   * @internal
   */
  public get formattedCount(): string {
    return this.count ? this.intlNumberFormatter.format(this.count) : '';
  }

  /**
   * Generates the icon SVG elements based on the "max" attribute.
   *
   * @internal
   */
  public generateIcons(): string {
    let htmlString: string = '';

    // The value of the selected icon. Based on the "value" attribute, rounded to the nearest half.
    const selectedValue: number = Math.round((this.compact ? 1 : this.value ?? 0) * 2) / 2;

    // Render the icons based on the "max" attribute. If "max" is not set, render 5 icons.
    // If "compact" is true, only render one filled icon.
    for (let i: number = 0; i < (this.compact ? 1 : this.max ?? 5) * 2; i++) {
      const iconValue: number = (i + 1) / 2;

      htmlString += `<svg aria-hidden="true" ${
        iconValue === selectedValue ? 'selected' : ''
      }><use href="#star"></use></svg>`;
    }

    return htmlString;
  }
}
