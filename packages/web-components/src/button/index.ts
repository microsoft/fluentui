import { attr, customElement } from '@microsoft/fast-element';
import { Button, ButtonTemplate as template } from '@microsoft/fast-foundation';
import { ButtonStyles as styles } from './button.styles';

/**
 * Types of button appearance.
 * @public
 */
export type ButtonAppearance = 'accent' | 'lightweight' | 'neutral' | 'outline' | 'stealth';

/**
 * The Fluent Button Element. Implements {@link @microsoft/fast-foundation#Button},
 * {@link @microsoft/fast-foundation#ButtonTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-button\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-button',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
    mode: 'closed',
  },
})
export class FluentButton extends Button {
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

  /**
   * Applies 'icon-only' class when there is only an SVG in the default slot
   *
   * @internal
   */
  public defaultSlottedContentChanged(): void {
    const slottedElements = this.defaultSlottedContent.filter((x) => x.nodeType === Node.ELEMENT_NODE);

    if (slottedElements.length === 1 && slottedElements[0] instanceof SVGElement) {
      this.control.classList.add('icon-only');
    } else {
      this.control.classList.remove('icon-only');
    }
  }
}

/**
 * Styles for Button
 * @public
 */
export const ButtonStyles = styles;
