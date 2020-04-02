import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { PopupContentStylesProps } from '../../../../components/Popup/PopupContent';
import { PopupContentVariables } from './popupContentVariables';
import { getContainerStyles, getPointerStyles } from '../../getPointerStyles';

const popupContentStyles: ComponentSlotStylesPrepared<PopupContentStylesProps, PopupContentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    zIndex: v.zIndex,

    ...(p.pointing &&
      getContainerStyles({
        placement: p.basePlacement,
        margin: v.pointerMargin,
      })),
  }),

  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle =>
    getPointerStyles({
      backgroundColor: v.backgroundColor,
      borderColor: v.borderColor,
      borderSize: v.borderSize,
      gap: v.pointerGap,
      height: v.pointerHeight,
      width: v.pointerWidth,

      placement: p.basePlacement,
      rtl,
    }),

  content: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    background: v.backgroundColor,
    color: v.color,
    boxShadow: v.boxShadow,

    border: `${v.borderSize} solid ${v.borderColor}`,
    borderRadius: v.borderRadius,

    padding: v.padding,
    transform: 'rotate(360deg)',
  }),
};

export default popupContentStyles;
