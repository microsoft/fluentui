import { attr, FASTElement, nullableNumberConverter, Updates } from '@microsoft/fast-element';
import { uniqueId } from '../utils/unique-id.js';
import { AnchorPositioningCSSSupported, AnchorPositioningHTMLSupported } from '../utils/support.js';
import type { TooltipPositioningOption } from './tooltip.options.js';

/**
 * A Tooltip Custom HTML Element.
 * Based on ARIA APG Tooltip Pattern {@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/ }
 *
 * @tag fluent-tooltip
 *
 * @slot - The default slot. Accepts the content of the tooltip.
 *
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
   * Updates the fallback styles when the positioning changes.
   *
   * @internal
   */
  public positioningChanged(): void {
    this.setFallbackStyles();
  }

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

    this.popover ??= 'auto';

    // If the anchor element is not found, tooltip will not be shown
    if (!this.anchorElement) {
      return;
    }

    // @ts-expect-error - Baseline 2024
    const anchorName = this.anchorElement.style.anchorName || `--${this.anchor}`;

    const describedBy = this.anchorElement.getAttribute('aria-describedby');
    this.anchorElement.setAttribute('aria-describedby', describedBy ? `${describedBy} ${this.id}` : this.id);

    this.anchorElement.addEventListener('focus', this.focusAnchorHandler);
    this.anchorElement.addEventListener('blur', this.blurAnchorHandler);
    this.anchorElement.addEventListener('mouseenter', this.mouseenterAnchorHandler);
    this.anchorElement.addEventListener('mouseleave', this.mouseleaveAnchorHandler);

    if (AnchorPositioningCSSSupported) {
      if (!AnchorPositioningHTMLSupported) {
        // @ts-expect-error - Baseline 2024
        this.anchorElement.style.anchorName = anchorName;
        // @ts-expect-error - Baseline 2024
        this.style.positionAnchor = anchorName;
      }
      return;
    }

    Updates.enqueue(() => this.setFallbackStyles());
  }

  public disconnectedCallback(): void {
    this.anchorElement?.removeEventListener('focus', this.focusAnchorHandler);
    this.anchorElement?.removeEventListener('blur', this.blurAnchorHandler);
    this.anchorElement?.removeEventListener('mouseenter', this.mouseenterAnchorHandler);
    this.anchorElement?.removeEventListener('mouseleave', this.mouseleaveAnchorHandler);

    if (this.anchorElement) {
      const describedBy = this.anchorElement.getAttribute('aria-describedby') ?? '';
      const ids = describedBy
        .trim()
        .split(/\s+/)
        .filter(id => id !== this.id);
      if (ids.length) {
        this.anchorElement.setAttribute('aria-describedby', ids.join(' '));
      } else {
        this.anchorElement.removeAttribute('aria-describedby');
      }
    }

    super.disconnectedCallback();
  }

  /**
   * Shows the tooltip
   * @param delay - Number of milliseconds to delay showing the tooltip
   * @internal
   */
  public showTooltip(delay: number = this.defaultDelay): void {
    if (!this.anchorPositioningReady) {
      this.setFallbackStyles().then(() => {
        this.showTooltip(delay);
      });
      return;
    }

    setTimeout(() => {
      this.setAttribute('aria-hidden', 'false');
      this.showPopover();
    }, delay);
  }

  /**
   * Hide the tooltip
   * @param delay - Number of milliseconds to delay hiding the tooltip
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

  /**
   * Indicates whether the tooltip styles have been applied for browsers that do not support anchor positioning.
   * @internal
   */
  private anchorPositioningReady: boolean = false;

  /**
   * Sets fallback styles for the tooltip for browsers that do not support CSS anchor positioning.
   * @internal
   */
  private async setFallbackStyles(): Promise<void> {
    if (AnchorPositioningCSSSupported) {
      this.anchorPositioningReady = true;
      return;
    }

    if (!this.anchorElement) {
      return;
    }
    // @ts-expect-error - Baseline 2024
    const anchorName = this.anchorElement.style.anchorName || `--${this.anchor}`;

    // Provide style fallback for browsers that do not support anchor positioning
    if (!this.anchorPositioningStyleElement) {
      this.anchorPositioningStyleElement = document.createElement('style');
      document.head.append(this.anchorPositioningStyleElement);
    }

    let [direction, alignment] = this.positioning?.split('-') ?? [];

    if (!alignment) {
      if (direction === 'above' || direction === 'below') {
        alignment = 'centerX';
      }
      if (direction === 'before' || direction === 'after') {
        alignment = 'centerY';
      }
    }

    const directionCSSMap = {
      above: `bottom: anchor(top);`,
      below: `top: anchor(bottom);`,
      before: `right: anchor(left);`,
      after: `left: anchor(right);`,
    } as const;

    const directionCSS = directionCSSMap[direction as keyof typeof directionCSSMap] ?? directionCSSMap.above;

    const alignmentCSSMap = {
      start: `left: anchor(left);`,
      end: `right: anchor(right);`,
      top: `top: anchor(top);`,
      bottom: `bottom: anchor(bottom);`,
      centerX: `left: anchor(center); translate: -50% 0;`,
      centerY: `top: anchor(center); translate: 0 -50%;`,
    } as const;

    const alignmentCSS = alignmentCSSMap[alignment as keyof typeof alignmentCSSMap] ?? alignmentCSSMap.centerX;

    this.anchorPositioningStyleElement.textContent = /* css */ `
      #${this.anchor} {
        anchor-name: ${anchorName};
      }
      #${this.id} {
        inset: unset;
        position-anchor: ${anchorName};
        position: fixed;
        ${directionCSS}
        ${alignmentCSS}
      }
    `;

    if ((window as any).CSS_ANCHOR_POLYFILL) {
      await (window as any).CSS_ANCHOR_POLYFILL({ elements: [this.anchorPositioningStyleElement!] });

      this.anchorPositioningReady = true;
    }
  }
}
