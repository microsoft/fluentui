import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useId } from '@fluentui/react-utilities';
import { TooltipTriggerChildProps, TooltipTriggerProps, TooltipTriggerState } from './TooltipTrigger.types';
import { TooltipImperativeHandle, TooltipTriggerReason, useTooltipContext } from '../../common';

/**
 * Names of the shorthand properties in TooltipTriggerProps
 * {@docCategory TooltipTrigger}
 */
export const tooltipTriggerShorthandProps = ['tooltip'] as const;

const mergeProps = makeMergeProps<TooltipTriggerState>({ deepMerge: tooltipTriggerShorthandProps });

/**
 * Create the state required to render TooltipTrigger.
 *
 * The returned state can be modified with hooks such as useTooltipTriggerStyles,
 * before being passed to renderTooltipTrigger.
 *
 * @param props - props from this instance of TooltipTrigger
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory TooltipTrigger}
 */
export const useTooltipTrigger = (
  props: TooltipTriggerProps,
  defaultProps?: TooltipTriggerProps,
): TooltipTriggerState => {
  const tooltipRef = React.useRef<TooltipImperativeHandle | null>(null);

  const { Tooltip, manager, portalRoot } = useTooltipContext();

  const state = mergeProps(
    {
      showDelay: 250,
      hideDelay: 250,
      children: props.children,
      tooltip: {
        as: Tooltip,
        id: useId('tooltip-'),
        componentRef: tooltipRef,
        onPointerEnter: ev => manager?.onPointerEnterTooltip(ev.currentTarget),
        onPointerLeave: ev => manager?.onPointerLeaveTooltip(ev.currentTarget),
      },
      manager,
      portalRoot,
      tooltipRef,
    },
    defaultProps && resolveShorthandProps(defaultProps, tooltipTriggerShorthandProps),
    resolveShorthandProps(props, tooltipTriggerShorthandProps),
  );

  // Certain TooltipProps are on TooltipTrigger for convenience, and need to be added to state.tooltip
  mergeProps(state, {
    tooltip: {
      position: state.position,
      align: state.align,
      subtle: state.subtle,
      noArrow: state.noArrow,
      offset: state.offset,
    },
  });

  if (React.isValidElement(state.children)) {
    // Attach the extra props by cloning the child
    state.children = React.cloneElement(state.children, extraChildProps(state, state.children.props));
  } else if (typeof state.children === 'function') {
    // If a render function was passed in as the child, pass the props to the function
    state.children = state.children(extraChildProps(state)) as TooltipTriggerState['children'];
  } else {
    // console.warn('Invalid child of TooltipTrigger');
  }

  return state;
};

/**
 * Create the extra props that are appended to the tooltip
 */
const extraChildProps = (
  state: TooltipTriggerState,
  childProps?: React.HTMLAttributes<HTMLElement>,
): TooltipTriggerChildProps => ({
  onPointerEnter: showTooltipHandler(state, 'pointer', childProps?.onPointerEnter),
  onPointerLeave: hideTooltipHandler(state, 'pointer', childProps?.onPointerLeave),
  onFocus: showTooltipHandler(state, 'focus', childProps?.onFocus),
  onBlur: hideTooltipHandler(state, 'focus', childProps?.onBlur),

  // If the tooltip is a label, it sets aria-labelledby to the tooltip's ID instead of aria-describedby
  [state.type === 'label' ? 'aria-labelledby' : 'aria-describedby']: state.tooltip.id,
});

/**
 * Create an event handler that wraps an existing event and shows the tooltip
 */
const showTooltipHandler = <Event extends React.SyntheticEvent<HTMLElement>>(
  state: TooltipTriggerState,
  reason: TooltipTriggerReason,
  onEvent?: (ev: Event) => void,
) => {
  return (ev: Event) => {
    onEvent?.(ev);
    if (!ev.isDefaultPrevented() && state.tooltipRef.current) {
      state.manager?.showTooltip(
        {
          tooltip: state.tooltipRef.current,
          trigger: ev.currentTarget,
          target: state.targetRef?.current ?? ev.currentTarget,
          showDelay: state.showDelay,
          hideDelay: state.hideDelay,
        },
        reason,
      );
    }
  };
};

/**
 * Create an event handler that wraps an existing event and hides the tooltip
 */
const hideTooltipHandler = <Event extends React.SyntheticEvent<HTMLElement>>(
  state: TooltipTriggerState,
  reason: TooltipTriggerReason,
  onEvent?: (ev: Event) => void,
) => {
  return (ev: Event) => {
    onEvent?.(ev);
    state.manager?.hideTooltip(ev.currentTarget, reason);
  };
};
