import { attr } from '@microsoft/fast-element';
import { TextField as FoundationTextField, textFieldTemplate as template } from '@microsoft/fast-foundation';
import { textFieldStyles as styles } from './text-field.styles';

/**
 * Text field appearances
 * @public
 */
export type TextFieldAppearance = 'filled' | 'outline';

/**
 * The Fluent text field class
 * @internal
 */
export class TextField extends FoundationTextField {
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
 * The Fluent Text Field Custom Element. Implements {@link @microsoft/fast-foundation#TextField},
 * {@link @microsoft/fast-foundation#textFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export const fluentTextField = TextField.compose({
  baseName: 'text-field',
  baseClass: FoundationTextField,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});

/**
 * Styles for TextField
 * @public
 */
export const textFieldStyles = styles;
