import { debugRoot } from '../../../../styles/debugStyles'
import { ICSSInJSStyle } from '@fluentui/styles'

const itemLayoutStyles = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { debugLayout } = props
    return {
      ...(debugLayout && debugRoot()),
      gridTemplateRows: `minmax(${variables.height}, max-content)`,
      paddingLeft: variables.paddingLeft,
      paddingRight: variables.paddingRight,
    }
  },
}

export default itemLayoutStyles
