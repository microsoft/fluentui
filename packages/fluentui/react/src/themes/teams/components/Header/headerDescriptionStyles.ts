import * as _ from 'lodash'

import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles'
import { HeaderDescriptionProps } from '../../../../components/Header/HeaderDescription'
import { HeaderDescriptionVariables } from './headerDescriptionVariables'
import { pxToRem } from '../../../../utils'

const headerStyles: ComponentSlotStylesPrepared<
  HeaderDescriptionProps,
  HeaderDescriptionVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = v.colorScheme[p.color]
    return {
      display: 'block',
      color: _.get(colors, 'foreground', v.color),
      fontSize: pxToRem(22),
      fontWeight: 400,
    }
  },
}

export default headerStyles
