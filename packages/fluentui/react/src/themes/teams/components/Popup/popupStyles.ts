import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { PopupProps } from '../../../../components/Popup/Popup'
import { PopupVariables } from './popupVariables'
import initialPopperStyles from '../../../../utils/positioner/initialStyles'

const popupStyles: ComponentSlotStylesPrepared<PopupProps, PopupVariables> = {
  root: (): ICSSInJSStyle => ({}),

  popup: ({ variables: v }): ICSSInJSStyle => ({
    zIndex: v.zIndex,
    textAlign: 'left',
    color: v.contentColor,
    background: v.contentBackgroundColor,

    ...(initialPopperStyles as ICSSInJSStyle),
  }),
}

export default popupStyles
