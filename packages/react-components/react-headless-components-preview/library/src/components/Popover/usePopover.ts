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
import type { InternalPopoverContextValue } from './popoverContext';

type ToggleEvent = Event & { newState?: 'open' | 'closed' };
type InternalPopoverState = PopoverState & Pick<InternalPopoverContextValue, 'focusCapture'>;

const isDialogElement = (el: Element | null): el is HTMLDialogElement =>
  !!el && typeof (el as HTMLDialogElement).showModal === 'function';

const getActiveElement = (surface: HTMLElement): Element | null => {
  const root = surface.getRootNode() as Document | ShadowRoot;
  // Keep focus retargeted to this root: Node.contains does not cross shadow boundaries.
  return root.activeElement ?? surface.ownerDocument.activeElement;
};
const isPopoverOpen = (surface: HTMLElement) => surface.matches(':popover-open');
const hasSurfaceFocus = (surface: HTMLElement) => surface.contains(getActiveElement(surface));

const createFocusObserver = () => {
  let content: HTMLElement | null = null;
  let trigger: HTMLElement | null = null;
  let setOpen: (event: Event, open: boolean) => void;
  // Null rejects stale captures after disposal; false still permits pre-layout capture.
  let enabled: boolean | null = false;
  let focusWasInside = false;
  const focusObservers = new Map<Node, () => void>();
  const knownShadowRoots = new Map<Element, ShadowRoot>();
  let focusObservations: Map<Node | null, Event> | undefined;
  let framePoll: { doc: Document; id: number } | undefined;
  let generation = 0;
  const eventGenerations = new WeakMap<Event, number>();
  const retiredFocusDocuments = new WeakSet<Document>();

  const isFocusInside = (target: Node | null) => {
    let current = target;
    while (current) {
      if (elementContains(content, current) || elementContains(trigger, current)) {
        return true;
      }
      current = current.ownerDocument?.defaultView?.frameElement ?? null;
    }
    return false;
  };
  const getDeepActiveElement = (doc: Document): Element | null => {
    let active = doc.activeElement;
    while (active) {
      const root = active.shadowRoot ?? knownShadowRoots.get(active);
      if (!root?.activeElement) {
        break;
      }
      active = root.activeElement;
    }
    return active;
  };

  const getDocuments = () => [...focusObservers.keys()].filter((root): root is Document => root.nodeType === 9);
  const getFocusedFrame = () => {
    for (const doc of getDocuments()) {
      const active = doc.hasFocus() ? getDeepActiveElement(doc) : null;
      if (active?.nodeName === 'IFRAME' || active?.nodeName === 'WEBVIEW') {
        return active;
      }
    }
  };
  const stopFramePoll = () => {
    framePoll?.doc.defaultView?.clearInterval(framePoll.id);
    framePoll = undefined;
  };

  const reconcileFocus = () => {
    const epoch = generation;
    const observations = focusObservations;
    focusObservations = undefined;
    const surface = content;
    if (
      !enabled ||
      !observations ||
      !surface?.isConnected ||
      typeof surface.showPopover !== 'function' ||
      !isPopoverOpen(surface)
    ) {
      return;
    }
    if ([...observations.keys()].some(isFocusInside)) {
      focusWasInside = true;
    }
    let doc = getDocuments().find(document => document.hasFocus());
    let destination: Element | undefined;
    let inside = false;
    while (doc) {
      const active = getDeepActiveElement(doc);
      if (!active) {
        break;
      }
      inside ||= isFocusInside(active);
      if (active !== doc.body && active !== doc.documentElement) {
        destination = active;
      }
      const child = active.nodeName === 'IFRAME' ? (active as HTMLIFrameElement).contentDocument : null;
      if (!child?.hasFocus()) {
        break;
      }
      observeRoot(child);
      doc = child;
    }
    if (!getFocusedFrame()) {
      stopFramePoll();
    } else if (!framePoll) {
      const win = surface.ownerDocument.defaultView;
      if (win) {
        const poll = { doc: surface.ownerDocument, id: 0 };
        framePoll = poll;
        // One scoped sampler covers frame transitions without parent focus events.
        poll.id = win.setInterval(() => {
          if (framePoll !== poll) {
            return;
          }
          const frame = getFocusedFrame();
          const currentWindow = frame?.ownerDocument.defaultView;
          if (generation !== epoch || !frame || !currentWindow) {
            stopFramePoll();
            return;
          }
          frame.dispatchEvent(new currentWindow.CustomEvent('fuiframefocus', { bubbles: true, composed: true }));
        }, 100);
      }
    }
    if (inside) {
      focusWasInside = true;
      return;
    }
    if (!destination) {
      return;
    }
    const event = observations.get(destination) ?? [...observations.values()].pop();
    if (focusWasInside && event) {
      focusWasInside = false;
      // Consumer code may synchronously close or unmount; allocate nothing after this callback.
      setOpen(event, false);
    }
  };

  function scheduleFocusReconciliation() {
    if (!focusObservations) {
      focusObservations = new Map();
      Promise.resolve().then(reconcileFocus);
    }
    return focusObservations;
  }

  function observe(event: Event, target: Node | null) {
    if (enabled === null || (target && !target.isConnected)) {
      return;
    }
    const previousGeneration = eventGenerations.get(event);
    if (previousGeneration !== undefined && previousGeneration !== generation) {
      return;
    }
    eventGenerations.set(event, generation);
    const observations = scheduleFocusReconciliation();
    observations.delete(target);
    observations.set(target, event);
    if (target) {
      observeRootChain(target);
    }
  }

  function observeRootChain(target: Node) {
    let current = target;
    while (true) {
      const root = current.getRootNode();
      observeRoot(root);
      if (root.nodeType !== 11 || !('host' in root)) {
        break;
      }
      const shadowRoot = root as ShadowRoot;
      knownShadowRoots.set(shadowRoot.host, shadowRoot);
      current = shadowRoot.host;
    }
    if (target.ownerDocument) {
      observeRoot(target.ownerDocument);
    }
  }

  function observeRoot(root: Node) {
    const ownerDocument = root.nodeType === 9 ? (root as Document) : root.ownerDocument;
    if (
      enabled === null ||
      focusObservers.has(root) ||
      !ownerDocument?.defaultView ||
      (retiredFocusDocuments.has(ownerDocument) && !ownerDocument.hasFocus())
    ) {
      return;
    }
    retiredFocusDocuments.delete(ownerDocument);
    const onFocus = (event: Event) => observe(event, (event.composedPath()[0] ?? event.target) as Node | null);
    const doc = root.nodeType === 9 ? (root as Document) : undefined;
    let timeout: number | undefined;
    let disposed = false;
    const onWindowBlur = (event: Event) => {
      const currentWindow = doc?.defaultView;
      const epoch = generation;
      if (!disposed && currentWindow) {
        currentWindow.clearTimeout(timeout);
        timeout = currentWindow.setTimeout(() => {
          if (!disposed && generation === epoch) {
            observe(event, null);
          }
        }, 0);
      }
    };
    const onWindowFocus = (event: Event) => observe(event, null);
    const onPageHide = (event: Event) => {
      if (doc && !(event as PageTransitionEvent).persisted) {
        retiredFocusDocuments.add(doc);
        focusObservers.forEach((dispose, observedRoot) => {
          if (observedRoot === doc || observedRoot.ownerDocument === doc) {
            dispose();
          }
        });
      }
    };
    const updateListeners = (method: 'addEventListener' | 'removeEventListener') => {
      root[method]('focusin', onFocus, true);
      root[method]('fuiframefocus', onFocus, true);
      const currentWindow = doc?.defaultView;
      currentWindow?.[method]('blur', onWindowBlur);
      currentWindow?.[method]('focus', onWindowFocus);
      currentWindow?.[method]('pagehide', onPageHide);
      return currentWindow;
    };
    updateListeners('addEventListener');
    focusObservers.set(root, () => {
      if (disposed) {
        return;
      }
      disposed = true;
      // A captured WindowProxy can become cross-origin after its document navigates.
      const currentWindow = updateListeners('removeEventListener');
      currentWindow?.clearTimeout(timeout);
      if (doc === framePoll?.doc) {
        stopFramePoll();
      }
      focusObservers.delete(root);
    });
  }

  return {
    observe,
    update(
      nextEnabled: boolean,
      nextContent: HTMLElement | null,
      nextTrigger: HTMLElement | null,
      onExit: (event: Event, open: boolean) => void,
    ) {
      if (content !== nextContent) {
        stopFramePoll();
      }
      content = nextContent;
      trigger = nextTrigger;
      setOpen = onExit;
      enabled = nextEnabled;
      if (!enabled) {
        generation++;
        focusWasInside = false;
        focusObservations?.clear();
        focusObservers.forEach(dispose => dispose());
        focusObservers.clear();
        knownShadowRoots.clear();
        return;
      }
      // Surviving listeners and learned portal roots stay attached across commits.
      [content, trigger].forEach(element => {
        if (element) {
          observeRootChain(element);
          if (isFocusInside(getDeepActiveElement(element.ownerDocument))) {
            focusWasInside = true;
          }
        }
      });
      knownShadowRoots.forEach(root => {
        observeRoot(root);
        observeRoot(root.ownerDocument);
      });
      scheduleFocusReconciliation();
    },

    dispose() {
      enabled = null;
      generation++;
      focusObservations?.clear();
      stopFramePoll();
      focusObservers.forEach(dispose => dispose());
      focusObservers.clear();
    },
  };
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
  const pendingNativeClose = React.useRef<HTMLElement | null>(null);

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
    pendingNativeClose.current = null;
    openedSurface.current = null;
    setShouldRenderSurface(false);
  });

  const onSurfaceChange = useEventCallback((event: Event) => {
    const toggle = event as ToggleEvent;
    const nextOpen = event.type === 'toggle' && toggle.newState === 'open';
    const surface = contentRef.current;
    if (
      event.currentTarget !== surface ||
      !surface ||
      (event.type === 'close' ? isDialogElement(surface) && surface.open : isPopoverOpen(surface) !== nextOpen)
    ) {
      return;
    }
    // Legacy React roots commit each update synchronously; close before releasing the surface.
    if (nextOpen !== open) {
      setOpenState(nextOpen);
    }
    if (!nextOpen) {
      finishSurfaceClose();
    }
    if (nextOpen !== open) {
      onOpenChange(event, nextOpen);
    }
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
        focusWasInsideOnNativeClose.current = hasSurfaceFocus(surface);
      }
      if (!trapFocus && open && (event as ToggleEvent).newState === 'closed') {
        pendingNativeClose.current = surface;
        Promise.resolve().then(() => {
          if (pendingNativeClose.current === surface && isPopoverOpen(surface)) {
            pendingNativeClose.current = null;
          }
        });
      } else if ((event as ToggleEvent).newState === 'open') {
        pendingNativeClose.current = null;
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
      surface.addEventListener('close', onSurfaceChange);
      surface.addEventListener('cancel', trackNativeCloseFocus);
      surface.addEventListener('beforetoggle', trackNativeCloseFocus);
      surface.addEventListener('focusout', trackDialogFocusOut);
      return () => {
        surface.removeEventListener('close', onSurfaceChange);
        surface.removeEventListener('cancel', trackNativeCloseFocus);
        surface.removeEventListener('beforetoggle', trackNativeCloseFocus);
        surface.removeEventListener('focusout', trackDialogFocusOut);
      };
    }

    if (typeof surface.showPopover !== 'function') {
      return;
    }

    surface.addEventListener('toggle', onSurfaceChange);
    surface.addEventListener('beforetoggle', trackNativeCloseFocus);
    return () => {
      surface.removeEventListener('toggle', onSurfaceChange);
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
      if (pendingNativeClose.current === surface && !isPopoverOpen(surface)) {
        return;
      }
      focusWasInsideOnNativeClose.current = null;
      pendingNativeClose.current = null;
      if (trapFocus) {
        if (isDialogElement(surface) && !surface.open) {
          surface.showModal();
        }
        if (isDialogElement(surface) && surface.open) {
          openedSurface.current = surface;
        }
      } else if (typeof surface.showPopover === 'function' && !isPopoverOpen(surface)) {
        surface.showPopover();
        if (isPopoverOpen(surface)) {
          openedSurface.current = surface;
        }
      }
      return;
    }
    if (trapFocus) {
      if (isDialogElement(surface) && surface.open) {
        focusWasInsideOnNativeClose.current = hasSurfaceFocus(surface);
        surface.close();
      } else if (openedSurface.current !== surface) {
        focusWasInsideOnNativeClose.current = hasSurfaceFocus(surface);
        finishSurfaceClose();
      }
    } else if (typeof surface.hidePopover === 'function') {
      if (isPopoverOpen(surface)) {
        focusWasInsideOnNativeClose.current = hasSurfaceFocus(surface);
        surface.hidePopover();
      } else if (openedSurface.current !== surface) {
        finishSurfaceClose();
      }
    } else {
      focusWasInsideOnNativeClose.current = hasSurfaceFocus(surface);
      finishSurfaceClose();
    }
  }, [open, trapFocus, shouldRenderSurface, props.children, contentRef, finishSurfaceClose]);

  const [focusObserver] = React.useState(createFocusObserver);
  const onBoundaryFocusCapture = (event: React.FocusEvent<HTMLElement>) => {
    if (open && !trapFocus) {
      focusObserver.observe(event.nativeEvent, event.target);
    }
  };
  useIsomorphicLayoutEffect(() =>
    focusObserver.update(open && !trapFocus, contentRef.current, triggerRef.current, setOpen),
  );
  useIsomorphicLayoutEffect(() => () => focusObserver.dispose(), [focusObserver]);

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

  const state: InternalPopoverState = {
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
    focusCapture: onBoundaryFocusCapture,
  };
  return state;
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

  const popover: InternalPopoverContextValue = {
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
    focusCapture: (state as InternalPopoverState).focusCapture,
  };
  return { popover };
};
