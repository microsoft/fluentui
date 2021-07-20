import { attr } from '@microsoft/fast-element';
import {
  NumberField as FoundationNumberField,
  NumberFieldOptions,
  numberFieldTemplate as template,
} from '@microsoft/fast-foundation';
import { numberFieldStyles as styles } from './number-field.styles';

/**
 * Number field appearances
 * @public
 */
export type NumberFieldAppearance = 'filled' | 'outline';

/**
 * The Fluent number field class
 * @internal
 */
export class NumberField extends FoundationNumberField {
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
export const numberFieldStyles = styles;

/**
 * The Fluent Number Field Custom Element. Implements {@link @microsoft/fast-foundation#NumberField},
 * {@link @microsoft/fast-foundation#numberFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-number-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export const fluentNumberField = NumberField.compose<NumberFieldOptions>({
  baseName: 'number-field',
  baseClass: FoundationNumberField,
  styles,
  template,
  shadowOptions: {
    delegatesFocus: true,
  },
  stepDownGlyph: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.15 5.65c.2-.2.5-.2.7 0L8 9.79l4.15-4.14a.5.5 0 01.7.7l-4.5 4.5a.5.5 0 01-.7 0l-4.5-4.5a.5.5 0 010-.7z"/>
    </svg>
  `,
  stepUpGlyph: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.15 10.35c.2.2.5.2.7 0L8 6.21l4.15 4.14a.5.5 0 00.7-.7l-4.5-4.5a.5.5 0 00-.7 0l-4.5 4.5a.5.5 0 000 .7z"/>
    </svg>
  `,
});
