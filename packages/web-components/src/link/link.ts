import { attr } from '@microsoft/fast-element';
import { FASTAnchor } from '@microsoft/fast-foundation';
import { LinkAppearance } from './link.options.js';

/**
 * The base class used for constructing a fluent-link custom element
 * @public
 */
export class Link extends FASTAnchor {
  /**
   * The appearance the link should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: LinkAppearance | undefined;

  /**
   * The link is inline with other text
   *
   * @public
   * @remarks
   * HTML Attribute: inline
   */
  @attr({ mode: 'boolean' })
  public inline: boolean = false;

  /**
   * The link is disabled
   *
   * @public
   * @remarks
   * HTML Attribute: disabled-focusable
   */
  @attr({ mode: 'boolean' })
  public disabled?: boolean = false;
  protected disabledChanged(prev: boolean, next: boolean): void {
    if (this.disabled) {
      ((this as unknown) as HTMLElement).setAttribute('aria-disabled', 'true');
      ((this as unknown) as HTMLElement).setAttribute('tabindex', '-1');
    } else {
      ((this as unknown) as HTMLElement).removeAttribute('aria-disabled');
      ((this as unknown) as HTMLElement).removeAttribute('tabindex');
    }
  }

  /**
   * The link is disabled but focusable
   *
   * @public
   * @remarks
   * HTML Attribute: disabled-focusable
   */
  @attr({ attribute: 'disabled-focusable', mode: 'boolean' })
  public disabledFocusable?: boolean = false;
  protected disabledFocusableChanged(prev: boolean, next: boolean): void {
    if (!this.$fastController.isConnected) {
      return;
    }

    if (this.disabledFocusable) {
      ((this as unknown) as HTMLElement).setAttribute('aria-disabled', 'true');
    } else {
      ((this as unknown) as HTMLElement).removeAttribute('aria-disabled');
    }
  }

  /**
   * Prevents disabledFocusable click events
   */
  private handleDisabledFocusableClick = (e: MouseEvent): void => {
    if ((e && this.disabled) || this.disabledFocusable) {
      e.stopImmediatePropagation();
      return;
    }
  };

  public connectedCallback(): void {
    super.connectedCallback();

    ((this as unknown) as HTMLElement).addEventListener('click', this.handleDisabledFocusableClick);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    ((this as unknown) as HTMLElement).removeEventListener('click', this.handleDisabledFocusableClick);
  }
}
