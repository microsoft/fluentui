import { Listbox as FoundationListboxElement, listboxTemplate as template } from '@microsoft/fast-foundation';
import { listboxStyles as styles } from './listbox.styles';

export class Listbox extends FoundationListboxElement {}

/**
 * The Fluent listbox Custom Element. Implements, {@link @microsoft/fast-foundation#Listbox}
 * {@link @microsoft/fast-foundation#listboxTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-listbox\>
 *
 */
export const fluentListbox = Listbox.compose({
  baseName: 'listbox',
  template,
  styles,
});

/**
 * Styles for Listbox
 * @public
 */
export const listboxStyles = styles;
