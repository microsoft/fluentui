import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { FormProps } from '../../../../components/Form/Form'
import { pxToRem } from '../../../../utils'

const formStyles: ComponentSlotStylesPrepared<FormProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyContent: 'space-evenly',
    gridGap: pxToRem(20),
    justifyItems: 'start',
  }),
}

export default formStyles
