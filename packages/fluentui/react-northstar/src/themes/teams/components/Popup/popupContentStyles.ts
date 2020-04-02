import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PopupContentStylesProps } from '../../../../components/Popup/PopupContent';
import { PopupContentVariables } from './popupContentVariables';
import getPointerStyles from '../../getPointerStyles';
import initialPopperStyles from '../../../../utils/positioner/initialStyles';

const popupContentStyles: ComponentSlotStylesPrepared<PopupContentStylesProps, PopupContentVariables> = {
  root: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    border: `${v.borderSize} solid ${v.borderColor}`,
    borderRadius: v.borderRadius,

    background: v.backgroundColor,
    color: v.color,
    boxShadow: v.boxShadow,

    display: 'block',
    textAlign: 'left',
    zIndex: v.zIndex,

    ...(initialPopperStyles as ICSSInJSStyle),

    ...(p.pointing && getPointerStyles(v.pointerOffset, v.pointerGap, v.pointerMargin, rtl, p.placement).root),
  }),

  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',

    backgroundColor: 'inherit',
    borderBottom: `${v.borderSize} solid ${v.borderColor}`,
    borderRight: `${v.borderSize} solid ${v.borderColor}`,

    height: v.pointerSize,
    width: v.pointerSize,

    ...getPointerStyles(v.pointerOffset, v.pointerGap, v.pointerMargin, rtl, p.placement).pointer,
  }),

  content: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,
  }),
};

export default popupContentStyles;
