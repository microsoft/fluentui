import * as React from 'react';
import { usePopper } from '@fluentui/react-positioning';
import { TooltipContext, useFluent } from '@fluentui/react-shared-contexts';
import { useTheme } from '@fluentui/react-theme-provider';
import {
  makeMergeProps,
  onlyChild,
  resolveShorthandProps,
  useId,
  useIsomorphicLayoutEffect,
  useIsSSR,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { TooltipProps, TooltipShorthandProps, TooltipState, TooltipTriggerProps } from './Tooltip.types';
import { arrowHeight, tooltipBorderRadius } from './useTooltipStyles';

/**
 * Names of the shorthand properties in TooltipProps
 * {@docCategory Tooltip}
 */
export const tooltipShorthandProps: TooltipShorthandProps[] = ['content'];

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
  const [visible, setVisible] = React.useState(false);
  const context = React.useContext(TooltipContext);

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
      triggerAriaAttribute: 'label',
      visible,
      shouldRenderTooltip: visible,
    },
    defaultProps && resolveShorthandProps(defaultProps, tooltipShorthandProps),
    resolveShorthandProps(props, tooltipShorthandProps),
  );

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

  const [setDelayTimeout, clearDelayTimeout] = useTimeout();

  const { targetDocument } = useFluent();

  // When this tooltip is visible, hide any other tooltips, and register it
  // as the visibleTooltip with the TooltipContext.
  // Also add a listener on document to hide the tooltip if Escape is pressed
  useIsomorphicLayoutEffect(() => {
    if (visible) {
      const thisTooltip = {
        hide: () => {
          setVisible(false);
          clearDelayTimeout();
        },
      };

      context.visibleTooltip?.hide();
      context.visibleTooltip = thisTooltip;

      const onDocumentKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape' || ev.key === 'Esc') {
          thisTooltip.hide();
        }
      };

      targetDocument?.addEventListener('keydown', onDocumentKeyDown);

      return () => {
        if (context.visibleTooltip === thisTooltip) {
          context.visibleTooltip = undefined;
        }

        targetDocument?.removeEventListener('keydown', onDocumentKeyDown);
      };
    }
  }, [clearDelayTimeout, context, targetDocument, visible]);

  // Whether the trigger element is mouse-hovered or focused
  const hoveredOrFocused = React.useRef(false);

  // Listener for onPointerEnter and onFocus on the trigger element
  const onEnterTrigger = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      hoveredOrFocused.current = true;

      const target = state.targetRef?.current ?? ev.currentTarget;
      popper.targetRef.current = target;

      // For tooltips that only show when truncated, don't show if the target's scroll size <= client size
      if (state.onlyIfTruncated) {
        if (target.scrollWidth <= target.clientWidth && target.scrollHeight <= target.clientHeight) {
          return;
        }
      }

      // Show immediately if another tooltip is already visible
      const delay = context.visibleTooltip ? 0 : state.showDelay;

      setDelayTimeout(() => {
        if (hoveredOrFocused.current) {
          setVisible(true);
        }
      }, delay);
    },
    [context, popper.targetRef, setDelayTimeout, state.onlyIfTruncated, state.showDelay, state.targetRef],
  );

  // Listener for onPointerLeave and onBlur on the trigger element
  const onLeaveTrigger = React.useCallback(() => {
    hoveredOrFocused.current = false;

    setDelayTimeout(() => {
      if (!hoveredOrFocused.current) {
        setVisible(false);
      }
    }, state.hideDelay);
  }, [setDelayTimeout, state.hideDelay]);

  // Listen for the mouse entering/leaving the tooltip, and treat it as if hovered over the trigger.
  // This keeps the tooltip visible when the pointer is moved over it.
  const { onPointerEnter, onPointerLeave } = state;
  state.onPointerEnter = ev => {
    hoveredOrFocused.current = true;
    onPointerEnter?.(ev);
  };
  state.onPointerLeave = ev => {
    onLeaveTrigger();
    onPointerLeave?.(ev);
  };

  const childProps = React.isValidElement(state.children) ? state.children.props : undefined;

  // The props to add to the trigger element (child)
  const triggerProps: TooltipTriggerProps = {
    onPointerEnter: useMergedCallbacks(childProps?.onPointerEnter, onEnterTrigger),
    onPointerLeave: useMergedCallbacks(childProps?.onPointerLeave, onLeaveTrigger),
    onFocus: useMergedCallbacks(childProps?.onFocus, onEnterTrigger),
    onBlur: useMergedCallbacks(childProps?.onBlur, onLeaveTrigger),
  };

  const isServerSideRender = useIsSSR();

  if (state.triggerAriaAttribute === 'label') {
    // aria-label only works if the content is a string. Otherwise, need to use labelledby.
    if (typeof state.content.children === 'string') {
      triggerProps['aria-label'] = state.content.children as string;
    } else {
      state.triggerAriaAttribute = 'labelledby';
    }
  }

  if (state.triggerAriaAttribute === 'labelledby' && !isServerSideRender) {
    triggerProps['aria-labelledby'] = state.id;
    // Always render the tooltip even if hidden, so that aria-labelledby refers to a valid element
    state.shouldRenderTooltip = true;
  } else if (state.triggerAriaAttribute === 'describedby' && !isServerSideRender) {
    triggerProps['aria-describedby'] = state.id;
    state.shouldRenderTooltip = true;
  }

  // Apply the trigger props to the child, either by calling the render function, or cloning with the new props
  if (typeof state.children === 'function') {
    state.children = state.children(triggerProps) as TooltipState['children'];
  } else {
    state.children = React.cloneElement(onlyChild(state.children), triggerProps);
  }

  return state;
};

/**
 * Helper to manage a browser timeout.
 * Ensures that the timeout isn't set multiple times at once,
 * and is cleaned up when the component is unloaded.
 *
 * @returns A pair of [setTimeout, clearTimeout] that are stable between renders.
 */
// TODO this could be moved to react-utilities as a general-purpose hook
const useTimeout = () => {
  const [timeout] = React.useState(() => ({
    id: undefined as ReturnType<typeof setTimeout> | undefined,
    set: (fn: () => void, delay: number) => {
      timeout.clear();
      timeout.id = setTimeout(fn, delay);
    },
    clear: () => {
      if (timeout.id !== undefined) {
        clearTimeout(timeout.id);
        timeout.id = undefined;
      }
    },
  }));

  // Clean up the timeout when the component is unloaded
  React.useEffect(() => timeout.clear, [timeout]);

  return [timeout.set, timeout.clear] as const;
};

/**
 * Combine up to two event callbacks into a single function that calls them in order
 */
const useMergedCallbacks = <Event,>(
  callback1: ((ev: Event) => void) | undefined,
  callback2: ((ev: Event) => void) | undefined,
) => {
  return React.useCallback(
    (ev: Event) => {
      callback1?.(ev);
      callback2?.(ev);
    },
    [callback1, callback2],
  );
};
