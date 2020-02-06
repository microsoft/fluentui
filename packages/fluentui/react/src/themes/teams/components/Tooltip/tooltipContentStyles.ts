import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { TooltipContentProps } from '../../../../components/Tooltip/TooltipContent'
import { TooltipContentVariables } from './tooltipContentVariables'
import getPointerStyles from '../../getPointerStyles'
import pointerSvg from '../../pointerSvgUrl'
import { PopperChildrenProps } from '../../../../utils/positioner'

const getPointerOffset = (
  placement: PopperChildrenProps['placement'],
  v: TooltipContentVariables,
) =>
  placement === 'top-start' ||
  placement === 'top' ||
  placement === 'top-end' ||
  placement === 'bottom-end' ||
  placement === 'bottom' ||
  placement === 'bottom-start'
    ? v.pointerVerticalOffset
    : v.pointerHorizontalOffset

const tooltipContentStyles: ComponentSlotStylesPrepared<
  TooltipContentProps,
  TooltipContentVariables
> = {
  root: ({ props: p, variables: v, rtl }): ICSSInJSStyle => {
    const svgPointerStyles = getPointerStyles(
      getPointerOffset(p.placement, v),
      v.pointerMargin,
      rtl,
      p.placement,
      true,
    )

    return {
      borderRadius: v.borderRadius,
      display: 'block',
      maxWidth: v.maxWidth,
      color: v.color,
      background: v.backgroundColor,
      ...(p.pointing && svgPointerStyles.root),
    }
  },
  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => {
    const svgPointerStyles = getPointerStyles(
      getPointerOffset(p.placement, v),
      v.pointerMargin,
      rtl,
      p.placement,
      true,
    )

    return {
      display: 'block',
      position: 'absolute',
      overflow: 'hidden',
      width: v.pointerWidth,
      height: v.pointerHeight,
      backgroundImage: pointerSvg(v.backgroundColor),
      ...svgPointerStyles.pointer,
    }
  },
  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,

    borderRadius: 'inherit',
    boxShadow: v.boxShadow,
  }),
}

export default tooltipContentStyles
