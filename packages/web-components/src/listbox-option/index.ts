import { customElement } from '@microsoft/fast-element';
import { ListboxOption, ListboxOptionTemplate as template } from '@microsoft/fast-foundation';
import { OptionStyles as styles } from './listbox-option.styles';

/**
 * The Fluent ListboxOption Element. Implements {@link @microsoft/fast-foundation#ListboxOption},
 * {@link @microsoft/fast-foundation#ListboxOptionTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-option\>
 */
@customElement({
  name: 'fluent-option',
  template,
  styles,
})
export class FluentOption extends ListboxOption {}

/**
 * Styles for Option
 * @public
 */
export const OptionStyles = styles;
