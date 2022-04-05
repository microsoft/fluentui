import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TooltipContentStylesProps } from '../../../../components/Tooltip/TooltipContent';
import { TooltipContentVariables } from './tooltipContentVariables';
import { getContainerStyles, getPointerStyles } from '../../getPointerStyles';
import { pointerSvgUrl } from '../../pointerSvgUrl';

export const tooltipContentStyles: ComponentSlotStylesPrepared<TooltipContentStylesProps, TooltipContentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'none',
    position: 'absolute',

    maxWidth: v.maxWidth,
    zIndex: v.zIndex,

    ...(p.pointing && {
      pointerEvents: 'all',

      ...getContainerStyles({
        placement: p.basePlacement,
        padding: v.pointerMargin,
      }),
    }),

    ...(p.open && {
      display: 'block',
    }),
  }),
  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',
    width: v.pointerWidth,
    height: v.pointerHeight,

    ...getPointerStyles({
      backgroundColor: p.subtle ? v.subtleBackgroundColor : v.backgroundColor,
      borderSize: v.borderSize,
      borderColor: p.subtle ? v.subtleBorderColor : 'transparent',
      gap: v.pointerGap,
      padding: v.pointerMargin,
      height: v.pointerHeight,
      width: v.pointerWidth,

      placement: p.basePlacement,
      rtl,
      svg: pointerSvgUrl(p.subtle ? v.subtleBackgroundColor : v.backgroundColor),
    }),
  }),
  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,
    textAlign: 'left',

    color: v.color,
    background: v.backgroundColor,
    borderRadius: v.borderRadius,
    boxShadow: v.boxShadow,

    ...(p.subtle && {
      background: v.subtleBackgroundColor,
      color: v.subtleForegroundColor,
      borderStyle: 'solid',
      borderWidth: v.borderSize,
      borderColor: v.subtleBorderColor,
    }),

    ...(p.pointing && {
      pointerEvents: 'all',
    }),
  }),
};
