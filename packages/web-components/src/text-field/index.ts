import { attr, customElement } from '@microsoft/fast-element';
import { TextFieldTemplate as template, TextField } from '@microsoft/fast-foundation';
import { TextFieldStyles as styles } from './text-field.styles';

/**
 * Text field appearances
 * @public
 */
export type TextFieldAppearance = 'filled' | 'outline';

/**
 * The Fluent Text Field Custom Element. Implements {@link @microsoft/fast-foundation#TextField},
 * {@link @microsoft/fast-foundation#TextFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-text-field',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
    mode: 'closed',
  },
})
export class FluentTextField extends TextField {
  /**
   * The appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: TextFieldAppearance;

  /**
   * @internal
   */
  public appearanceChanged(oldValue: TextFieldAppearance, newValue: TextFieldAppearance): void {
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
      this.appearance = 'outline';
    }
  }
}

/**
 * Styles for TextField
 * @public
 */
export const TextFieldStyles = styles;
