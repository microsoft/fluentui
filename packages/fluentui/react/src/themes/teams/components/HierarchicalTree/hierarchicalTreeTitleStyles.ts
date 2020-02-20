import { ICSSInJSStyle } from '@fluentui/styles'
import { pxToRem } from '../../../../utils'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const hierarchicalTreeTitleStyles = {
  root: ({ variables, theme: { siteVariables } }): ICSSInJSStyle => ({
    padding: `${pxToRem(1)} 0`,
    cursor: 'pointer',
    color: variables.defaultColor,
    position: 'relative',
    ...getBorderFocusStyles({ siteVariables }),
  }),
}

export default hierarchicalTreeTitleStyles
