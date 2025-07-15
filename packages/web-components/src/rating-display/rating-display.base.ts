import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';

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

    /** @internal */
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
