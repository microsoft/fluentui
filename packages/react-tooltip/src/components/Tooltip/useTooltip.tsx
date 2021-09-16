import * as React from 'react';
import { mergeArrowOffset, resolvePositioningShorthand, usePopper } from '@fluentui/react-positioning';
import { TooltipContext, useFluent } from '@fluentui/react-shared-contexts';
import {
  getNativeElementProps,
  onlyChild,
  useControllableState,
  useId,
  useIsomorphicLayoutEffect,
  useIsSSR,
  useMergedRefs,
  useTimeout,
} from '@fluentui/react-utilities';
import type { TooltipProps, TooltipState, TooltipTriggerProps } from './Tooltip.types';

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
export const useTooltip = (props: TooltipProps, ref: React.Ref<HTMLDivElement>): TooltipState => {
  const context = React.useContext(TooltipContext);
  const isServerSideRender = useIsSSR();
  const { targetDocument } = useFluent();
  const [setDelayTimeout, clearDelayTimeout] = useTimeout();

  const {
    content,
    inverted,
    pointing,
    positioning,
    onVisibleChange,
    triggerAriaAttribute = 'label',
    showDelay = 250,
    hideDelay = 250,
  } = props;

  const [visible, setVisibleInternal] = useControllableState({ state: props.visible, initialState: false });
  const setVisible = React.useCallback(
    (newVisible: boolean, ev?: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      clearDelayTimeout();
      setVisibleInternal(oldVisible => {
        if (newVisible !== oldVisible) {
          onVisibleChange?.(ev || null, { visible: newVisible });
        }
        return newVisible;
      });
    },
    [clearDelayTimeout, setVisibleInternal, onVisibleChange],
  );

  const state: TooltipState = {
    content,
    inverted,
    pointing,
    positioning,
    showDelay,
    hideDelay,
    triggerAriaAttribute,
    visible,
    shouldRenderTooltip: visible,

    // Slots
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      role: 'tooltip',
      ...props,
      ref,
      id: useId('tooltip-', props.id),
    }),
  };

  const popperOptions = {
    enabled: state.visible,
    arrowPadding: 2 * tooltipBorderRadius,
    position: 'above' as const,
    align: 'center' as const,
    offset: [0, 4] as [number, number],
    ...resolvePositioningShorthand(state.positioning),
  };

  if (state.pointing) {
    popperOptions.offset = mergeArrowOffset(popperOptions.offset, arrowHeight);
  }

  const {
    targetRef,
    containerRef,
    arrowRef,
  }: {
    targetRef: React.MutableRefObject<unknown>;
    containerRef: React.MutableRefObject<HTMLDivElement>;
    arrowRef: React.MutableRefObject<HTMLDivElement>;
  } = usePopper(popperOptions);

  state.root.ref = useMergedRefs(state.root.ref, containerRef);
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
  state.root.onPointerEnter = useMergedCallbacks(state.root.onPointerEnter, clearDelayTimeout);
  state.root.onPointerLeave = useMergedCallbacks(state.root.onPointerLeave, onLeaveTrigger);

  const child = React.isValidElement(state.root.children) ? state.root.children : undefined;

  // The props to add to the trigger element (child)
  const triggerProps: TooltipTriggerProps = {
    onPointerEnter: useMergedCallbacks(child?.props?.onPointerEnter, onEnterTrigger),
    onPointerLeave: useMergedCallbacks(child?.props?.onPointerLeave, onLeaveTrigger),
    onFocus: useMergedCallbacks(child?.props?.onFocus, onEnterTrigger),
    onBlur: useMergedCallbacks(child?.props?.onBlur, onLeaveTrigger),
  };

  // If the target prop is not provided, attach targetRef to the trigger element's ref prop
  const childTargetRef = useMergedRefs(child?.ref, targetRef);
  if (popperOptions.target === undefined) {
    triggerProps.ref = childTargetRef;
  }

  if (state.triggerAriaAttribute === 'label') {
    // aria-label only works if the content is a string. Otherwise, need to use labelledby.
    if (typeof state.content === 'string') {
      triggerProps['aria-label'] = state.content;
    } else {
      state.triggerAriaAttribute = 'labelledby';
    }
  }

  if (state.triggerAriaAttribute === 'labelledby' && !isServerSideRender) {
    triggerProps['aria-labelledby'] = state.root.id;
    // Always render the tooltip even if hidden, so that aria-labelledby refers to a valid element
    state.shouldRenderTooltip = true;
  } else if (state.triggerAriaAttribute === 'describedby' && !isServerSideRender) {
    triggerProps['aria-describedby'] = state.root.id;
    state.shouldRenderTooltip = true;
  }

  // Apply the trigger props to the child, either by calling the render function, or cloning with the new props
  if (typeof state.root.children === 'function') {
    (state.root.children as React.ReactNode) = state.root.children(triggerProps);
  } else if (state.root.children) {
    (state.root.children as React.ReactNode) = React.cloneElement(onlyChild(state.root.children), triggerProps);
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
