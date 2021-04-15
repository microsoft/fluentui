import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { usePopper } from '@fluentui/react-positioning';
import { useTheme } from '@fluentui/react-theme-provider';
import { TooltipProps, TooltipShorthandProps, TooltipState } from './Tooltip.types';
import { arrowHeight, tooltipBorderRadius } from './useTooltipStyles';

/**
 * Names of the shorthand properties in TooltipProps
 * {@docCategory Tooltip}
 */
export const tooltipShorthandProps: TooltipShorthandProps[] = ['arrow'];

const mergeProps = makeMergeProps<TooltipState>({ deepMerge: tooltipShorthandProps });

/**
 * Create the state required to render Tooltip.
 *
 * The returned state can be modified with hooks such as useTooltipStyles,
 * before being passed to renderTooltip.
 *
 * @param props - props from this instance of Tooltip
 * @param ref - reference to root HTMLElement of Tooltip
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory Tooltip}
 */
export const useTooltip = (
  props: TooltipProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: TooltipProps,
): TooltipState => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  const state = mergeProps(
    {
      ref,
      as: 'div',
      role: 'tooltip',
      position: 'above',
      align: 'center',
      offset: 4,
      arrow: { as: 'div', children: '' },
      visible: !!target,
    },
    defaultProps && resolveShorthandProps(defaultProps, tooltipShorthandProps),
    resolveShorthandProps(props, tooltipShorthandProps),
  );

  if (state.noArrow) {
    state.arrow = undefined;
  }

  React.useImperativeHandle(
    state.componentRef,
    () => ({
      show: t => setTarget(t),
      hide: () => setTarget(null),
    }),
    [],
  );

  const theme = useTheme();

  const { targetRef, containerRef, arrowRef } = usePopper({
    enabled: state.visible,
    position: state.position,
    align: state.align,
    offset: [0, state.offset + (state.noArrow ? 0 : arrowHeight)],
    arrowPadding: theme?.global ? 2 * parseInt(tooltipBorderRadius(theme), 10) : 0,
  });

  targetRef.current = target;
  state.ref = useMergedRefs(state.ref, containerRef);

  const mergedArrowRef = useMergedRefs(state.arrow?.ref, arrowRef);
  if (state.arrow) {
    state.arrow.ref = mergedArrowRef;
  }

  return state;
};
