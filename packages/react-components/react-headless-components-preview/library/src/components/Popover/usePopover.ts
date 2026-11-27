'use client';

import * as React from 'react';
import { useControllableState, useEventCallback, useId, useTimeout } from '@fluentui/react-utilities';
import { usePositioning, resolvePositioningShorthand } from '../../hooks';
import { useDialogLayerOpenState, useLayerPresence } from '../../hooks/top-layer';
import type { PopoverProps, PopoverState, PopoverContextValues, OpenPopoverEvents } from './Popover.types';

// Browser closes pass their native event.
type OpenChangeEvent = OpenPopoverEvents | Event | React.SyntheticEvent;

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

  const onOpenChange = useEventCallback((e: OpenChangeEvent, shouldOpen: boolean) => {
    props.onOpenChange?.(e, { event: e, type: e.type, open: shouldOpen });
  });

  const [setOpenTimeout, clearOpenTimeout] = useTimeout();

  const setOpen = useEventCallback((e: OpenChangeEvent, shouldOpen: boolean) => {
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

  // Turning `inertTrapFocus` off while open applies on the next open, so the surface keeps its modal semantics until then.
  const [modalWhileOpen, setModalWhileOpen] = React.useState(open && inertTrapFocus);
  if (open && inertTrapFocus && !modalWhileOpen) {
    setModalWhileOpen(true);
  } else if (!open && modalWhileOpen) {
    setModalWhileOpen(false);
  }
  const modal = inertTrapFocus || modalWhileOpen;

  const { shouldRender: shouldRenderSurface } = useLayerPresence(contentRef, { open });

  useDialogLayerOpenState(contentRef, {
    open,
    mode: modal ? 'modal' : 'auto',
    onOpenChange: (nextOpen, { event }) => setOpen(event, nextOpen),
    // Back to the trigger when focus was inside as the surface started closing.
    returnFocus: { target: triggerRef },
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
