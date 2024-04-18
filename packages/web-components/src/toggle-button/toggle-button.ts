import { attr } from '@microsoft/fast-element';
import { Button } from '../button/button.js';

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
  public pressed: boolean = false;

  /**
   * Updates the pressed state when the `pressed` property changes.
   *
   * @internal
   */
  protected pressedChanged(): void {
    this.setPressedState();
  }

  /**
   * Indicates the indeterminate state of the control. This property takes precedence over `pressed`.
   *
   * @public
   * @remarks
   * HTML Attribute: `indeterminate`
   */
  @attr({ mode: 'boolean' })
  public indeterminate?: boolean;

  /**
   * Updates the pressed state when the `indeterminate` property changes.
   *
   * @param previous - the previous indeterminate state
   * @param next - the current indeterminate state
   * @internal
   */
  protected indeterminateChanged(): void {
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
   * Sets the `aria-pressed` attribute based on the `pressed` and `indeterminate` properties.
   *
   * @internal
   */
  private setPressedState(): void {
    const ariaPressed = `${this.indeterminate ? 'mixed' : !!this.pressed}`;
    this.elementInternals.ariaPressed = ariaPressed;
    this.setAttribute('aria-pressed', ariaPressed);
  }
}
