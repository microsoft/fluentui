import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useId } from '@fluentui/react-utilities';
import { TooltipTriggerChildProps, TooltipTriggerProps, TooltipTriggerState } from './TooltipTrigger.types';
import { TooltipImperativeHandle } from '../../common/TooltipProps.types';
import { useTooltipContext } from '../../common/useTooltipContext';

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

  const { TooltipComponent, tooltipManager, tooltipContainer } = useTooltipContext();

  const state = mergeProps(
    {
      children: props.children,
      tooltip: {
        as: TooltipComponent,
        id: useId('tooltip-'),
        componentRef: tooltipRef,
      },
      tooltipManager,
      tooltipContainer,
      tooltipRef,
    },
    defaultProps && resolveShorthandProps(defaultProps, tooltipTriggerShorthandProps),
    resolveShorthandProps(props, tooltipTriggerShorthandProps),
  );

  mergeProps(state, {
    tooltip: {
      // Some TooltipProps are on TooltipTrigger for convenience, and need to be added to the tooltip
      position: state.position,
      align: state.align,
      subtle: state.subtle,
      noArrow: state.noArrow,
      offset: state.offset,
      onPointerEnter: mergeEventCallbacks(() => tooltipManager?.onPointerEnterTooltip(), state.tooltip.onPointerEnter),
      onPointerLeave: mergeEventCallbacks(() => tooltipManager?.onPointerLeaveTooltip(), state.tooltip.onPointerLeave),
    },
  });

  if (React.isValidElement(state.children)) {
    // Attach the extra props by cloning the child
    state.children = React.cloneElement(state.children, extraChildProps(state, state.children.props));
  } else if (typeof state.children === 'function') {
    // If a render function was passed in as the child, pass the props to the function
    state.children = state.children(extraChildProps(state)) as TooltipTriggerState['children'];
  } else {
    if (process.env.NODE_ENV !== 'production') {
      // Assign to `never` to have TypeScript check that the above conditions are exhaustive
      const children: never = state.children;

      throw new Error(
        `Invalid children of TooltipTrigger: ${children}. ` +
          `TooltipTrigger must contain either a single React element, or a render function`,
      );
    }
  }

  return state;
};

/**
 * Create the extra props that are appended to the tooltip
 */
const extraChildProps = (
  state: TooltipTriggerState,
  childProps?: React.HTMLAttributes<HTMLElement>,
): TooltipTriggerChildProps => {
  const showTooltipHandler = (ev: React.SyntheticEvent<HTMLElement>) => {
    if (state.tooltipRef.current) {
      // TODO handle onlyIfTruncated

      state.tooltipManager?.showTooltip({
        tooltip: state.tooltipRef.current,
        trigger: ev.currentTarget,
        target: state.targetRef?.current,
        showDelay: state.showDelay,
        hideDelay: state.hideDelay,
      });
    }
  };

  const hideTooltipHandler = (ev: React.SyntheticEvent<HTMLElement>) => {
    state.tooltipManager?.hideTooltip(ev.currentTarget);
  };

  return {
    onPointerEnter: mergeEventCallbacks(childProps?.onPointerEnter, showTooltipHandler),
    onPointerLeave: mergeEventCallbacks(childProps?.onPointerLeave, hideTooltipHandler),
    onFocus: mergeEventCallbacks(childProps?.onFocus, showTooltipHandler),
    onBlur: mergeEventCallbacks(childProps?.onBlur, hideTooltipHandler),

    // If the tooltip is a label, it sets aria-labelledby to the tooltip's ID instead of aria-describedby
    [state.type === 'label' ? 'aria-labelledby' : 'aria-describedby']: state.tooltip.id,
  };
};

const mergeEventCallbacks = <Event>(...callbacks: (((ev: Event) => void) | undefined)[]) => {
  return (ev: Event) => callbacks.forEach(callback => callback?.(ev));
};
