import * as React from 'react';
import { usePopper } from '@fluentui/react-positioning';
import { useTooltipManager } from '@fluentui/react-shared-contexts';
import { useTheme } from '@fluentui/react-theme-provider';
import { makeMergeProps, resolveShorthandProps, useId, useIsSSR, useMergedRefs } from '@fluentui/react-utilities';
import { createTooltipManager } from './createTooltipManager';
import { TooltipProps, TooltipShorthandProps, TooltipState, TooltipTriggerProps } from './Tooltip.types';
import { arrowHeight, tooltipBorderRadius } from './useTooltipStyles';

/**
 * Names of the shorthand properties in TooltipProps
 * {@docCategory Tooltip}
 */
export const tooltipShorthandProps: TooltipShorthandProps[] = ['content'];

const mergeProps = makeMergeProps<TooltipState>({ deepMerge: tooltipShorthandProps });

/**
 * Combine up to two event callbacks into a single function that calls them in order
 */
const mergeCallbacks = <Event,>(
  callback1: ((ev: Event) => void) | undefined,
  callback2: ((ev: Event) => void) | undefined,
) => {
  // Only need to create a new function if both callbacks are defined
  if (callback1 && callback2) {
    return (ev: Event) => {
      callback1(ev);
      callback2(ev);
    };
  }

  return callback1 || callback2;
};

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
  const [visible, setVisible] = React.useState(false);

  const state = mergeProps(
    {
      ref,
      children: props.children,
      content: {
        as: React.Fragment,
      },
      id: useId('tooltip-'),
      role: 'tooltip',
      position: 'above',
      align: 'center',
      offset: 4,
      showDelay: 250,
      hideDelay: 250,
      visible,
      shouldRenderTooltip: !useIsSSR(),
    },
    defaultProps && resolveShorthandProps(defaultProps, tooltipShorthandProps),
    resolveShorthandProps(props, tooltipShorthandProps),
  );

  const manager = useTooltipManager(createTooltipManager);

  const theme = useTheme();

  const popper = usePopper({
    enabled: visible,
    position: state.position,
    align: state.align,
    offset: [0, state.offset + (state.noArrow ? 0 : arrowHeight)],
    arrowPadding: theme?.global ? 2 * parseInt(tooltipBorderRadius(theme), 10) : 0,
  });

  state.ref = useMergedRefs(state.ref, popper.containerRef);
  state.arrowRef = popper.arrowRef;

  // Notify the manager when the pointer enters or leaves the tooltip
  state.onPointerEnter = React.useMemo(() => mergeCallbacks(manager.notifyEnterTooltip, state.onPointerEnter), [
    manager,
    state.onPointerEnter,
  ]);
  state.onPointerLeave = React.useMemo(() => mergeCallbacks(manager.notifyLeaveTooltip, state.onPointerLeave), [
    manager,
    state.onPointerLeave,
  ]);

  // Listener for onPointerEnter and onFocus on the trigger element
  const onEnter = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      const target = state.targetRef?.current ?? ev.currentTarget;
      popper.targetRef.current = target;

      if (state.onlyIfTruncated) {
        // For tooltips that only show when truncated, don't show if the target's scroll size <= client size
        if (target.scrollWidth <= target.clientWidth && target.scrollHeight <= target.clientHeight) {
          return;
        }
      }

      manager.notifyEnterTrigger({
        setVisible,
        trigger: ev.currentTarget,
        showDelay: state.showDelay,
        hideDelay: state.hideDelay,
      });
    },
    [state.targetRef, popper.targetRef, state.onlyIfTruncated, manager, state.showDelay, state.hideDelay],
  );

  // Listener for onPointerLeave and onBlur on the trigger element
  const onLeave = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      manager.notifyLeaveTrigger(ev.currentTarget);
    },
    [manager],
  );

  // Get the existing event callbacks from the child so they can be merged with onEnter/onLeave
  const {
    onPointerEnter: onPointerEnterChild,
    onPointerLeave: onPointerLeaveChild,
    onFocus: onFocusChild,
    onBlur: onBlurChild,
  } = (React.isValidElement(state.children) && state.children.props) || {};

  // The props to add to the trigger element (child)
  const triggerProps: TooltipTriggerProps = {
    onPointerEnter: React.useMemo(() => mergeCallbacks(onPointerEnterChild, onEnter), [onPointerEnterChild, onEnter]),
    onPointerLeave: React.useMemo(() => mergeCallbacks(onPointerLeaveChild, onLeave), [onPointerLeaveChild, onLeave]),
    onFocus: React.useMemo(() => mergeCallbacks(onFocusChild, onEnter), [onFocusChild, onEnter]),
    onBlur: React.useMemo(() => mergeCallbacks(onBlurChild, onLeave), [onBlurChild, onLeave]),
  };

  if (state.type === 'description') {
    // Only set aria-describedby if the tooltip is rendered; otherwise it'll refer to a nonexistent element
    if (state.shouldRenderTooltip) {
      triggerProps['aria-describedby'] = state.id;
    }
  } else if (typeof state.content.children !== 'string') {
    // Only set aria-labelledby if the tooltip is rendered; otherwise it'll refer to a nonexistent element
    if (state.shouldRenderTooltip) {
      triggerProps['aria-labelledby'] = state.id;
    }
  } else {
    // If the trigger's label is a simple string, then we can use the aria-label prop, and
    // we don't need to render the tooltip content when it isn't visible
    triggerProps['aria-label'] = state.content.children as string;
    if (!visible) {
      state.shouldRenderTooltip = false;
    }
  }

  // Apply the trigger props to the child, either by calling the render function, or cloning with the new props
  if (typeof state.children === 'function') {
    state.children = state.children(triggerProps) as TooltipState['children'];
  } else {
    const child = React.Children.only(state.children);

    if (child.type === React.Fragment) {
      throw new Error(`Tooltip's child cannot be a fragment`);
    }

    state.children = React.cloneElement(child, triggerProps);
  }

  return state;
};
