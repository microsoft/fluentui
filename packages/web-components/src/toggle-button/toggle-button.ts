import { attr } from '@microsoft/fast-element';
import { Button } from '../button/button.js';
import { toggleState } from '../utils/element-internals.js';

/**
 * The base class used for constructing a `<fluent-toggle-button>` custom element.
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
      toggleState(this.elementInternals, 'pressed', !!this.pressed || !!this.mixed);
    }
  }
}
