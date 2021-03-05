import { customElement } from '@microsoft/fast-element';
import { Listbox, ListboxTemplate as template } from '@microsoft/fast-foundation';
import { ListboxStyles as styles } from './listbox.styles';

/**
 * The Fluent Listbox Element. Implements {@link @microsoft/fast-foundation#Listbox},
 * {@link @microsoft/fast-foundation#ListboxTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-listbox\>
 */
@customElement({
  name: 'fluent-listbox',
  template,
  styles,
})
export class FluentListbox extends Listbox {}

/**
 * Styles for Listbox
 * @public
 */
export const ListboxStyles = styles;
