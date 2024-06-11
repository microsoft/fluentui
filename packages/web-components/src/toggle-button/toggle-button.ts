import { attr } from '@microsoft/fast-element';
import { Button } from '../button/button.js';

/**
 * A ToggleButton component that extends Button and adds toggling functionality.
 * @class ToggleButton
 * @extends Button
 *
 * @attr pressed - Indicates the pressed state of the control.
 * @attr mixed - Indicates the mixed state of the control. This property takes precedence over `pressed`.
 *
 * @csspart content - The content of the button.
 *
 * @summary The ToggleButton component allows for a button that can be toggled between pressed and unpressed states, with support for a mixed state.
 *
 * @tag fluent-toggle-button
 *
 * @public
 */
export class ToggleButton extends Button {
  /**
   * Indicates the pressed state of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `pressed`
   */
  @attr({ mode: 'boolean' })
  public pressed!: boolean;

  /**
   * Updates the pressed state when the `pressed` property changes.
   *
   * @internal
   */
  protected pressedChanged(): void {
    this.setPressedState();
  }

  /**
   * Indicates the mixed state of the control. This property takes precedence over `pressed`.
   *
   * @public
   * @remarks
   * HTML Attribute: `mixed`
   */
  @attr({ mode: 'boolean' })
  public mixed?: boolean;

  /**
   * Updates the pressed state when the `mixed` property changes.
   *
   * @param previous - the previous mixed state
   * @param next - the current mixed state
   * @internal
   */
  protected mixedChanged(): void {
    this.setPressedState();
  }

  /**
   * Toggles the pressed state of the button.
   *
   * @override
   */
  protected press(): void {
    this.pressed = !this.pressed;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setPressedState();
  }

  /**
   * Sets the `aria-pressed` attribute based on the `pressed` and `mixed` properties.
   *
   * @internal
   */
  private setPressedState(): void {
    if (this.$fastController.isConnected) {
      const ariaPressed = `${this.mixed ? 'mixed' : !!this.pressed}`;
      this.elementInternals.ariaPressed = ariaPressed;
      this.setAttribute('aria-pressed', ariaPressed);
    }
  }
}
