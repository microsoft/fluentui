import { attr, customElement } from '@microsoft/fast-element';
import { NumberField, NumberFieldTemplate as template } from '@microsoft/fast-foundation';
import { NumberFieldStyles as styles } from './number-field.styles';

/**
 * Number field appearances
 * @public
 */
export type NumberFieldAppearance = 'filled' | 'outline';

/**
 * The Fluent Number Field Custom Element. Implements {@link @microsoft/fast-foundation#NumberField},
 * {@link @microsoft/fast-foundation#NumberFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-number-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-number-field',
  shadowOptions: {
    delegatesFocus: true,
    mode: 'closed',
  },
  styles,
  template,
})
export class FluentNumberField extends NumberField {
  /**
   * The appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: NumberFieldAppearance;

  /**
   * @internal
   */
  public connectedCallback() {
    super.connectedCallback();

    if (!this.appearance) {
      this.appearance = 'outline';
    }
  }
}

/**
 * Styles for NumberField
 * @public
 */
export const NumberFieldStyles = styles;
