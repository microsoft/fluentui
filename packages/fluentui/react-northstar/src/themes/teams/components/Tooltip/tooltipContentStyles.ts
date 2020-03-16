import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TooltipContentProps } from '../../../../components/Tooltip/TooltipContent';
import { TooltipContentVariables } from './tooltipContentVariables';
import getPointerStyles from '../../getPointerStyles';
import pointerSvg from '../../pointerSvgUrl';
import { PopperChildrenProps } from '../../../../utils/positioner';

type TooltipContentStylesProps = Pick<TooltipContentProps, 'placement' | 'pointing' | 'open'>;

const getPointerOffset = (placement: PopperChildrenProps['placement'], v: TooltipContentVariables) =>
  placement === 'top-start' ||
  placement === 'top' ||
  placement === 'top-end' ||
  placement === 'bottom-end' ||
  placement === 'bottom' ||
  placement === 'bottom-start'
    ? v.pointerVerticalOffset
    : v.pointerHorizontalOffset;

const tooltipContentStyles: ComponentSlotStylesPrepared<TooltipContentStylesProps, TooltipContentVariables> = {
  root: ({ props: p, variables: v, rtl }): ICSSInJSStyle => {
    const svgPointerStyles = getPointerStyles(
      getPointerOffset(p.placement, v),
      v.pointerGap,
      v.pointerMargin,
      rtl,
      p.placement,
      true,
    );

    return {
      borderRadius: v.borderRadius,
      display: 'block',
      maxWidth: v.maxWidth,
      color: v.color,
      background: v.backgroundColor,

      zIndex: v.zIndex,
      position: 'absolute',
      textAlign: 'left',

      ...(p.pointing && svgPointerStyles.root),

      ...(!p.open && {
        opacity: 0,
      }),
    };
  },
  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => {
    const svgPointerStyles = getPointerStyles(
      getPointerOffset(p.placement, v),
      v.pointerGap,
      v.pointerMargin,
      rtl,
      p.placement,
      true,
    );

    return {
      display: 'block',
      position: 'absolute',
      overflow: 'hidden',
      width: v.pointerWidth,
      height: v.pointerHeight,
      backgroundImage: pointerSvg(v.backgroundColor),
      ...svgPointerStyles.pointer,
    };
  },
  content: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,

    borderRadius: 'inherit',
    boxShadow: v.boxShadow,
  }),
};

export default tooltipContentStyles;
