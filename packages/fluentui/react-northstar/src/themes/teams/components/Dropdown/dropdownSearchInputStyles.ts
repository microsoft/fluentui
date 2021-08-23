import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { DropdownSearchInputStylesProps } from '../../../../components/Dropdown/DropdownSearchInput';
import type { DropdownVariables } from './dropdownVariables';

export const dropdownSearchInputStyles: ComponentSlotStylesPrepared<
  DropdownSearchInputStylesProps,
  DropdownVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    flexBasis: v.comboboxFlexBasis,
    flexGrow: 1,
  }),

  input: ({ props: p }): ICSSInJSStyle => ({
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...(p.inline && {
      padding: 0,
      lineHeight: 'initial',
    }),
  }),
};
