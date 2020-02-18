import { DropdownSelectedItemProps } from '../../../../components/Dropdown/DropdownSelectedItem'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { DropdownVariables } from './dropdownVariables'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const dropdownSelectedItemStyles: ComponentSlotStylesPrepared<
  DropdownSelectedItemProps,
  DropdownVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    margin: '.4rem 0 0 .4rem',
    color: v.selectedItemColor,
    ...(v.selectedItemBackgroundColor && {
      backgroundColor: v.selectedItemBackgroundColor,
    }),
    ':focus': {
      color: v.selectedItemColorFocus,
      backgroundColor: v.selectedItemBackgroundColorFocus,
      outline: '0',
    },
    ':hover': {
      color: v.selectedItemColorFocus,
      backgroundColor: v.selectedItemBackgroundColorFocus,
    },
  }),
  icon: ({ variables: v }) => ({
    ...getIconFillOrOutlineStyles({ outline: true }),
    ':hover': {
      color: v.selectedItemColorFocus,
      ...getIconFillOrOutlineStyles({ outline: false }),
    },
  }),
}

export default dropdownSelectedItemStyles
