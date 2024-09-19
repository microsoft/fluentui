import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * A Tooltip Custom HTML Element.
 * Based on ARIA APG Tooltip Pattern {@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/ }
 * @public
 */
export class Tooltip extends FASTElement {
  /**
   * The attached element internals
   */
  public elementInternals = this.attachInternals();

  /**
   * Set the delay for the tooltip
   */
  @attr
  public delay?: number;

  /**
   * The default delay for the tooltip
   * @internal
   */
  private defaultDelay: number = 250;

  /**
   * Set the positioning of the tooltip
   */
  @attr
  public positioning?: string;

  /**
   * The id of the anchor element for the tooltip
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
  public showTooltip(delay: number = this.defaultDelay): void {
    setTimeout(() => {
      this.setAttribute('aria-hidden', 'false');
      // @ts-expect-error Baseline 2024
      this.showPopover();
    }, delay);
  }

  /**
   * Hide the tooltip
   * @param delay Number of milliseconds to delay hiding the tooltip
   * @internal
   */
  public hideTooltip(delay: number = this.defaultDelay): void {
    setTimeout(() => {
      // Detect if the tooltip or anchor element is still hovered and enqueue another hide
      if (this.matches(':hover') || this.anchorElement?.matches(':hover')) {
        this.hideTooltip(delay);
        return;
      }

      this.setAttribute('aria-hidden', 'true');
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
  public handleFocus = () => this.showTooltip(0);
  /**
   * Hide the tooltip on blur
   */
  public handleBlur = () => this.hideTooltip(0);
}
