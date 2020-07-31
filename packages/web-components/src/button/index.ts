import { attr, customElement } from '@microsoft/fast-element';
import { Button, ButtonTemplate as template } from '@microsoft/fast-foundation';
import { ButtonStyles as styles } from './button.styles';

/**
 * Types of button appearance.
 * @public
 */
export type ButtonAppearance = 'accent' | 'lightweight' | 'neutral' | 'outline' | 'stealth';

/**
 * The FAST Button Element. Implements {@link @microsoft/fast-foundation#Button},
 * {@link @microsoft/fast-foundation#ButtonTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-button\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fast-button',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FASTButton extends Button {
  /**
   * The appearance the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: ButtonAppearance;
  public appearanceChanged(oldValue: ButtonAppearance, newValue: ButtonAppearance): void {
    if (oldValue !== newValue) {
      this.classList.add(newValue);
      this.classList.remove(oldValue);
    }
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    if (!this.appearance) {
      this.appearance = 'neutral';
    }
  }
}
