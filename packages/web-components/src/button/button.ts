import { attr } from '@microsoft/fast-element';
import { FASTButton } from '@microsoft/fast-foundation';
import { ButtonAppearance, ButtonShape, ButtonSize } from './button.options.js';

/**
 * The base class used for constructing a fluent-button custom element
 * @public
 */
export class Button extends FASTButton {
  /**
   * The appearance the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: ButtonAppearance | undefined;

  /**
   * The shape the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: ButtonShape | undefined;

  /**
   * The size the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: ButtonSize;

  /**
   * The button has an icon only, no text content
   *
   * @public
   * @remarks
   * HTML Attribute: icon-only
   */
  @attr({ attribute: 'icon-only', mode: 'boolean' })
  public iconOnly: boolean = false;

  /**
   * The button is disabled but focusable
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
    if (e && this.disabledFocusable) {
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
