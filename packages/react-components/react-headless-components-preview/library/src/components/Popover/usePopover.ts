'use client';

import * as React from 'react';
import {
  useControllableState,
  useEventCallback,
  useId,
  useTimeout,
  useIsomorphicLayoutEffect,
  elementContains,
} from '@fluentui/react-utilities';
import { usePositioning, resolvePositioningShorthand } from '../../hooks';
import type { PopoverProps, PopoverState, PopoverContextValue, OpenPopoverEvents } from './Popover.types';

type ToggleEvent = Event & { newState?: 'open' | 'closed' };

const isDialogElement = (el: Element | null): el is HTMLDialogElement =>
  !!el && typeof (el as HTMLDialogElement).showModal === 'function';

const getActiveElement = (surface: HTMLElement): Element | null => {
  const root = surface.getRootNode();
  const ShadowRootConstructor = surface.ownerDocument.defaultView?.ShadowRoot;
  // Keep focus retargeted to this root: Node.contains does not cross shadow boundaries.
  return ShadowRootConstructor && root instanceof ShadowRootConstructor
    ? root.activeElement ?? surface.ownerDocument.activeElement
    : surface.ownerDocument.activeElement;
};

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
  } = props;

  const [open, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const [shouldRenderSurface, setShouldRenderSurface] = React.useState(open);
  const focusWasInsideOnNativeClose = React.useRef<boolean | null>(null);
  const openedSurface = React.useRef<HTMLElement | null>(null);
  const focusWasInside = React.useRef(false);
  const latestFocusEvent = React.useRef<Event | null>(null);
  const classifiedFocusEvents = React.useRef(new WeakSet<Event>());
  const focusObservers = React.useRef(new Map<Node, () => void>());

  const [contextTarget, setContextTarget] = React.useState<{ x: number; y: number } | undefined>(undefined);

  const onOpenChange = useEventCallback((e: OpenPopoverEvents | Event, shouldOpen: boolean) => {
    props.onOpenChange?.(e, { event: e, type: e.type, open: shouldOpen });
  });

  const [setOpenTimeout, clearOpenTimeout] = useTimeout();

  const setOpen = useEventCallback((e: OpenPopoverEvents | Event, shouldOpen: boolean) => {
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
      if (shouldOpen && props.open === undefined) {
        setShouldRenderSurface(true);
      }
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

  const finishSurfaceClose = useEventCallback(() => {
    const surface = contentRef.current;
    if (!surface) {
      return;
    }
    const activeElement = getActiveElement(surface);
    // Initially-open surfaces have no native trigger snapshot; preserve successful native restoration.
    if (
      (focusWasInsideOnNativeClose.current ?? surface.contains(activeElement)) &&
      (!activeElement || activeElement === surface.ownerDocument.body || surface.contains(activeElement)) &&
      triggerRef.current?.isConnected
    ) {
      triggerRef.current.focus();
    }
    focusWasInsideOnNativeClose.current = null;
    openedSurface.current = null;
    setShouldRenderSurface(false);
  });

  const onSurfaceToggle = useEventCallback((event: Event) => {
    const toggle = event as ToggleEvent;
    const nextOpen = toggle.newState === 'open';
    const surface = contentRef.current;
    if (event.currentTarget !== surface || !surface || surface.matches(':popover-open') !== nextOpen) {
      return;
    }
    if (!nextOpen) {
      finishSurfaceClose();
    }
    if (nextOpen === open) {
      return;
    }

    setOpenState(nextOpen);
    props.onOpenChange?.(event, { event, type: event.type, open: nextOpen });
  });

  const onSurfaceClose = useEventCallback((event: Event) => {
    const surface = contentRef.current;
    if (event.currentTarget !== surface || (isDialogElement(surface) && surface.open)) {
      return;
    }
    finishSurfaceClose();
    if (!open) {
      return;
    }
    setOpenState(false);
    props.onOpenChange?.(event, { event, type: event.type, open: false });
  });

  const renderSurface = open || shouldRenderSurface;

  // Rebind after each commit so keyed surface replacements need no mirrored element state.
  useIsomorphicLayoutEffect(() => {
    const surface = contentRef.current;
    if (!surface || !renderSurface) {
      return;
    }
    const trackNativeCloseFocus = (event: Event) => {
      if (event.type === 'cancel' || (event as ToggleEvent).newState === 'closed') {
        focusWasInsideOnNativeClose.current = surface.contains(getActiveElement(surface));
      }
    };

    if (trapFocus) {
      if (!isDialogElement(surface)) {
        return;
      }

      // Older dialogs lack beforetoggle; native close removes open before restoring focus.
      const trackDialogFocusOut = () => {
        focusWasInsideOnNativeClose.current = surface.open ? null : true;
      };
      surface.addEventListener('close', onSurfaceClose);
      surface.addEventListener('cancel', trackNativeCloseFocus);
      surface.addEventListener('beforetoggle', trackNativeCloseFocus);
      surface.addEventListener('focusout', trackDialogFocusOut);
      return () => {
        surface.removeEventListener('close', onSurfaceClose);
        surface.removeEventListener('cancel', trackNativeCloseFocus);
        surface.removeEventListener('beforetoggle', trackNativeCloseFocus);
        surface.removeEventListener('focusout', trackDialogFocusOut);
      };
    }

    if (typeof surface.showPopover !== 'function') {
      return;
    }

    surface.addEventListener('toggle', onSurfaceToggle);
    surface.addEventListener('beforetoggle', trackNativeCloseFocus);
    return () => {
      surface.removeEventListener('toggle', onSurfaceToggle);
      surface.removeEventListener('beforetoggle', trackNativeCloseFocus);
    };
  });

  useIsomorphicLayoutEffect(() => {
    const surface = contentRef.current;
    if (!surface) {
      return;
    }
    if (open) {
      if (!shouldRenderSurface) {
        setShouldRenderSurface(true);
      }
      focusWasInsideOnNativeClose.current = null;
      if (trapFocus) {
        if (isDialogElement(surface) && !surface.open) {
          surface.showModal();
        }
        if (isDialogElement(surface) && surface.open) {
          openedSurface.current = surface;
        }
      } else if (typeof surface.showPopover === 'function' && !surface.matches(':popover-open')) {
        surface.showPopover();
        if (surface.matches(':popover-open')) {
          openedSurface.current = surface;
        }
      }
      return;
    }
    if (trapFocus) {
      if (isDialogElement(surface) && surface.open) {
        focusWasInsideOnNativeClose.current = surface.contains(getActiveElement(surface));
        surface.close();
      } else if (openedSurface.current !== surface) {
        focusWasInsideOnNativeClose.current = surface.contains(getActiveElement(surface));
        finishSurfaceClose();
      }
    } else if (typeof surface.hidePopover === 'function') {
      if (surface.matches(':popover-open')) {
        focusWasInsideOnNativeClose.current = surface.contains(getActiveElement(surface));
        surface.hidePopover();
      } else if (openedSurface.current !== surface) {
        finishSurfaceClose();
      }
    } else {
      focusWasInsideOnNativeClose.current = surface.contains(getActiveElement(surface));
      finishSurfaceClose();
    }
  }, [open, trapFocus, shouldRenderSurface, props.children, contentRef, finishSurfaceClose]);

  const isFocusInside = React.useCallback(
    (target: Node | null) => elementContains(contentRef.current, target) || elementContains(triggerRef.current, target),
    [],
  );
  const recordFocus = React.useCallback(
    (event: Event, target: Node | null) => {
      const surface = contentRef.current;
      if (!open || trapFocus || !surface || typeof surface.showPopover !== 'function') {
        return;
      }
      if (!surface.matches(':popover-open') || !target) {
        return;
      }
      if (isFocusInside(target)) {
        focusWasInside.current = true;
      } else if (target !== surface.ownerDocument.body && target !== surface.ownerDocument.documentElement) {
        if (focusWasInside.current) {
          focusWasInside.current = false;
          setOpen(event, false);
        }
      }
    },
    [open, trapFocus, isFocusInside, setOpen],
  );

  const onBoundaryFocusCapture = (event: React.FocusEvent<HTMLElement>) => {
    latestFocusEvent.current = event.nativeEvent;
    classifiedFocusEvents.current.add(event.nativeEvent);
    recordFocus(event.nativeEvent, event.target);
  };

  useIsomorphicLayoutEffect(() => {
    if (!open || trapFocus) {
      focusWasInside.current = false;
      latestFocusEvent.current = null;
      return;
    }
    const surface = contentRef.current;
    const trigger = triggerRef.current;
    if (
      (surface && isFocusInside(getActiveElement(surface))) ||
      (trigger && isFocusInside(getActiveElement(trigger)))
    ) {
      focusWasInside.current = true;
    }
  });

  const onFocusIn = useEventCallback((event: Event) => {
    latestFocusEvent.current = event;
    const target = (event.composedPath()[0] ?? event.target) as Node | null;
    if (isFocusInside(target)) {
      classifiedFocusEvents.current.add(event);
      recordFocus(event, target);
      return;
    }
    // React portals expose the real target even when an external closed root hides it from this listener.
    Promise.resolve().then(() => {
      if (latestFocusEvent.current === event && !classifiedFocusEvents.current.has(event)) {
        recordFocus(event, target);
      }
    });
  });
  const onFrameFocus = useEventCallback((event: Event, doc: Document) => {
    const active = getActiveElement(contentRef.current ?? doc.body);
    if (doc.hasFocus() && (active?.nodeName === 'IFRAME' || active?.nodeName === 'WEBVIEW')) {
      recordFocus(event, active);
    }
  });

  useIsomorphicLayoutEffect(() => {
    const roots = new Set<Node>();
    if (open && !trapFocus) {
      [contentRef.current, triggerRef.current].forEach(element => {
        if (element) {
          roots.add(element.getRootNode());
          roots.add(element.ownerDocument);
        }
      });
    }
    // Reconcile roots without detaching surviving listeners during ordinary commits or keyed replacements.
    focusObservers.current.forEach((dispose, root) => {
      if (!roots.has(root)) {
        dispose();
        focusObservers.current.delete(root);
      }
    });
    roots.forEach(root => {
      if (focusObservers.current.has(root)) {
        return;
      }
      const doc = root.nodeType === 9 ? (root as Document) : undefined;
      const win = doc?.defaultView;
      let timeout: number | undefined;
      const onWindowBlur = (event: Event) => {
        if (win && doc) {
          win.clearTimeout(timeout);
          timeout = win.setTimeout(() => onFrameFocus(event, doc), 0);
        }
      };
      root.addEventListener('focusin', onFocusIn, true);
      win?.addEventListener('blur', onWindowBlur);
      focusObservers.current.set(root, () => {
        root.removeEventListener('focusin', onFocusIn, true);
        win?.removeEventListener('blur', onWindowBlur);
        win?.clearTimeout(timeout);
      });
    });
  });
  useIsomorphicLayoutEffect(() => {
    const observers = focusObservers.current;
    return () => {
      observers.forEach(dispose => dispose());
      observers.clear();
    };
  }, []);

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

  if (React.isValidElement<React.HTMLAttributes<HTMLElement>>(popoverSurface)) {
    const onFocusCaptureOriginal = popoverSurface.props.onFocusCapture;
    popoverSurface = React.cloneElement(popoverSurface, {
      onFocusCapture: event => {
        onBoundaryFocusCapture(event);
        onFocusCaptureOriginal?.(event);
      },
    });
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
    onOpenChange: props.onOpenChange,
    contextTarget,
    setContextTarget,
    positioning,
    surfaceId,
    shouldRenderSurface: renderSurface,
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
      trapFocus,
      positioning: {
        targetRef: positioning.targetRef,
        containerRef: positioning.containerRef,
      },
      surfaceId,
    },
  };
};
