'use client';

import * as React from 'react';
import { useControllableState, useEventCallback, useTimeout } from '@fluentui/react-utilities';
import { usePositioning, resolvePositioningShorthand } from '../../hooks';
import type { PopoverProps, PopoverState, PopoverContextValue, OpenPopoverEvents } from './Popover.types';

const SUPPORTS_POPOVER_OPEN_SELECTOR =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:popover-open)');

type ToggleEventLike = Event & { newState?: 'open' | 'closed' };

/**
 * Returns the state for a Popover component.
 *
 * The surface is rendered with `popover="auto"` so the browser owns light
 * dismiss (Escape, click-outside, popover-stack peer dismissal). React
 * mirrors the surface's `toggle` events back into state and fires
 * `onOpenChange`, so controlled consumers stay in sync with what the
 * browser does.
 *
 * Open paths (click, hover, context-menu, programmatic `open`) still flow
 * through React. Close paths defer to the browser.
 */
export const usePopover = (props: PopoverProps): PopoverState => {
  const {
    openOnHover = false,
    openOnContext = false,
    mouseLeaveDelay = 500,
    withArrow = false,
    disableAutoFocus = false,
    inline = false,
    mountNode,
  } = props;

  const [open, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const [contextTarget, setContextTarget] = React.useState<{ x: number; y: number } | undefined>(undefined);

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

  // Skip the no-op transition the browser fires for our own `showPopover()`
  // call (newState='open' while React already has `open=true`).
  const onSurfaceToggle = useEventCallback((event: Event) => {
    const toggle = event as ToggleEventLike;
    const nextOpen = toggle.newState === 'open';
    if (nextOpen === open) {
      return;
    }
    setOpenState(nextOpen);
    props.onOpenChange?.(event, { event, type: event.type, open: nextOpen });
  });

  // The surface is unmounted while closed (`state.open ? popoverSurface : null`),
  // so this effect must re-run when `open` flips to attach `showPopover()`
  // and the `toggle` listener to the freshly-mounted surface element.
  React.useEffect(() => {
    const surface = contentRef.current;

    if (!surface || inline || !open) {
      return;
    }

    if (typeof surface.showPopover !== 'function') {
      return;
    }

    if (!surface.hasAttribute('popover') || surface.getAttribute('popover') !== 'auto') {
      surface.setAttribute('popover', 'auto');
    }

    if (!(SUPPORTS_POPOVER_OPEN_SELECTOR && surface.matches(':popover-open'))) {
      surface.showPopover();
    }

    surface.addEventListener('toggle', onSurfaceToggle);
    return () => surface.removeEventListener('toggle', onSurfaceToggle);
  }, [open, inline, contentRef, onSurfaceToggle]);

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
  };
};

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
      positioning: {
        targetRef: positioning.targetRef,
        containerRef: positioning.containerRef,
      },
    },
  };
};
