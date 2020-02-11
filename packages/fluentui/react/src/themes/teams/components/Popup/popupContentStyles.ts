import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { PopupContentProps } from '../../../../components/Popup/PopupContent'
import { PopupContentVariables } from './popupContentVariables'
import getPointerStyles from '../../getPointerStyles'

const popupContentStyles: ComponentSlotStylesPrepared<PopupContentProps, PopupContentVariables> = {
  root: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    border: `${v.borderSize} solid ${v.borderColor}`,
    borderRadius: v.borderRadius,
    boxShadow: v.boxShadow,

    display: 'block',
    ...(p.pointing && getPointerStyles(v.pointerOffset, v.pointerMargin, rtl, p.placement).root),
  }),

  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',

    backgroundColor: 'inherit',
    borderBottom: `${v.borderSize} solid ${v.borderColor}`,
    borderRight: `${v.borderSize} solid ${v.borderColor}`,

    height: v.pointerSize,
    width: v.pointerSize,

    ...getPointerStyles(v.pointerOffset, v.pointerMargin, rtl, p.placement).pointer,
  }),

  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,
  }),
}

export default popupContentStyles
