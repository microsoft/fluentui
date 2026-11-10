'use client';

import * as React from 'react';
import { mergeArrowOffset, resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import type { PositioningProps } from '@fluentui/react-positioning';
import {
  useTooltipVisibility_unstable as useTooltipVisibility,
  useFluent_unstable as useFluent,
} from '@fluentui/react-shared-contexts';
import type { KeyborgFocusInEvent } from '@fluentui/react-tabster';
import { KEYBORG_FOCUSIN, useIsNavigatingWithKeyboard } from '@fluentui/react-tabster';
import {
  applyTriggerPropsToChildren,
  useControllableState,
  useId,
  useIsomorphicLayoutEffect,
  useIsSSR,
  useMergedRefs,
  getTriggerChild,
  mergeCallbacks,
  useEventCallback,
  slot,
  getReactElementRef,
  isHTMLElement,
} from '@fluentui/react-utilities';
import type { TooltipBaseProps, TooltipBaseState, TooltipChildProps, OnVisibleChangeData } from './Tooltip.types';
import { arrowHeight, tooltipBorderRadius } from './private/constants';
import { useTooltipTimeout } from './private/useTooltipTimeout';
import { Escape } from '@fluentui/keyboard-keys';

type OnPositioningEndEvent = Parameters<Exclude<PositioningProps['onPositioningEnd'], undefined>>[0];

/**
 * Create the state required to render Tooltip.
 *
 * The returned state can be modified with hooks such as useTooltipStyles_unstable,
 * before being passed to renderTooltip_unstable.
 *
 * @param props - props from this instance of Tooltip
 */
export const useTooltipBase_unstable = (props: TooltipBaseProps): TooltipBaseState => {
  const context = useTooltipVisibility();
  const isServerSideRender = useIsSSR();
  const { targetDocument } = useFluent();

  const [visible, setVisibleInternal] = useControllableState({ state: props.visible, initialState: false });
  const [hidden, setHidden] = React.useState(false);

  const {
    children,
    content,
    secondaryContent,
    withArrow = false,
    positioning = 'above',
    onVisibleChange,
    relationship,
    showDelay = 250,
    hideDelay = 250,
    mountNode,
  } = props;

  const child = getTriggerChild(children);
  const isPopupExpanded =
    child?.props?.['aria-haspopup'] &&
    (child?.props?.['aria-expanded'] === true || child?.props?.['aria-expanded'] === 'true');
  const secondaryContentSlot = slot.optional(secondaryContent, { elementType: 'span' });
  const renderedVisible = visible && !(secondaryContentSlot && isPopupExpanded);

  const state: TooltipBaseState = {
    withArrow,
    positioning,
    showDelay,
    hideDelay,
    relationship,
    visible: renderedVisible,
    hidden,
    shouldRenderTooltip: renderedVisible,
    mountNode,
    // Slots
    components: {
      content: 'div',
      secondaryContent: 'span',
    },
    content: slot.always(content, {
      defaultProps: {
        role: 'tooltip',
      },
      elementType: 'div',
    }),
    secondaryContent: secondaryContentSlot,
  };

  state.content.id = useId('tooltip-', state.content.id);

  const resolvedPositioning = resolvePositioningShorthand(state.positioning);
  const isVirtualTarget = resolvedPositioning.target !== undefined && !isHTMLElement(resolvedPositioning.target);
  const onPositioningEnd = useEventCallback((event: OnPositioningEndEvent) => {
    // Portaled tooltips can escape the trigger's clipping ancestors while the trigger is still visible.
    // Virtual targets can be reported as hidden based on synthetic geometry.
    setHidden(!isVirtualTarget && event.detail.referenceHidden);
    resolvedPositioning.onPositioningEnd?.(event);
  });

  const positioningOptions = {
    enabled: state.visible,
    arrowPadding: 2 * tooltipBorderRadius,
    position: 'above' as const,
    align: 'center' as const,
    offset: 4,
    ...resolvedPositioning,
    onPositioningEnd,
  };

  if (state.withArrow) {
    positioningOptions.offset = mergeArrowOffset(positioningOptions.offset, arrowHeight);
  }

  const {
    targetRef,
    containerRef,
    arrowRef,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    targetRef: React.MutableRefObject<unknown>;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    containerRef: React.MutableRefObject<HTMLDivElement>;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    arrowRef: React.MutableRefObject<HTMLDivElement>;
  } = usePositioning(positioningOptions);

  const [setDelayTimeout, clearDelayTimeout] = useTooltipTimeout(containerRef);

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

  state.content.ref = useMergedRefs(state.content.ref, containerRef);
  state.arrowRef = arrowRef;

  // When this tooltip is visible, hide any other tooltips, and register it
  // as the visibleTooltip with the TooltipContext.
  // Also add a listener on document to hide the tooltip if Escape is pressed
  useIsomorphicLayoutEffect(() => {
    if (renderedVisible) {
      const thisTooltip = {
        hide: (ev?: KeyboardEvent) => setVisible(undefined, { visible: false, documentKeyboardEvent: ev }),
      };

      context.visibleTooltip?.hide();
      // eslint-disable-next-line react-hooks/immutability
      context.visibleTooltip = thisTooltip;

      const onDocumentKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === Escape && !ev.defaultPrevented) {
          thisTooltip.hide(ev);
          // stop propagation to avoid conflicting with other elements that listen for `Escape`
          // e,g: Dialog, Popover, Menu and Tooltip
          ev.preventDefault();
        }
      };

      targetDocument?.addEventListener('keydown', onDocumentKeyDown, {
        // As this event is added at targeted document,
        // we need to capture the event to be sure keydown handling from tooltip happens first
        capture: true,
      });

      // Dismiss the tooltip when the document becomes hidden (e.g. tab backgrounded,
      // app switched on mobile). The original trigger (hover/tap/focus) is no longer
      // active in this case, so persisting the tooltip is a stale UI state.
      const onDocumentVisibilityChange = () => {
        if (targetDocument?.visibilityState === 'hidden') {
          thisTooltip.hide();
        }
      };

      targetDocument?.addEventListener('visibilitychange', onDocumentVisibilityChange);

      return () => {
        if (context.visibleTooltip === thisTooltip) {
          context.visibleTooltip = undefined;
        }

        targetDocument?.removeEventListener('keydown', onDocumentKeyDown, { capture: true });
        targetDocument?.removeEventListener('visibilitychange', onDocumentVisibilityChange);
      };
    }
  }, [context, targetDocument, renderedVisible, setVisible]);

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

      // Show immediately if another tooltip is already visible
      const delay = context.visibleTooltip ? 0 : showDelay;

      setDelayTimeout(() => {
        setVisible(ev, { visible: true });
      }, delay);

      ev.persist(); // Persist the event since the setVisible call will happen asynchronously
    },
    [setDelayTimeout, setVisible, showDelay, context],
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
      let delay = hideDelay;

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
    [setDelayTimeout, setVisible, hideDelay, targetDocument],
  );

  // Cancel the hide timer when the mouse or focus enters the tooltip, and restart it when the mouse or focus leaves.
  // This keeps the tooltip visible when the mouse is moved over it, or it has focus within.
  // eslint-disable-next-line react-hooks/immutability
  state.content.onPointerEnter = mergeCallbacks(state.content.onPointerEnter, clearDelayTimeout);
  // eslint-disable-next-line react-hooks/immutability, react-hooks/refs
  state.content.onPointerLeave = mergeCallbacks(state.content.onPointerLeave, onLeaveTrigger);
  // eslint-disable-next-line react-hooks/immutability
  state.content.onFocus = mergeCallbacks(state.content.onFocus, clearDelayTimeout);
  // eslint-disable-next-line react-hooks/immutability, react-hooks/refs
  state.content.onBlur = mergeCallbacks(state.content.onBlur, onLeaveTrigger);

  const triggerAriaProps: Pick<TooltipChildProps, 'aria-label' | 'aria-labelledby' | 'aria-describedby'> = {};

  if (relationship === 'label') {
    // Use rendered secondary content for native naming semantics, with a string fallback during SSR.
    if (typeof state.content.children === 'string' && (!state.secondaryContent || isServerSideRender)) {
      const secondaryText = state.secondaryContent?.children;
      const secondaryHidden = state.secondaryContent?.['aria-hidden'];
      triggerAriaProps['aria-label'] =
        typeof secondaryText === 'string' && secondaryHidden !== true && secondaryHidden !== 'true'
          ? `${state.content.children} ${secondaryText}`
          : state.content.children;
    } else if (
      !state.secondaryContent ||
      (child?.props?.['aria-label'] === undefined && child?.props?.['aria-labelledby'] === undefined)
    ) {
      triggerAriaProps['aria-labelledby'] = state.content.id;
      // Always render the tooltip even if hidden, so that aria-labelledby refers to a valid element
      // eslint-disable-next-line react-hooks/immutability
      state.shouldRenderTooltip = true;
    }
  } else if (relationship === 'description') {
    triggerAriaProps['aria-describedby'] = state.content.id;
    // Always render the tooltip even if hidden, so that aria-describedby refers to a valid element
    // eslint-disable-next-line react-hooks/immutability
    state.shouldRenderTooltip = true;
  }

  // Case 1: Don't render the Tooltip in SSR to avoid hydration errors
  // Case 2: Preserve existing popup rendering without the secondary slot.
  if (isServerSideRender || (isPopupExpanded && !state.secondaryContent)) {
    // eslint-disable-next-line react-hooks/immutability
    state.shouldRenderTooltip = false;
  }

  // Apply the trigger props to the child, either by calling the render function, or cloning with the new props
  // eslint-disable-next-line react-hooks/immutability
  state.children = applyTriggerPropsToChildren(children, {
    ...triggerAriaProps,
    ...child?.props,
    ref: useMergedRefs(
      getReactElementRef<HTMLButtonElement>(child),
      keyborgListenerCallbackRef,
      // If the target prop is not provided, attach targetRef to the trigger element's ref prop
      positioningOptions.target === undefined ? targetRef : undefined,
    ),
    // eslint-disable-next-line react-hooks/refs
    onPointerEnter: useEventCallback(mergeCallbacks(child?.props?.onPointerEnter, onEnterTrigger)),
    // eslint-disable-next-line react-hooks/refs
    onPointerLeave: useEventCallback(mergeCallbacks(child?.props?.onPointerLeave, onLeaveTrigger)),
    // eslint-disable-next-line react-hooks/refs
    onFocus: useEventCallback(mergeCallbacks(child?.props?.onFocus, onEnterTrigger)),
    // eslint-disable-next-line react-hooks/refs
    onBlur: useEventCallback(mergeCallbacks(child?.props?.onBlur, onLeaveTrigger)),
  });

  // Render functions can author a label only after receiving the default trigger props.
  if (typeof children === 'function' && state.secondaryContent && relationship === 'label') {
    const resolvedChild = getTriggerChild<TooltipChildProps>(state.children);
    if (
      triggerAriaProps['aria-labelledby'] !== undefined &&
      resolvedChild?.props['aria-label'] !== undefined &&
      resolvedChild.props['aria-labelledby'] === triggerAriaProps['aria-labelledby']
    ) {
      state.children = applyTriggerPropsToChildren(state.children, {
        ...resolvedChild.props,
        'aria-labelledby': undefined,
      });
      const describesTrigger =
        resolvedChild.props['aria-describedby']?.split(/\s+/).includes(state.content.id) ?? false;
      state.shouldRenderTooltip = !isServerSideRender && (state.visible || describesTrigger);
    }
  }

  return state;
};
