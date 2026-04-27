'use client';

import * as React from 'react';
import {
  useControllableState,
  useEventCallback,
  useOnClickOutside,
  useOnScrollOutside,
  elementContains,
  useTimeout,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { usePositioning, resolvePositioningShorthand } from '../../hooks';
import type { PopoverProps, PopoverState, PopoverContextValue, OpenPopoverEvents, PopoverType } from './Popover.types';

const SUPPORTS_POPOVER_OPEN_SELECTOR =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:popover-open)');

type ToggleEventLike = Event & { newState?: 'open' | 'closed' };

function useInternalPopover(props: PopoverProps, popoverType: PopoverType): PopoverState {
  const {
    openOnHover = false,
    openOnContext = false,
    mouseLeaveDelay = 500,
    withArrow = false,
    disableAutoFocus = false,
    closeOnScroll = false,
    closeOnIframeFocus = true,
    inline = false,
    mountNode,
  } = props;

  const [open, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const [contextTarget, setContextTarget] = React.useState<{ x: number; y: number } | undefined>(undefined);
  const { targetDocument } = useFluent();

  const onOpenChange = useEventCallback((e: OpenPopoverEvents, shouldOpen: boolean) => {
    props.onOpenChange?.(e, { event: e, type: e.type, open: shouldOpen });
  });

  const [setOpenTimeout, clearOpenTimeout] = useTimeout();

  const setOpen = useEventCallback((e: OpenPopoverEvents, shouldOpen: boolean) => {
    clearOpenTimeout();

    if (shouldOpen && e.type === 'contextmenu') {
      const mouseEvent = e as React.MouseEvent<HTMLElement>;
      setContextTarget({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    }

    if (!shouldOpen) {
      setContextTarget(undefined);
    }

    if (e.type === 'mouseleave') {
      setOpenTimeout(() => {
        setOpenState(shouldOpen);
        onOpenChange(e, shouldOpen);
      }, mouseLeaveDelay);
    } else {
      setOpenState(shouldOpen);
      onOpenChange(e, shouldOpen);
    }
  });

  const toggleOpen = React.useCallback(
    (e: OpenPopoverEvents) => {
      setOpen(e, !open);
    },
    [setOpen, open],
  );

  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLElement>(null);
  const arrowRef = React.useRef<HTMLDivElement>(null);

  const positioning = usePositioning(resolvePositioningShorthand(props.positioning));

  // In `auto` mode the browser owns light dismiss (click-outside, scroll, Escape)
  // and emits `toggle` events we mirror back into React state.
  const isAutoMode = popoverType === 'auto' && !inline;

  useOnClickOutside({
    contains: elementContains,
    element: targetDocument,
    callback: ev => setOpen(ev, false),
    refs: [triggerRef, contentRef],
    disabled: !open || isAutoMode,
    disabledFocusOnIframe: !closeOnIframeFocus,
  });

  useOnScrollOutside({
    contains: elementContains,
    element: targetDocument,
    callback: ev => setOpen(ev, false),
    refs: [triggerRef, contentRef],
    disabled: !open || !(openOnContext || closeOnScroll) || isAutoMode,
  });

  React.useEffect(() => {
    const surface = contentRef.current;

    if (!surface || inline || !open) {
      return;
    }

    if (typeof surface.showPopover !== 'function') {
      return;
    }

    if (!surface.hasAttribute('popover') || surface.getAttribute('popover') !== popoverType) {
      surface.setAttribute('popover', popoverType);
    }

    if (SUPPORTS_POPOVER_OPEN_SELECTOR && surface.matches(':popover-open')) {
      return;
    }

    surface.showPopover();
  }, [open, inline, popoverType]);

  // Mirror the browser-driven toggle events into React state when in auto mode.
  // Covers Escape, click-outside, and the popover-stack dismissal that happens
  // when an unrelated `popover="auto"` opens.
  const onSurfaceToggle = useEventCallback((event: Event) => {
    const toggle = event as ToggleEventLike;
    const nextOpen = toggle.newState === 'open';
    setOpenState(nextOpen);
    props.onOpenChange?.(event, { event, type: event.type, open: nextOpen });
  });

  React.useEffect(() => {
    if (!isAutoMode) {
      return;
    }
    const surface = contentRef.current;
    if (!surface) {
      return;
    }
    surface.addEventListener('toggle', onSurfaceToggle);
    return () => surface.removeEventListener('toggle', onSurfaceToggle);
  }, [isAutoMode, onSurfaceToggle]);

  const children = React.Children.toArray(props.children) as React.ReactElement[];

  if (process.env.NODE_ENV !== 'production') {
    if (children.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('Popover must contain at least one child');
    }

    if (children.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('Popover must contain at most two children');
    }
  }

  let popoverTrigger: React.ReactElement | undefined;
  let popoverSurface: React.ReactElement | undefined;

  if (children.length === 2) {
    popoverTrigger = children[0];
    popoverSurface = children[1];
  } else if (children.length === 1) {
    popoverSurface = children[0];
  }

  return {
    open,
    setOpen,
    toggleOpen,
    triggerRef,
    contentRef,
    arrowRef,
    popoverTrigger,
    popoverSurface,
    openOnHover,
    openOnContext,
    withArrow,
    disableAutoFocus,
    inline,
    mountNode,
    onOpenChange: props.onOpenChange,
    contextTarget,
    setContextTarget,
    positioning,
    popoverType,
  };
}

/**
 * Returns the state for a Popover component.
 *
 * Renders the surface with `popover="manual"`, leaving dismiss behaviour
 * (click-outside, scroll, Escape) under React's control.
 */
export const usePopover = (props: PopoverProps, _ref: React.Ref<HTMLElement>): PopoverState =>
  useInternalPopover(props, 'manual');

/**
 * Returns the state for a PopoverAuto component.
 *
 * Renders the surface with `popover="auto"`, deferring light-dismiss
 * (Escape, click-outside, popover-stack peer dismissal) to the browser.
 * Browser `toggle` events are mirrored back into React state and
 * `onOpenChange`. The library's own dismiss hooks are disabled.
 */
export const usePopoverAuto = (props: PopoverProps, _ref: React.Ref<HTMLElement>): PopoverState =>
  useInternalPopover(props, 'auto');

export const usePopoverContextValues = (state: PopoverState): { popover: PopoverContextValue } => {
  const {
    open,
    setOpen,
    toggleOpen,
    triggerRef,
    contentRef,
    arrowRef,
    openOnHover,
    openOnContext,
    disableAutoFocus,
    withArrow,
    inline,
    mountNode,
    positioning,
    popoverType,
  } = state;

  return {
    popover: {
      open,
      setOpen,
      toggleOpen,
      triggerRef,
      contentRef,
      arrowRef,
      openOnHover,
      openOnContext,
      disableAutoFocus,
      withArrow,
      inline,
      mountNode,
      popoverType,
      positioning: {
        targetRef: positioning.targetRef,
        containerRef: positioning.containerRef,
      },
    },
  };
};
