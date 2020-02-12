import { ICSSInJSStyle } from '@fluentui/styles'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const treeTitleStyles = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    padding: v.padding,
    cursor: 'pointer',
    color: v.color,
    position: 'relative',
    ...getBorderFocusStyles({ siteVariables }),
  }),
}

export default treeTitleStyles
