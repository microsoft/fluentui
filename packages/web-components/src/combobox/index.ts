import { customElement } from '@microsoft/fast-element';
import { Combobox, ComboboxTemplate as template } from '@microsoft/fast-foundation';
import { ComboboxStyles as styles } from './combobox.styles';

/**
 * The Fluent Combobox Custom Element. Implements {@link @microsoft/fast-foundation#Combobox|Combobox},
 * {@link @microsoft/fast-foundation#ComboboxTemplate|ComboboxTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-combobox\>
 *
 */
@customElement({
  name: 'fluent-combobox',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FluentCombobox extends Combobox {}

/**
 * Styles for combobox
 * @public
 */
export const ComboboxStyles = styles;
