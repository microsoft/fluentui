import * as React from 'react';
import { mergeArrowOffset, resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import {
  useTooltipVisibility_unstable as useTooltipVisibility,
  useFluent_unstable as useFluent,
} from '@fluentui/react-shared-contexts';
import {
  applyTriggerPropsToChildren,
  resolveShorthand,
  useControllableState,
  useId,
  useIsomorphicLayoutEffect,
  useIsSSR,
  useMergedRefs,
  useTimeout,
  getTriggerChild,
  mergeCallbacks,
  useEventCallback,
} from '@fluentui/react-utilities';
import type { TooltipProps, TooltipState, TooltipChildProps } from './Tooltip.types';
import { arrowHeight, tooltipBorderRadius } from './private/constants';
import { Escape } from '@fluentui/keyboard-keys';

/**
 * Create the state required to render Tooltip.
 *
 * The returned state can be modified with hooks such as useTooltipStyles_unstable,
 * before being passed to renderTooltip_unstable.
 *
 * @param props - props from this instance of Tooltip
 */
export const useTooltip_unstable = (props: TooltipProps): TooltipState => {
  const context = useTooltipVisibility();
  const isServerSideRender = useIsSSR();
  const { targetDocument } = useFluent();
  const [setDelayTimeout, clearDelayTimeout] = useTimeout();

  const {
    appearance = 'normal',
    children,
    content,
    withArrow = false,
    positioning = 'above',
    onVisibleChange,
    relationship,
    showDelay = 250,
    hideDelay = 250,
    mountNode,
  } = props;

  const [visible, setVisibleInternal] = useControllableState({ state: props.visible, initialState: false });
  const setVisible = React.useCallback(
    (newVisible: boolean, ev?: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      clearDelayTimeout();
      setVisibleInternal(oldVisible => {
        if (newVisible !== oldVisible) {
          onVisibleChange?.(ev, { visible: newVisible });
        }
        return newVisible;
      });
    },
    [clearDelayTimeout, setVisibleInternal, onVisibleChange],
  );

  const state: TooltipState = {
    withArrow,
    positioning,
    showDelay,
    hideDelay,
    relationship,
    visible,
    shouldRenderTooltip: visible,
    appearance,
    mountNode,
    // Slots
    components: {
      content: 'div',
    },
    content: resolveShorthand(content, {
      defaultProps: {
        role: 'tooltip',
      },
      required: true,
    }),
  };

  state.content.id = useId('tooltip-', state.content.id);

  const positioningOptions = {
    enabled: state.visible,
    arrowPadding: 2 * tooltipBorderRadius,
    position: 'above' as const,
    align: 'center' as const,
    offset: 4,
    ...resolvePositioningShorthand(state.positioning),
  };

  if (state.withArrow) {
    positioningOptions.offset = mergeArrowOffset(positioningOptions.offset, arrowHeight);
  }

  const {
    targetRef,
    containerRef,
    arrowRef,
  }: {
    targetRef: React.MutableRefObject<unknown>;
    containerRef: React.MutableRefObject<HTMLDivElement>;
    arrowRef: React.MutableRefObject<HTMLDivElement>;
  } = usePositioning(positioningOptions);

  state.content.ref = useMergedRefs(state.content.ref, containerRef);
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
        if (ev.key === Escape) {
          thisTooltip.hide();
          // stop propagation to avoid conflicting with other elements that listen for `Escape`
          // e,g: Dialog, Popover, Menu
          ev.stopPropagation();
        }
      };

      targetDocument?.addEventListener('keydown', onDocumentKeyDown, {
        // As this event is added at targeted document,
        // we need to capture the event to be sure keydown handling from tooltip happens first
        capture: true,
      });

      return () => {
        if (context.visibleTooltip === thisTooltip) {
          context.visibleTooltip = undefined;
        }

        targetDocument?.removeEventListener('keydown', onDocumentKeyDown, { capture: true });
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

  // Cancel the hide timer when the mouse or focus enters the tooltip, and restart it when the mouse or focus leaves.
  // This keeps the tooltip visible when the mouse is moved over it, or it has focus within.
  state.content.onPointerEnter = mergeCallbacks(state.content.onPointerEnter, clearDelayTimeout);
  state.content.onPointerLeave = mergeCallbacks(state.content.onPointerLeave, onLeaveTrigger);
  state.content.onFocus = mergeCallbacks(state.content.onFocus, clearDelayTimeout);
  state.content.onBlur = mergeCallbacks(state.content.onBlur, onLeaveTrigger);

  const child = getTriggerChild(children);

  const triggerAriaProps: Pick<TooltipChildProps, 'aria-label' | 'aria-labelledby' | 'aria-describedby'> = {};

  if (relationship === 'label') {
    // aria-label only works if the content is a string. Otherwise, need to use aria-labelledby.
    if (typeof state.content.children === 'string') {
      triggerAriaProps['aria-label'] = state.content.children;
    } else {
      triggerAriaProps['aria-labelledby'] = state.content.id;
      // Always render the tooltip even if hidden, so that aria-labelledby refers to a valid element
      state.shouldRenderTooltip = true;
    }
  } else if (relationship === 'description') {
    triggerAriaProps['aria-describedby'] = state.content.id;
    // Always render the tooltip even if hidden, so that aria-describedby refers to a valid element
    state.shouldRenderTooltip = true;
  }

  // Don't render the Tooltip in SSR to avoid hydration errors
  if (isServerSideRender) {
    state.shouldRenderTooltip = false;
  }

  const childTargetRef = useMergedRefs(child?.ref, targetRef);

  // Apply the trigger props to the child, either by calling the render function, or cloning with the new props
  state.children = applyTriggerPropsToChildren(children, {
    ...triggerAriaProps,
    ...child?.props,
    // If the target prop is not provided, attach targetRef to the trigger element's ref prop
    ref: positioningOptions.target === undefined ? childTargetRef : child?.ref,
    onPointerEnter: useEventCallback(mergeCallbacks(child?.props?.onPointerEnter, onEnterTrigger)),
    onPointerLeave: useEventCallback(mergeCallbacks(child?.props?.onPointerLeave, onLeaveTrigger)),
    onFocus: useEventCallback(mergeCallbacks(child?.props?.onFocus, onEnterTrigger)),
    onBlur: useEventCallback(mergeCallbacks(child?.props?.onBlur, onLeaveTrigger)),
  });

  return state;
};
