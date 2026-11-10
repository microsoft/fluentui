'use client';

import * as React from 'react';
import {
  useControllableState,
  useEventCallback,
  useId,
  useIsomorphicLayoutEffect,
  useTimeout,
} from '@fluentui/react-utilities';
import { usePositioning, resolvePositioningShorthand } from '../../hooks';
import { useDialogLayerOpenState } from '../../hooks/top-layer';
import { isDialogElement, isInTopLayer, isModal } from '../../hooks/top-layer/utils';
import type { PopoverProps, PopoverState, PopoverContextValues, OpenPopoverEvents } from './Popover.types';

/**
 * Returns the state for a Popover component.
 */
export const usePopover = (props: PopoverProps): PopoverState => {
  const {
    openOnHover = false,
    openOnContext = false,
    mouseLeaveDelay = 500,
    withArrow = false,
    inertTrapFocus = false,
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

  const generatedSurfaceId = useId('fui-popover-surface-');
  const surfaceId = props.id ?? generatedSurfaceId;

  const positioning = usePositioning(resolvePositioningShorthand(props.positioning));

  // The native event that ends the current opening, until it fires: `close()` and `hidePopover()` queue it.
  const pendingCloseEvent = React.useRef<{ element: HTMLElement; type: 'close' | 'toggle' } | null>(null);

  const onNativeOpenChange = useEventCallback((event: Event | React.SyntheticEvent, shouldOpen: boolean) => {
    if (!shouldOpen) {
      // The browser closed it, so its close event has already fired.
      pendingCloseEvent.current = null;
    }
    setOpenState(shouldOpen);
    props.onOpenChange?.(event, { event, type: event.type, open: shouldOpen });
  });

  // Turning `inertTrapFocus` off while open applies on the next open, so the surface keeps its modal semantics until then.
  const [modalWhileOpen, setModalWhileOpen] = React.useState(open && inertTrapFocus);
  if (open && inertTrapFocus && !modalWhileOpen) {
    setModalWhileOpen(true);
  } else if (!open && modalWhileOpen) {
    setModalWhileOpen(false);
  }
  const modal = inertTrapFocus || modalWhileOpen;

  useDialogLayerOpenState(contentRef, {
    open,
    mode: modal ? 'modal' : 'auto',
    onOpenChange: (nextOpen, { event }) => onNativeOpenChange(event, nextOpen),
    // Back to the trigger when focus was inside as the surface started closing.
    returnFocus: { target: triggerRef },
  });

  // The surface stays mounted until it has left the top layer.
  const [surfaceShown, setSurfaceShown] = React.useState(open);
  if (open && !surfaceShown) {
    setSurfaceShown(true);
  }
  const shouldRenderSurface = open || surfaceShown;
  const openRef = React.useRef(open);

  useIsomorphicLayoutEffect(() => {
    openRef.current = open;
    const surface = contentRef.current;
    if (!surface) {
      return;
    }
    if (open) {
      pendingCloseEvent.current = isInTopLayer(surface)
        ? { element: surface, type: isDialogElement(surface) && surface.open && isModal(surface) ? 'close' : 'toggle' }
        : null;
      return;
    }
    if (!surfaceShown || isInTopLayer(surface)) {
      return;
    }

    const unmount = () => {
      if (!openRef.current) {
        setSurfaceShown(false);
      }
    };
    const type = pendingCloseEvent.current?.element === surface ? pendingCloseEvent.current.type : null;
    // Never shown, replaced, or the browser closed it: nothing left to wait for.
    if (!type) {
      queueMicrotask(unmount);
      return;
    }
    // Stay mounted for the queued event, so the surface's own `onClose` / `onToggle` still run.
    const onClose = (event: Event) => {
      // A queued `toggle` from the opening can still arrive after the close.
      if (event.target === surface && (event as Event & { newState?: string }).newState !== 'open') {
        pendingCloseEvent.current = null;
        unmount();
      }
    };
    surface.addEventListener(type, onClose);
    return () => surface.removeEventListener(type, onClose);
  });

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
    // The effective value: stays true while a modal opening lasts.
    inertTrapFocus: modal,
    onOpenChange: props.onOpenChange,
    contextTarget,
    setContextTarget,
    positioning,
    surfaceId,
    shouldRenderSurface,
  };
};

export const usePopoverContextValues = (state: PopoverState): PopoverContextValues => {
  const {
    open,
    setOpen,
    toggleOpen,
    triggerRef,
    contentRef,
    arrowRef,
    openOnHover,
    openOnContext,
    withArrow,
    inertTrapFocus,
    positioning,
    surfaceId,
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
      withArrow,
      inertTrapFocus,
      positioning: {
        targetRef: positioning.targetRef,
        containerRef: positioning.containerRef,
      },
      surfaceId,
    },
  };
};
