import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { ToolbarVariables } from './toolbarVariables'
import { getColorScheme } from '../../colors'

const toolbarDividerStyles: ComponentSlotStylesPrepared<{}, ToolbarVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme)
    return {
      borderLeft: `1px solid ${v.dividerBorder || colors.border}`,
      margin: v.dividerMargin,
      alignSelf: 'stretch',
    }
  },
}

export default toolbarDividerStyles
