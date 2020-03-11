import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DropdownSearchInputProps } from '../../../../components/Dropdown/DropdownSearchInput';
import { DropdownVariables } from './dropdownVariables';
import getBorderFocusStyles from '../../getBorderFocusStyles';

const dropdownSearchInputStyles: ComponentSlotStylesPrepared<DropdownSearchInputProps, DropdownVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    flexBasis: v.comboboxFlexBasis,
    flexGrow: 1
  }),

  input: ({ props: p, theme: { siteVariables } }): ICSSInJSStyle => ({
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    ':focus-within': {
      // apply border around selectedItems when they are focused
      ...getBorderFocusStyles({ variables: siteVariables })
    },
    ...(p.inline && {
      padding: 0,
      lineHeight: 'initial'
    })
  })
};

export default dropdownSearchInputStyles;
