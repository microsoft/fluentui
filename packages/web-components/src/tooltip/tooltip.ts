import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';

const SUPPORTS_ANCHOR_POSITIONING = CSS.supports('anchor-name: --a');

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
   * The item ID
   *
   * @public
   * @remarks
   * HTML Attribute: id
   */
  @attr
  public id: string = uniqueId('tooltip-');

  /**
   * Set the delay for the tooltip
   */
  @attr({ converter: nullableNumberConverter })
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
  private get anchorElement(): HTMLElement | null {
    const rootNode = this.getRootNode();
    return (rootNode instanceof ShadowRoot ? rootNode : document).getElementById(this.anchor ?? '');
  }

  /**
   * Reference to the anchor positioning style element
   * @internal
   */
  protected anchorPositioningStyleElement: HTMLStyleElement | null = null;

  public constructor() {
    super();
    this.elementInternals.role = 'tooltip';
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (this.anchorElement) {
      // @ts-expect-error - Baseline 2024
      const anchorName = this.anchorElement.style.anchorName || `--${this.anchor}`;
      this.anchorElement.setAttribute('aria-describedby', this.id);

      if (SUPPORTS_ANCHOR_POSITIONING) {
        // @ts-expect-error - Baseline 2024
        this.anchorElement.style.anchorName = anchorName;
        // @ts-expect-error - Baseline 2024
        this.style.positionAnchor = anchorName;
      } else {
        // Provide style fallback for browsers that do not support anchor positioning
        if (!this.anchorPositioningStyleElement) {
          this.anchorPositioningStyleElement = document.createElement('style');
          document.head.append(this.anchorPositioningStyleElement);
        }

        // Given a position with <direction>-<alignment> format, return the proper CSS properties
        const [direction, alignment] = this.positioning?.split('-') ?? [];
        let centerAlignment;

        if (alignment === undefined) {
          if (direction === 'above' || direction === 'below') {
            centerAlignment = 'centerX';
          }
          if (direction === 'before' || direction === 'after') {
            centerAlignment = 'centerY';
          }
        }

        const directionCSS = {
          above: `bottom: anchor(${anchorName} top);`,
          below: `top: anchor(${anchorName} bottom);`,
          before: `right: anchor(${anchorName} left);`,
          after: `left: anchor(${anchorName} right);`,
        }[direction];

        const alignmentCSS = {
          start: `left: anchor(${anchorName} left);`,
          end: `right: anchor(${anchorName} right);`,
          top: `top: anchor(${anchorName} top);`,
          bottom: `bottom: anchor(${anchorName} bottom);`,
          centerX: `left: anchor(${anchorName} center); translate: -50% 0;`,
          centerY: `top: anchor(${anchorName} center); translate: 0 -50%;`,
        }[alignment ?? centerAlignment];

        this.anchorPositioningStyleElement.textContent = `
          #${this.anchor} {
            anchor-name: ${anchorName};
          }
          #${this.id} {
            inset: unset;
            ${directionCSS}
            ${alignmentCSS}
            position: absolute;
          }
        `;

        // Dispatch a ready event for the anchor polyfill
        document.dispatchEvent(new CustomEvent('anchor-polyfill'));
      }

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
