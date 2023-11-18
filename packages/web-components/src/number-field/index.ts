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
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.15 4.65c.2-.2.5-.2.7 0L6 7.79l3.15-3.14a.5.5 0 11.7.7l-3.5 3.5a.5.5 0 01-.7 0l-3.5-3.5a.5.5 0 010-.7z"/>
    </svg>
  `,
  stepUpGlyph: `
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.15 7.35c.2.2.5.2.7 0L6 4.21l3.15 3.14a.5.5 0 10.7-.7l-3.5-3.5a.5.5 0 00-.7 0l-3.5 3.5a.5.5 0 000 .7z"/>
    </svg>
`,
});
