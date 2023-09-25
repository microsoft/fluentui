import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { PopupContentStylesProps } from '../../../../components/Popup/PopupContent';
import { PopupContentVariables } from './popupContentVariables';
import { getContainerStyles, getPointerStyles } from '../../getPointerStyles';

export const popupContentStyles: ComponentSlotStylesPrepared<PopupContentStylesProps, PopupContentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    zIndex: v.zIndex,

    ...(p.pointing && {
      pointerEvents: 'none',
      ...getContainerStyles({
        placement: p.basePlacement,
        padding: v.pointerMargin,
      }),
    }),

    ...(p.autoSize && {
      // when autoSize is true, root will have inline style maxWidth and maxHeight set by popper
      display: 'flex',
    }),
  }),

  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle =>
    getPointerStyles({
      backgroundColor: v.backgroundColor,
      borderColor: v.borderColor,
      borderSize: v.borderSize,
      gap: v.pointerGap,
      padding: v.pointerMargin,
      height: v.pointerHeight,
      width: v.pointerWidth,

      placement: p.basePlacement,
      rtl,
    }),

  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    background: v.backgroundColor,
    color: v.color,
    boxShadow: v.boxShadow,

    border: `${v.borderSize} solid ${v.borderColor}`,
    borderRadius: v.borderRadius,

    padding: v.padding,

    ...(p.pointing && {
      pointerEvents: 'all',
    }),

    ...(p.autoSize && {
      overflow: 'auto',
    }),
  }),
};
