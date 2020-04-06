import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TooltipContentStylesProps } from '../../../../components/Tooltip/TooltipContent';
import { TooltipContentVariables } from './tooltipContentVariables';
import { getContainerStyles, getPointerStyles } from '../../getPointerStyles';
import pointerSvg from '../../pointerSvgUrl';

const tooltipContentStyles: ComponentSlotStylesPrepared<TooltipContentStylesProps, TooltipContentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',

    maxWidth: v.maxWidth,
    zIndex: v.zIndex,

    ...(p.pointing &&
      getContainerStyles({
        placement: p.basePlacement,
        margin: v.pointerMargin,
      })),

    ...(!p.open && {
      opacity: 0,
    }),
  }),
  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',
    width: v.pointerWidth,
    height: v.pointerHeight,

    ...getPointerStyles({
      backgroundColor: v.backgroundColor,
      borderSize: v.borderSize,
      borderColor: 'transparent',
      gap: v.pointerGap,
      height: v.pointerHeight,
      width: v.pointerWidth,

      placement: p.basePlacement,
      rtl,
      svg: pointerSvg(v.backgroundColor),
    }),
  }),
  content: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,
    textAlign: 'left',

    color: v.color,
    background: v.backgroundColor,
    borderRadius: v.borderRadius,
    boxShadow: v.boxShadow,
  }),
};

export default tooltipContentStyles;
