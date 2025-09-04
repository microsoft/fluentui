import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';

const SUPPORTS_ATTR_TYPE = CSS.supports('width: attr(value type(<number>))');
const CUSTOM_PROPERTY_NAME = {
  max: '--_attr-max',
  value: '--_attr-value',
  maskImageFilled: '--_mask-image-filled',
  maskImageOutlined: '--_mask-image-outlined',
};
type PropertyNameForCalculation = 'max' | 'value';

export function svgToDataURI(svg: string) {
  if (!svg) {
    return '';
  }

  return ['data:image/svg+xml', encodeURIComponent(svg.replace(/\n/g, '').replace(/\s+/g, ' '))].join(',');
}

/**
 * The base class used for constructing a fluent-rating-display custom element
 *
 * @slot icon - SVG element used as the rating icon
 *
 * @public
 */
export class BaseRatingDisplay extends FASTElement {
  private numberFormatter!: Intl.NumberFormat;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /** @internal */
  public iconSlot!: HTMLSlotElement;

  protected defaultCustomIconViewBox = '0 0 20 20';

  /**
   * The element that displays the rating icons.
   * @internal
   */
  public display!: HTMLElement;

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
   * @remarks
   * HTML Attribute: `icon-view-box`
   * @deprecated Add `viewBox` attribute on the custom SVG directly.
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
  protected maxChanged() {
    this.setCustomPropertyValue('max');
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
  protected valueChanged() {
    this.setCustomPropertyValue('value');
  }

  constructor() {
    super();

    this.elementInternals.role = 'img';
    this.numberFormatter = new Intl.NumberFormat();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setCustomPropertyValue('value');
    this.setCustomPropertyValue('max');
  }

  /**
   * Returns "count" as string, formatted according to the locale.
   *
   * @internal
   */
  public get formattedCount(): string {
    return this.count ? this.numberFormatter.format(this.count) : '';
  }

  /** @internal */
  public handleSlotChange() {
    const icon = this.iconSlot.assignedElements()?.find(el => el.nodeName.toLowerCase() === 'svg') as SVGSVGElement;

    this.renderSlottedIcon(icon ?? null);
  }

  protected renderSlottedIcon(svg: SVGSVGElement | null) {
    if (!svg) {
      this.display.style.removeProperty(CUSTOM_PROPERTY_NAME.maskImageFilled);
      this.display.style.removeProperty(CUSTOM_PROPERTY_NAME.maskImageOutlined);
      return;
    }

    const innerSvg = svg.innerHTML;
    const viewBox = svg.getAttribute('viewBox') ?? this.iconViewBox ?? this.defaultCustomIconViewBox;

    const customSvgFilled = `
            <svg
                viewBox="${viewBox}"
                xmlns="http://www.w3.org/2000/svg"
            >${innerSvg}</svg>`;
    const customSvgOutlined = `
            <svg
                viewBox="${viewBox}"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="black"
                stroke-width="2"
            >${innerSvg}</svg>`;
    this.display.style.setProperty(CUSTOM_PROPERTY_NAME.maskImageFilled, `url(${svgToDataURI(customSvgFilled)})`);
    this.display.style.setProperty(CUSTOM_PROPERTY_NAME.maskImageOutlined, `url(${svgToDataURI(customSvgOutlined)})`);
  }

  protected setCustomPropertyValue(propertyName: PropertyNameForCalculation) {
    if (!this.display || SUPPORTS_ATTR_TYPE) {
      return;
    }

    const propertyValue = this[propertyName];

    if (typeof propertyValue !== 'number' || Number.isNaN(propertyValue)) {
      this.display.style.removeProperty(CUSTOM_PROPERTY_NAME[propertyName]);
    } else {
      this.display.style.setProperty(CUSTOM_PROPERTY_NAME[propertyName], `${propertyValue}`);
    }
  }
}
