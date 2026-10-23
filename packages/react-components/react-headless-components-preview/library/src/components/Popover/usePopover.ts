'use client';

import * as React from 'react';
import { useControllableState, useEventCallback, useId, useTimeout } from '@fluentui/react-utilities';
import { usePositioning, resolvePositioningShorthand } from '../../hooks';
import { useDialogLayerOpenState, useLayerFocusReturn, useLayerPresence } from '../../hooks/top-layer';
import { isEscapeForLayer } from '../../hooks/top-layer/utils';
import type { PopoverProps, PopoverState, PopoverContextValue, OpenPopoverEvents } from './Popover.types';

/**
 * Returns the state for a Popover component.
 */
export const usePopover = (props: PopoverProps): PopoverState => {
  const {
    openOnHover = false,
    openOnContext = false,
    mouseLeaveDelay = 500,
    withArrow = false,
    trapFocus = false,
    mode = 'auto',
  } = props;

  if (process.env.NODE_ENV !== 'production' && trapFocus && mode !== 'auto') {
    // eslint-disable-next-line no-console
    console.warn(
      `@fluentui/react-headless-components-preview [Popover]: \`mode="${mode}"\` is ignored when \`trapFocus\` is true.`,
    );
  }

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

  const onNativeOpenChange = useEventCallback((event: Event | React.SyntheticEvent, shouldOpen: boolean) => {
    clearOpenTimeout();
    if (!shouldOpen) {
      setContextTarget(undefined);
    }
    setOpenState(shouldOpen);
    props.onOpenChange?.(event, { event, type: event.type, open: shouldOpen });
  });

  // Back to the trigger when focus was inside as the surface started closing.
  const focusReturn = useLayerFocusReturn(contentRef, { target: triggerRef });

  useDialogLayerOpenState(contentRef, {
    open,
    mode: trapFocus ? 'modal' : mode,
    onOpenChange: (nextOpen, { event }) => onNativeOpenChange(event, nextOpen),
    ...focusReturn,
  });

  // The surface stays mounted until the browser closes it and exit animations end.
  const { shouldRender: shouldRenderSurface } = useLayerPresence(contentRef, { open });

  // The browser ignores Escape on `manual` popovers, and on `hint` where unsupported.
  const onSurfaceKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    const surface = event.currentTarget as HTMLElement & { popover?: string | null };
    if (
      event.key !== 'Escape' ||
      event.isDefaultPrevented() ||
      surface.popover !== 'manual' ||
      !isEscapeForLayer(surface, event.target as Element)
    ) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    onNativeOpenChange(event, false);
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
    trapFocus,
    mode,
    onOpenChange: props.onOpenChange,
    contextTarget,
    setContextTarget,
    positioning,
    surfaceId,
    shouldRenderSurface,
    onSurfaceKeyDown,
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
    withArrow,
    trapFocus,
    mode,
    positioning,
    surfaceId,
    onSurfaceKeyDown,
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
      trapFocus,
      mode,
      onSurfaceKeyDown,
      positioning: {
        targetRef: positioning.targetRef,
        containerRef: positioning.containerRef,
      },
      surfaceId,
    },
  };
};
