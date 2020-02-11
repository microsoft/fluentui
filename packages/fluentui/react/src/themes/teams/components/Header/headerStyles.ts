import * as _ from 'lodash'
import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles'
import { HeaderProps } from '../../../../components/Header/Header'
import { HeaderVariables } from './headerVariables'
import translateAlignProp from '../../../../styles/translateAlignProp'

const headerStyles: ComponentSlotStylesPrepared<HeaderProps, HeaderVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = v.colorScheme[p.color]
    return {
      display: 'block',
      color: _.get(colors, 'foreground', v.color),
      textAlign: translateAlignProp(p.align),
      ...(p.description && { marginBottom: 0 }),
    }
  },
}

export default headerStyles
