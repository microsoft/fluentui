import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import type { TooltipPositioningOption } from './tooltip.options.js';

const SUPPORTS_CSS_ANCHOR_POSITIONING = CSS.supports('anchor-name: --a');
const SUPPORTS_HTML_ANCHOR_POSITIONING = 'anchor' in HTMLElement.prototype;

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
  public positioning?: TooltipPositioningOption;

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

    // If the anchor element is not found, tooltip will not be shown
    if (!this.anchorElement) {
      return;
    }

    // @ts-expect-error - Baseline 2024
    const anchorName = this.anchorElement.style.anchorName || `--${this.anchor}`;

    const describedBy = this.anchorElement.getAttribute('aria-describedby');
    this.anchorElement.setAttribute('aria-describedby', describedBy ? `${describedBy} ${this.id}` : this.id);

    if (SUPPORTS_CSS_ANCHOR_POSITIONING) {
      if (!SUPPORTS_HTML_ANCHOR_POSITIONING) {
        // @ts-expect-error - Baseline 2024
        this.anchorElement.style.anchorName = anchorName;
        // @ts-expect-error - Baseline 2024
        this.style.positionAnchor = anchorName;
      }
    } else {
      // Provide style fallback for browsers that do not support anchor positioning
      if (!this.anchorPositioningStyleElement) {
        this.anchorPositioningStyleElement = document.createElement('style');
        document.head.append(this.anchorPositioningStyleElement);
      }

      // Given a position with <direction>-<alignment> format, return the proper CSS properties
      // eslint-disable-next-line prefer-const
      let [direction, alignment] = this.positioning?.split('-') ?? [];

      if (alignment === undefined && (direction === 'above' || direction === 'below')) {
        alignment = 'centerX';
      }
      if (alignment === undefined && (direction === 'before' || direction === 'after')) {
        alignment = 'centerY';
      }

      const directionCSSMap = {
        above: `bottom: anchor(${anchorName} top);`,
        below: `top: anchor(${anchorName} bottom);`,
        before: `right: anchor(${anchorName} left);`,
        after: `left: anchor(${anchorName} right);`,
      } as const;

      type DirectionMapOption = keyof typeof directionCSSMap;
      const directionCSS = directionCSSMap[direction as DirectionMapOption] ?? directionCSSMap.above;

      const alignmentCSSMap = {
        start: `left: anchor(${anchorName} left);`,
        end: `right: anchor(${anchorName} right);`,
        top: `top: anchor(${anchorName} top);`,
        bottom: `bottom: anchor(${anchorName} bottom);`,
        centerX: `left: anchor(${anchorName} center); translate: -50% 0;`,
        centerY: `top: anchor(${anchorName} center); translate: 0 -50%;`,
      } as const;

      type AlignmentMapOption = keyof typeof alignmentCSSMap;
      const alignmentCSS = alignmentCSSMap[alignment as AlignmentMapOption] ?? alignmentCSSMap.centerX;

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

      if (window.CSS_ANCHOR_POLYFILL) {
        window.CSS_ANCHOR_POLYFILL.call({ element: this.anchorPositioningStyleElement });
      }
    }

    this.anchorElement.addEventListener('focus', this.focusAnchorHandler);
    this.anchorElement.addEventListener('blur', this.blurAnchorHandler);
    this.anchorElement.addEventListener('mouseenter', this.mouseenterAnchorHandler);
    this.anchorElement.addEventListener('mouseleave', this.mouseleaveAnchorHandler);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.anchorElement?.removeEventListener('focus', this.focusAnchorHandler);
    this.anchorElement?.removeEventListener('blur', this.blurAnchorHandler);
    this.anchorElement?.removeEventListener('mouseenter', this.mouseenterAnchorHandler);
    this.anchorElement?.removeEventListener('mouseleave', this.mouseleaveAnchorHandler);
  }

  /**
   * Shows the tooltip
   * @param delay Number of milliseconds to delay showing the tooltip
   * @internal
   */
  public showTooltip(delay: number = this.defaultDelay): void {
    setTimeout(() => {
      this.setAttribute('aria-hidden', 'false');
      // @ts-expect-error - Baseline 2024
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
      // @ts-expect-error - Baseline 2024
      this.hidePopover();
    }, delay);
  }

  /**
   * Show the tooltip on mouse enter
   */
  public mouseenterAnchorHandler = () => this.showTooltip(this.delay);
  /**
   * Hide the tooltip on mouse leave
   */
  public mouseleaveAnchorHandler = () => this.hideTooltip(this.delay);
  /**
   * Show the tooltip on focus
   */
  public focusAnchorHandler = () => this.showTooltip(0);
  /**
   * Hide the tooltip on blur
   */
  public blurAnchorHandler = () => this.hideTooltip(0);
}

declare global {
  interface Window {
    CSS_ANCHOR_POLYFILL?: {
      call: (options: { element: HTMLStyleElement }) => void;
    };
  }
}
