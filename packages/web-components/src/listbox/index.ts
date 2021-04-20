import { Listbox, listboxTemplate as template } from '@microsoft/fast-foundation';
import { listboxStyles as styles } from './listbox.styles';

/**
 * The FAST listbox Custom Element. Implements, {@link @microsoft/fast-foundation#Listbox}
 * {@link @microsoft/fast-foundation#listboxTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-listbox\>
 *
 */
export const fastListbox = Listbox.compose({
  baseName: 'listbox',
  template,
  styles,
});

/**
 * Styles for Listbox
 * @public
 */
export const listboxStyles = styles;
