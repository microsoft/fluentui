import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { AlertProps } from '../../../../components/Alert/Alert'
import { AlertHighContrastVariables } from './alertVariables'
import getBorderFocusStyles from '../../../teams/getBorderFocusStyles'

const alertStyles: ComponentSlotStylesPrepared<AlertProps, AlertHighContrastVariables> = {
  dismissAction: ({ variables: v, props: p, theme: { siteVariables } }): ICSSInJSStyle => ({
    ':focus-visible': {
      backgroundColor: v.focusBackgroundColor,

      ':hover': {
        backgroundColor: v.hoverBackgroundColor,
      },
    },

    ':hover': {
      backgroundColor: v.hoverBackgroundColor,

      // TODO: consider creating dedicated method for border styles on hover
      ...getBorderFocusStyles({ siteVariables })[':focus-visible'],
    },
  }),
}

export default alertStyles
