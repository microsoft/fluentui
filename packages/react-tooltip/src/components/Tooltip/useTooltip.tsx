import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useId, useIsSSR, useMergedRefs } from '@fluentui/react-utilities';
import { usePopper } from '@fluentui/react-positioning';
import { useTheme } from '@fluentui/react-theme-provider';
import { TooltipProps, TooltipShorthandProps, TooltipState, TooltipTriggerProps } from './Tooltip.types';
import { arrowHeight, tooltipBorderRadius } from './useTooltipStyles';
import { useTooltipContext } from '../TooltipProvider';
import { createTooltipManager } from '../../TooltipManager';

/**
 * Names of the shorthand properties in TooltipProps
 * {@docCategory Tooltip}
 */
export const tooltipShorthandProps: TooltipShorthandProps[] = ['content'];

const mergeProps = makeMergeProps<TooltipState>({ deepMerge: tooltipShorthandProps });

const mergeCallbacks = <Event,>(
  callback1: ((ev: Event) => void) | undefined,
  callback2: ((ev: Event) => void) | undefined,
) => {
  if (!callback1 || !callback2) {
    return callback1 || callback2;
  }

  return (ev: Event) => {
    callback1(ev);
    callback2(ev);
  };
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
export const useTooltip = (props: TooltipProps, defaultProps?: TooltipProps): TooltipState => {
  const [visible, setVisible] = React.useState(false);

  const state = mergeProps(
    {
      children: props.children,
      content: {
        as: 'div',
        role: 'tooltip',
        id: useId('tooltip-'),
      },
      position: 'above',
      align: 'center',
      offset: 4,
      showDelay: 250,
      hideDelay: 250,
      visible,
      isContentRendered: !useIsSSR(),
    },
    defaultProps && resolveShorthandProps(defaultProps, tooltipShorthandProps),
    resolveShorthandProps(props, tooltipShorthandProps),
  );

  const theme = useTheme();

  const popper = usePopper({
    enabled: state.visible,
    position: state.position,
    align: state.align,
    offset: [0, state.offset + (state.noArrow ? 0 : arrowHeight)],
    arrowPadding: theme?.global ? 2 * parseInt(tooltipBorderRadius(theme), 10) : 0,
  });

  state.content.ref = useMergedRefs(state.content.ref, popper.containerRef);
  state.arrowRef = popper.arrowRef;

  const { tooltipManagerRef } = useTooltipContext();

  if (!tooltipManagerRef.current) {
    tooltipManagerRef.current = createTooltipManager();
  }

  state.content.onPointerEnter = mergeCallbacks(
    () => tooltipManagerRef.current?.notifyEnterTooltip(),
    state.content.onPointerEnter,
  );
  state.content.onPointerLeave = mergeCallbacks(
    () => tooltipManagerRef.current?.notifyLeaveTooltip(),
    state.content.onPointerLeave,
  );

  const onEnterTrigger = (ev: React.SyntheticEvent<HTMLElement>) => {
    const tgt = state.targetRef?.current ?? ev.currentTarget;
    popper.targetRef.current = tgt;

    // For tooltips that only show when truncated, don't show if the target's client size <= scroll size
    if (state.onlyIfTruncated && tgt.clientWidth >= tgt.scrollWidth && tgt.clientHeight >= tgt.scrollHeight) {
      return;
    }

    tooltipManagerRef.current?.notifyEnterTrigger({
      setVisible,
      trigger: ev.currentTarget,
      showDelay: state.showDelay,
      hideDelay: state.hideDelay,
    });
  };

  const onLeaveTrigger = (ev: React.SyntheticEvent<HTMLElement>) => {
    tooltipManagerRef.current?.notifyLeaveTrigger(ev.currentTarget);
  };

  const triggerAriaProps: TooltipTriggerProps = {};

  if (state.type === 'description') {
    if (state.isContentRendered) {
      triggerAriaProps['aria-describedby'] = state.content.id;
    }
  } else if (typeof state.content.children !== 'string') {
    if (state.isContentRendered) {
      triggerAriaProps['aria-labelledby'] = state.content.id;
    }
  } else {
    // If the content is the trigger's label, and it is a simple string, then we can use the aria-label prop, and
    // we don't need to render the tooltip content if it isn't visible
    triggerAriaProps['aria-label'] = state.content.children as string;
    if (!state.visible) {
      state.isContentRendered = false;
    }
  }

  if (typeof state.children === 'function') {
    // If a render function was passed in as the child, pass the props to the function
    state.children = state.children({
      onPointerEnter: onEnterTrigger,
      onPointerLeave: onLeaveTrigger,
      onFocus: onEnterTrigger,
      onBlur: onLeaveTrigger,
      ...triggerAriaProps,
    }) as TooltipState['children'];
  } else {
    const child = React.Children.only(state.children);
    if (child.type !== React.Fragment) {
      // Attach the extra props by cloning the child
      state.children = React.cloneElement(child, {
        onPointerEnter: mergeCallbacks(child.props.onPointerEnter, onEnterTrigger),
        onPointerLeave: mergeCallbacks(child.props.onPointerLeave, onLeaveTrigger),
        onFocus: mergeCallbacks(child.props.onFocus, onEnterTrigger),
        onBlur: mergeCallbacks(child.props.onBlur, onLeaveTrigger),
        ...triggerAriaProps,
      });
    } else if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        'TooltipTrigger has unsupported children. It can only contain a single' +
          ' React element (not a fragment), or a render function.',
      );
    }
  }

  return state;
};
