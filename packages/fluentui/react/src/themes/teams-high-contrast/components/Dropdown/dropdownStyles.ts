import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import {
  default as Dropdown,
  DropdownProps,
  DropdownState,
} from '../../../../components/Dropdown/Dropdown'
import { DropdownVariablesHC } from './dropdownVariables'

type DropdownPropsAndState = DropdownProps & DropdownState

const transparentColorStyle: ICSSInJSStyle = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderBottomColor: 'transparent',
}

const dropdownStyles: ComponentSlotStylesPrepared<DropdownPropsAndState, DropdownVariablesHC> = {
  container: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...(!p.open && {
      ':hover': {
        backgroundColor: v.backgroundColorHover,
        borderColor: v.borderColorHover,
        [`& .${Dropdown.slotClassNames.triggerButton}`]: {
          color: v.triggerButtonColorHover,
        },
      },
    }),
  }),

  triggerButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ':hover': {
      ...transparentColorStyle,
      color: v.triggerButtonColorHover,
    },
    ':focus': {
      color: v.color,
      ':active': {
        color: v.color,
      },
    },
  }),
}

export default dropdownStyles
