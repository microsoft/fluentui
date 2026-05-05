'use client';

import * as React from 'react';
import {
  applyTriggerPropsToChildren,
  getReactElementRef,
  getTriggerChild,
  mergeCallbacks,
  slot,
  useControllableState,
  useEventCallback,
  useId,
  useIsomorphicLayoutEffect,
  useIsSSR,
  useMergedRefs,
  useTimeout,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { KeyborgFocusInEvent } from '@fluentui/react-tabster';
import { KEYBORG_FOCUSIN, useIsNavigatingWithKeyboard } from '@fluentui/react-tabster';

import type { OnVisibleChangeData, TooltipProps, TooltipState, TooltipTriggerProps } from './Tooltip.types';
import { resolvePositioningShorthand, usePositioning } from '../../positioning';

/**
 * Create the state required to render Tooltip.
 *
 * @param props - props from this instance of Tooltip
 */
export const useTooltip = (props: TooltipProps): TooltipState => {
  'use no memo';

  const isServerSideRender = useIsSSR();
  const { targetDocument } = useFluent();

  const [visible, setVisibleInternal] = useControllableState({ state: props.visible, initialState: false });

  const {
    children,
    content,
    positioning = 'above',
    withArrow = false,
    onVisibleChange,
    relationship,
    showDelay = 250,
    hideDelay = 250,
  } = props;

  const state: TooltipState = {
    positioning,
    showDelay,
    hideDelay,
    relationship,
    visible,
    shouldRenderTooltip: visible,
    withArrow,
    // Slots
    components: {
      content: 'div',
    },
    content: slot.always(content, {
      defaultProps: {
        role: 'tooltip',
        popover: 'hint',
      },
      elementType: 'div',
    }),
  };

  const positioningOptions = resolvePositioningShorthand(positioning);
  const { targetRef, containerRef } = usePositioning(positioningOptions);

  state.content.id = useId('tooltip-', state.content.id);

  const contentRef = useMergedRefs(state.content.ref, containerRef);
  state.content.ref = contentRef;

  const [setDelayTimeout, clearDelayTimeout] = useTimeout();

  const setVisible = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement> | undefined, data: OnVisibleChangeData) => {
      clearDelayTimeout();
      setVisibleInternal(oldVisible => {
        if (data.visible !== oldVisible) {
          onVisibleChange?.(ev, data);
        }
        return data.visible;
      });
    },
    [clearDelayTimeout, setVisibleInternal, onVisibleChange],
  );

  const onToggle = useEventCallback((event: Event) => {
    if ((event as ToggleEvent).newState === 'closed') {
      setVisible(undefined, { visible: false });
    }
  });

  // Keep the tooltip in sync with the state when it is changed programmatically.
  // Also sync React state when the browser auto-dismisses the hint popover (click outside, Escape).
  useIsomorphicLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) {
      return;
    }

    el.addEventListener('toggle', onToggle);

    try {
      if (visible) {
        el.showPopover();
      } else if (el.matches(':popover-open')) {
        el.hidePopover();
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          [
            'Popover API is not supported in this browser, and the tooltip will not work correctly.',
            'Please include a popover polyfill for better browser support.',
          ].join(' '),
          { error },
        );
      }
    }

    return () => {
      el.removeEventListener('toggle', onToggle);
    };
  }, [contentRef, visible, setVisible]);

  // Used to skip showing the tooltip  in certain situations when the trigger is focused.
  // See comments where this is set for more info.
  const ignoreNextFocusEventRef = React.useRef(false);

  // Listener for onPointerEnter and onFocus on the trigger element
  const onEnterTrigger = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      if (ev.type === 'focus' && ignoreNextFocusEventRef.current) {
        ignoreNextFocusEventRef.current = false;
        return;
      }

      setDelayTimeout(() => {
        setVisible(ev, { visible: true });
      }, state.showDelay);

      ev.persist(); // Persist the event since the setVisible call will happen asynchronously
    },
    [setDelayTimeout, setVisible, state.showDelay],
  );

  const isNavigatingWithKeyboard = useIsNavigatingWithKeyboard();

  // Callback ref that attaches a keyborg:focusin event listener.
  const [keyborgListenerCallbackRef] = React.useState(() => {
    const onKeyborgFocusIn = ((ev: KeyborgFocusInEvent) => {
      // Skip showing the tooltip if focus moved programmatically.
      // For example, we don't want to show the tooltip when a dialog is closed
      // and Tabster programmatically restores focus to the trigger button.
      // See https://github.com/microsoft/fluentui/issues/27576
      if (ev.detail?.isFocusedProgrammatically && !isNavigatingWithKeyboard()) {
        ignoreNextFocusEventRef.current = true;
      }
    }) as EventListener;

    // Save the current element to remove the listener when the ref changes
    let current: Element | null = null;

    // Callback ref that attaches the listener to the element
    return (element: Element | null) => {
      current?.removeEventListener(KEYBORG_FOCUSIN, onKeyborgFocusIn);
      element?.addEventListener(KEYBORG_FOCUSIN, onKeyborgFocusIn);
      current = element;
    };
  });

  // Listener for onPointerLeave and onBlur on the trigger element
  const onLeaveTrigger = React.useCallback(
    (ev: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      let delay = state.hideDelay;

      if (ev.type === 'blur') {
        // Hide immediately when losing focus
        delay = 0;

        // The focused element gets a blur event when the document loses focus
        // (e.g. switching tabs in the browser), but we don't want to show the
        // tooltip again when the document gets focus back. Handle this case by
        // checking if the blurred element is still the document's activeElement.
        // See https://github.com/microsoft/fluentui/issues/13541
        ignoreNextFocusEventRef.current = targetDocument?.activeElement === ev.target;
      }

      setDelayTimeout(() => {
        setVisible(ev, { visible: false });
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

  const triggerAriaProps: Pick<TooltipTriggerProps, 'aria-label' | 'aria-labelledby' | 'aria-describedby'> = {};
  const isPopupExpanded =
    child?.props?.['aria-haspopup'] &&
    (child?.props?.['aria-expanded'] === true || child?.props?.['aria-expanded'] === 'true');

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

  // Case 1: Don't render the Tooltip in SSR to avoid hydration errors
  // Case 2: Don't render the Tooltip, if it triggers Menu or another popup and it's already opened
  if (isServerSideRender || isPopupExpanded) {
    state.shouldRenderTooltip = false;
  }

  // Apply the trigger props to the child, either by calling the render function, or cloning with the new props
  state.children = applyTriggerPropsToChildren(children, {
    ...triggerAriaProps,
    ...child?.props,
    ref: useMergedRefs(
      getReactElementRef<HTMLButtonElement>(child),
      keyborgListenerCallbackRef,
      // If the target prop is not provided, attach targetRef to the trigger element's ref prop
      positioningOptions.target === undefined ? targetRef : undefined,
    ),
    onPointerEnter: useEventCallback(mergeCallbacks(child?.props?.onPointerEnter, onEnterTrigger)),
    onPointerLeave: useEventCallback(mergeCallbacks(child?.props?.onPointerLeave, onLeaveTrigger)),
    onFocus: useEventCallback(mergeCallbacks(child?.props?.onFocus, onEnterTrigger)),
    onBlur: useEventCallback(mergeCallbacks(child?.props?.onBlur, onLeaveTrigger)),
  });

  return state;
};
