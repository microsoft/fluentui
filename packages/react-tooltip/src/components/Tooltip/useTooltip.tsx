import * as React from 'react';
import { usePopper } from '@fluentui/react-positioning';
import { TooltipContext, useFluent } from '@fluentui/react-shared-contexts';
import {
  makeMergeProps,
  onlyChild,
  resolveShorthandProps,
  useControllableState,
  useId,
  useIsomorphicLayoutEffect,
  useIsSSR,
  useMergedRefs,
  useTimeout,
} from '@fluentui/react-utilities';
import { TooltipProps, TooltipShorthandProps, TooltipState, TooltipTriggerProps } from './Tooltip.types';

/**
 * Names of the shorthand properties in TooltipProps
 * {@docCategory Tooltip}
 */
export const tooltipShorthandProps: TooltipShorthandProps[] = ['content'];

const mergeProps = makeMergeProps<TooltipState>({ deepMerge: tooltipShorthandProps });

// Style values that are required for popper to properly position the tooltip
const tooltipBorderRadius = 4; // Update the root's borderRadius in useTooltipStyles.ts if this changes
const arrowHeight = 6; // Update the arrow's width/height in useTooltipStyles.ts if this changes

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
  const context = React.useContext(TooltipContext);
  const isServerSideRender = useIsSSR();
  const { targetDocument } = useFluent();
  const [setDelayTimeout, clearDelayTimeout] = useTimeout();

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
    },
    defaultProps && resolveShorthandProps(defaultProps, tooltipShorthandProps),
    resolveShorthandProps(props, tooltipShorthandProps),
  );

  const [visible, setVisibleInternal] = useControllableState({ state: state.visible, initialState: false });
  const setVisible = React.useCallback(
    (newVisible: boolean, ev?: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      clearDelayTimeout();
      setVisibleInternal(oldVisible => {
        if (newVisible !== oldVisible) {
          const onVisibleChange = state.onVisibleChange; // Workaround for bug in react-exhaustive-deps lint rule
          onVisibleChange?.(ev, { visible: newVisible });
        }
        return newVisible;
      });
    },
    [clearDelayTimeout, setVisibleInternal, state.onVisibleChange],
  );

  state.visible = visible;
  state.shouldRenderTooltip = visible;

  const {
    targetRef,
    containerRef,
    arrowRef,
  }: {
    targetRef: React.MutableRefObject<unknown>;
    containerRef: React.MutableRefObject<HTMLElement>;
    arrowRef: React.MutableRefObject<HTMLDivElement>;
  } = usePopper({
    enabled: state.visible,
    position: state.position,
    align: state.align,
    target: state.target,
    offset: [0, state.offset + (state.pointing ? arrowHeight : 0)],
    arrowPadding: 2 * tooltipBorderRadius,
  });

  state.ref = useMergedRefs(state.ref, containerRef);
  state.arrowRef = arrowRef;

  // When this tooltip is visible, hide any other tooltips, and register it
  // as the visibleTooltip with the TooltipContext.
  // Also add a listener on document to hide the tooltip if Escape is pressed
  useIsomorphicLayoutEffect(() => {
    if (visible) {
      const thisTooltip = { hide: () => setVisible(false) };

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
  }, [context, targetDocument, visible, setVisible]);

  // The focused element gets a blur event when the document loses focus
  // (e.g. switching tabs in the browser), but we don't want to show the
  // tooltip again when the document gets focus back. Handle this case by
  // checking if the blurred element is still the document's activeElement.
  // See https://github.com/microsoft/fluentui/issues/13541
  const ignoreNextFocusEventRef = React.useRef(false);

  // Listener for onPointerEnter and onFocus on the trigger element
  const onEnterTrigger = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      if (ev.type === 'focus' && ignoreNextFocusEventRef.current) {
        ignoreNextFocusEventRef.current = false;
        return;
      }

      // Show immediately if another tooltip is already visible
      const delay = context.visibleTooltip ? 0 : state.showDelay;

      setDelayTimeout(() => {
        setVisible(true, ev);
      }, delay);

      ev.persist(); // Persist the event since the setVisible call will happen asynchronously
    },
    [setDelayTimeout, setVisible, state.showDelay, context],
  );

  // Listener for onPointerLeave and onBlur on the trigger element
  const onLeaveTrigger = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      let delay = state.hideDelay;

      if (ev.type === 'blur') {
        // Hide immediately when losing focus
        delay = 0;

        ignoreNextFocusEventRef.current = targetDocument?.activeElement === ev.target;
      }

      setDelayTimeout(() => {
        setVisible(false, ev);
      }, delay);

      ev.persist(); // Persist the event since the setVisible call will happen asynchronously
    },
    [setDelayTimeout, setVisible, state.hideDelay, targetDocument],
  );

  // Cancel the hide timer when the pointer enters the tooltip, and restart it when the mouse leaves.
  // This keeps the tooltip visible when the pointer is moved over it.
  state.onPointerEnter = useMergedCallbacks(state.onPointerEnter, clearDelayTimeout);
  state.onPointerLeave = useMergedCallbacks(state.onPointerLeave, onLeaveTrigger);

  const child = React.isValidElement(state.children) ? state.children : undefined;

  // The props to add to the trigger element (child)
  const triggerProps: TooltipTriggerProps = {
    onPointerEnter: useMergedCallbacks(child?.props?.onPointerEnter, onEnterTrigger),
    onPointerLeave: useMergedCallbacks(child?.props?.onPointerLeave, onLeaveTrigger),
    onFocus: useMergedCallbacks(child?.props?.onFocus, onEnterTrigger),
    onBlur: useMergedCallbacks(child?.props?.onBlur, onLeaveTrigger),
  };

  // If the target prop is not provided, attach targetRef to the trigger element's ref prop
  const childTargetRef = useMergedRefs(child?.ref, targetRef);
  if (state.target === undefined) {
    triggerProps.ref = childTargetRef;
  }

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
    (state.children as React.ReactNode) = state.children(triggerProps);
  } else if (state.children) {
    (state.children as React.ReactNode) = React.cloneElement(onlyChild(state.children), triggerProps);
  }

  return state;
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
