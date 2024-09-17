import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * A Tooltip Custom HTML Element.
 * @public
 */
export class Tooltip extends FASTElement {
  public elementInternals = this.attachInternals();

  /**
   * Set the delay for the tooltip
   */
  @attr
  public delay: number = 250;

  /**
   * Set the positioning of the tooltip
   */
  @attr
  public positioning: string = 'above';

  /**
   * Reference to the tooltip element
   * @internal
   */
  public tooltip!: HTMLElement;

  /**
   * The id of the anchor element for the tooltip
   * @public
   */
  @attr
  public anchor: string = '';

  /**
   * Reference to the anchor element
   * @internal
   */
  private anchorElement: HTMLElement | null = null;

  public constructor() {
    super();
    this.elementInternals.role = 'tooltip';
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.anchorElement = document.getElementById(this.anchor) || null;

    if (this.anchorElement) {
      this.anchorElement.setAttribute('aria-describedby', `tooltip-${this.anchor}`);

      // @ts-expect-error Baseline 2024
      this.anchorElement.style.anchorName = `--${this.anchor}`;
      // @ts-expect-error Baseline 2024
      this.style.positionAnchor = `--${this.anchor}`;

      this.anchorElement.addEventListener('focus', this.handleFocus);
      this.anchorElement.addEventListener('blur', this.handleBlur);
      this.anchorElement.addEventListener('mouseenter', this.handleMouseEnter);
      this.anchorElement.addEventListener('mouseleave', this.handleMouseLeave);
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.anchorElement?.removeEventListener('focus', this.handleFocus);
    this.anchorElement?.removeEventListener('blur', this.handleBlur);
    this.anchorElement?.removeEventListener('mouseenter', this.handleMouseEnter);
    this.anchorElement?.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  /**
   * Shows the tooltip
   * @param delay Number of milliseconds to delay showing the tooltip
   * @internal
   */
  public showTooltip(delay: number = 0): void {
    setTimeout(() => {
      this.tooltip.setAttribute('aria-hidden', 'false');
      // @ts-expect-error Baseline 2024
      this.showPopover();
    }, delay);
  }

  /**
   * Hide the tooltip
   * @param delay Number of milliseconds to delay hiding the tooltip
   * @internal
   */
  public hideTooltip(delay: number = 0): void {
    setTimeout(() => {
      this.tooltip.setAttribute('aria-hidden', 'true');
      // @ts-expect-error Baseline 2024
      this.hidePopover();
    }, delay);
  }

  /**
   * Show the tooltip on mouse enter
   */
  public handleMouseEnter = () => this.showTooltip(this.delay);
  /**
   * Hide the tooltip on mouse leave
   */
  public handleMouseLeave = () => this.hideTooltip(this.delay);
  /**
   * Show the tooltip on focus
   */
  public handleFocus = () => this.showTooltip();
  /**
   * Hide the tooltip on blur
   */
  public handleBlur = () => this.hideTooltip();
}
