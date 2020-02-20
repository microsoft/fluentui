import { pxToRem } from '../../../../utils'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { ButtonGroupProps } from '../../../../components/Button/ButtonGroup'

const commonButtonsStyles = (circular: boolean) =>
  circular ? { marginRight: pxToRem(8) } : { borderRadius: 0 }

const buttonGroupStyles: ComponentSlotStylesPrepared<ButtonGroupProps, any> = {
  root: (): ICSSInJSStyle => ({}),
  middleButton: ({ props: p }) => ({
    ...commonButtonsStyles(p.circular),
  }),
  firstButton: ({ props: p, variables: v }) => ({
    ...commonButtonsStyles(p.circular),
    ...(!p.circular && {
      borderTopLeftRadius: v.borderRadius,
      borderBottomLeftRadius: v.borderRadius,
    }),
  }),
  lastButton: ({ props: p, variables: v }) => ({
    ...commonButtonsStyles(p.circular),
    ...(!p.circular && {
      borderTopRightRadius: v.borderRadius,
      borderBottomRightRadius: v.borderRadius,
    }),
  }),
}

export default buttonGroupStyles
