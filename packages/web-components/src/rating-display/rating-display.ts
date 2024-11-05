import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';
import { swapStates } from '../utils/element-internals.js';
import { RatingDisplayColor, RatingDisplaySize } from './rating-display.options.js';

/**
 * The base class used for constructing a fluent-rating-display custom element
 *
 * @slot icon - SVG element used as the rating icon
 *
 * @public
 */
export class BaseRatingDisplay extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

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
   * The `viewBox` attribute of the icon <svg> element.
   *
   * @public
   * @default `0 0 20 20`
   * @remarks
   * HTML Attribute: `icon-view-box`
   */
  @attr({ attribute: 'icon-view-box' })
  iconViewBox?: string;

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
   * The value of the rating.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ converter: nullableNumberConverter })
  public value?: number;

  /**
   * @internal
   */
  @observable
  public slottedIcon!: HTMLElement[];

  /**
   * @internal
   */
  public slottedIconChanged(): void {
    if (this.$fastController.isConnected) {
      this.customIcon = this.slottedIcon[0]?.outerHTML;
    }
  }

  /**
   * @internal
   */
  @observable
  private customIcon?: string;

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
   * Gets the selected value
   *
   * @protected
   */
  protected getSelectedValue(): number {
    return Math.round((this.value ?? 0) * 2) / 2;
  }

  /**
   * Gets the maximum icons to render
   *
   * @protected
   */
  protected getMaxIcons(): number {
    return (this.max ?? 5) * 2;
  }

  /**
   * Generates the icon SVG elements based on the "max" attribute.
   *
   * @internal
   */
  public generateIcons(): string {
    let htmlString: string = '';
    let customIcon: string | undefined;

    if (this.customIcon) {
      // Extract the SVG element content
      customIcon = /<svg[^>]*>([\s\S]*?)<\/svg>/.exec(this.customIcon)?.[1] ?? '';
    }

    // The value of the selected icon. Based on the "value" attribute, rounded to the nearest half.
    const selectedValue: number = this.getSelectedValue();

    // Render the icons based on the "max" attribute. If "max" is not set, render 5 icons.
    for (let i: number = 0; i < this.getMaxIcons(); i++) {
      const iconValue: number = (i + 1) / 2;

      htmlString += `<svg aria-hidden="true" viewBox="${this.iconViewBox ?? '0 0 20 20'}" ${
        iconValue === selectedValue ? 'selected' : ''
      }>${customIcon ?? '<use href="#star"></use>'}</svg>`;
    }

    return htmlString;
  }
}

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
