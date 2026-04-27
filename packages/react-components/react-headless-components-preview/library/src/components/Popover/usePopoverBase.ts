'use client';

import * as React from 'react';
import { useControllableState, useEventCallback, useTimeout } from '@fluentui/react-utilities';
import { usePositioning, resolvePositioningShorthand } from '../../hooks';
import type { PopoverProps, PopoverState, PopoverContextValue, OpenPopoverEvents, PopoverType } from './Popover.types';

/**
 * Mode-agnostic Popover state. Shared by `usePopover` (manual) and
 * `usePopoverAuto` (auto). Holds open state, refs, positioning, the merged
 * `setOpen` / `toggleOpen` callbacks, and the parsed trigger / surface
 * children. Each mode hook layers its own dismiss / show-popover effects on
 * top.
 */
export type PopoverBase = Omit<PopoverState, 'popoverType'> & {
  setOpenState: (open: boolean) => void;
  closeOnScroll: boolean;
  closeOnIframeFocus: boolean;
};

export function usePopoverBase(props: PopoverProps): PopoverBase {
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
    setOpenState,
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
    closeOnScroll,
    closeOnIframeFocus,
  };
}

/**
 * Common feature-detect for `:popover-open` selector support — used by both
 * mode hooks to avoid double-calling `showPopover()` on an already-open
 * surface.
 */
export const SUPPORTS_POPOVER_OPEN_SELECTOR =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:popover-open)');

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

/**
 * Helper used by both mode hooks: writes `popover="<mode>"` on the surface
 * if missing or different, and calls `showPopover()` unless the surface is
 * already in the open state. No-op when the platform lacks the HTML Popover
 * API.
 */
export function ensureNativePopoverShown(surface: HTMLElement, popoverType: PopoverType): void {
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
}
