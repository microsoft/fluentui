import { ListboxOption, listboxOptionTemplate as template } from '@microsoft/fast-foundation';
import { optionStyles as styles } from './listbox-option.styles';

/**
 * The FAST option Custom Element. Implements {@link @microsoft/fast-foundation#ListboxOption}
 * {@link @microsoft/fast-foundation#listboxOptionTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-option\>
 *
 */
export const fluentOption = ListboxOption.compose({
  baseName: 'option',
  template,
  styles,
});

/**
 * Styles for Option
 * @public
 */
export const OptionStyles = styles;
