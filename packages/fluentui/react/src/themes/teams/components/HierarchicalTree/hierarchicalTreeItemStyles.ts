import { ICSSInJSStyle } from '@fluentui/styles'
import { pxToRem } from '../../../../utils'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import HierarchicalTreeTitle from '../../../../components/HierarchicalTree/HierarchicalTreeTitle'

const hierarchicalTreeItemStyles = {
  root: ({ theme: { siteVariables } }): ICSSInJSStyle => ({
    listStyleType: 'none',
    padding: `0 0 0 ${pxToRem(1)}`,
    ...getBorderFocusStyles({ siteVariables })[':focus'],
    ':focus-visible': {
      [`> .${HierarchicalTreeTitle.className}`]: {
        position: 'relative',
        ...getBorderFocusStyles({ siteVariables })[':focus-visible'],
      },
    },
  }),
}

export default hierarchicalTreeItemStyles
