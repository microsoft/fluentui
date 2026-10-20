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
type FocusObservation = { event: Event; target: Node | null; generation: number };

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
  const pendingNativeClose = React.useRef<HTMLElement | null>(null);
  const focusWasInside = React.useRef(false);
  const focusObservers = React.useRef(new Map<Node, () => void>());
  const knownShadowRoots = React.useRef(new Map<Element, ShadowRoot>());
  const focusObservations = React.useRef<FocusObservation[]>([]);
  const focusReconciliationQueued = React.useRef(false);
  const framePolls = React.useRef(new Map<Document, number>());
  const observationLifecycle = React.useRef({ mounted: true, generation: 0 });
  const eventGenerations = React.useRef(new WeakMap<Event, number>());
  const retiredFocusDocuments = React.useRef(new WeakSet<Document>());

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
      if (!trapFocus && open && (event as ToggleEvent).newState === 'closed') {
        pendingNativeClose.current = surface;
        Promise.resolve().then(() => {
          if (pendingNativeClose.current === surface && surface.matches(':popover-open')) {
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
      if (pendingNativeClose.current === surface && !surface.matches(':popover-open')) {
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

  const isFocusInside = React.useCallback((target: Node | null) => {
    let current = target;
    const visited = new Set<Node>();
    while (current && !visited.has(current)) {
      visited.add(current);
      if (elementContains(contentRef.current, current) || elementContains(triggerRef.current, current)) {
        return true;
      }
      current = current.ownerDocument?.defaultView?.frameElement ?? null;
    }
    return false;
  }, []);
  const getDeepActiveElement = (doc: Document): Element | null => {
    let active = doc.activeElement;
    const visited = new Set<Element>();
    while (active && !visited.has(active)) {
      visited.add(active);
      const root = active.shadowRoot ?? knownShadowRoots.current.get(active);
      if (!root?.activeElement) {
        break;
      }
      active = root.activeElement;
    }
    return active;
  };

  const getActiveFrameChain = (doc: Document): Array<{ doc: Document; active: Element }> => {
    const chain: Array<{ doc: Document; active: Element }> = [];
    const visited = new Set<Document>();
    let current = doc;
    while (!visited.has(current)) {
      visited.add(current);
      const active = getDeepActiveElement(current);
      if (!active) {
        break;
      }
      chain.push({ doc: current, active });
      const childDocument = active.nodeName === 'IFRAME' ? (active as HTMLIFrameElement).contentDocument : null;
      if (!childDocument || !childDocument.hasFocus()) {
        break;
      }
      current = childDocument;
    }
    return chain;
  };

  const reconcileFocus = useEventCallback(() => {
    const generation = observationLifecycle.current.generation;
    const observations = focusObservations.current.splice(0).filter(item => item.generation === generation);
    const surface = contentRef.current;
    if (
      !observationLifecycle.current.mounted ||
      !open ||
      trapFocus ||
      !surface ||
      typeof surface.showPopover !== 'function'
    ) {
      return;
    }
    const isCurrentSurface = () =>
      observationLifecycle.current.mounted &&
      observationLifecycle.current.generation === generation &&
      contentRef.current === surface &&
      surface.isConnected &&
      surface.matches(':popover-open');
    if (!isCurrentSurface()) {
      return;
    }
    if (observations.some(observation => isFocusInside(observation.target))) {
      focusWasInside.current = true;
    }
    const documents = new Set([surface.ownerDocument, triggerRef.current?.ownerDocument]);
    knownShadowRoots.current.forEach(root => documents.add(root.ownerDocument));
    focusObservers.current.forEach((_dispose, root) => {
      if (root.nodeType === 9) {
        documents.add(root as Document);
      }
    });
    const focusedRootDocument =
      [...observations]
        .reverse()
        .map(observation => observation.target?.ownerDocument)
        .find(doc => doc?.hasFocus()) ?? [...documents].find(doc => doc?.hasFocus());
    const activeChain = focusedRootDocument ? getActiveFrameChain(focusedRootDocument) : [];
    activeChain.forEach(item => documents.add(item.doc));
    for (const doc of documents) {
      if (!isCurrentSurface()) {
        return;
      }
      if (!doc) {
        continue;
      }
      const win = doc.defaultView;
      const active = getDeepActiveElement(doc);
      const isFrame = active?.nodeName === 'IFRAME' || active?.nodeName === 'WEBVIEW';
      if (active?.nodeName === 'IFRAME') {
        const frameDocument = (active as HTMLIFrameElement).contentDocument;
        if (frameDocument) {
          if (!isCurrentSurface()) {
            return;
          }
          observeRoot(frameDocument);
        }
      }
      if (win && isFrame && doc.hasFocus() && !framePolls.current.has(doc)) {
        // Moving between child frames produces no second parent blur/focusin event.
        framePolls.current.set(
          doc,
          win.setInterval(() => {
            const currentWindow = doc.defaultView;
            const destination = getDeepActiveElement(doc);
            if (
              !observationLifecycle.current.mounted ||
              observationLifecycle.current.generation !== generation ||
              !currentWindow ||
              !doc.hasFocus() ||
              !destination
            ) {
              currentWindow?.clearInterval(framePolls.current.get(doc));
              framePolls.current.delete(doc);
              return;
            }
            destination.dispatchEvent(
              new currentWindow.CustomEvent('fuiframefocus', { bubbles: true, composed: true }),
            );
          }, 100),
        );
      } else if (win && (!isFrame || !doc.hasFocus())) {
        win.clearInterval(framePolls.current.get(doc));
        framePolls.current.delete(doc);
      }
    }
    if (!isCurrentSurface()) {
      return;
    }
    if (activeChain.some(item => isFocusInside(item.active))) {
      focusWasInside.current = true;
      return;
    }
    const destination = [...activeChain]
      .reverse()
      .find(item => item.active !== item.doc.body && item.active !== item.doc.documentElement);
    if (!destination) {
      return;
    }
    const observation =
      [...observations].reverse().find(item => item.target === destination.active) ??
      observations[observations.length - 1];
    if (focusWasInside.current && observation) {
      focusWasInside.current = false;
      // Consumer code may synchronously close or unmount; allocate nothing after this callback.
      setOpen(observation.event, false);
    }
  });

  function scheduleFocusReconciliation() {
    if (!focusReconciliationQueued.current) {
      focusReconciliationQueued.current = true;
      Promise.resolve().then(() => {
        focusReconciliationQueued.current = false;
        reconcileFocus();
      });
    }
  }

  function observeFocus(event: Event, target: Node | null) {
    const lifecycle = observationLifecycle.current;
    if (!lifecycle.mounted || (target && !target.isConnected)) {
      return;
    }
    const previousGeneration = eventGenerations.current.get(event);
    if (previousGeneration !== undefined && previousGeneration !== lifecycle.generation) {
      return;
    }
    eventGenerations.current.set(event, lifecycle.generation);
    focusObservations.current.push({ event, target, generation: lifecycle.generation });
    if (target) {
      observeRootChain(target);
    }
    scheduleFocusReconciliation();
  }

  function observeRootChain(target: Node) {
    let current = target;
    const visited = new Set<Node>();
    while (!visited.has(current)) {
      visited.add(current);
      const root = current.getRootNode();
      observeRoot(root);
      const ShadowRootConstructor = current.ownerDocument?.defaultView?.ShadowRoot;
      if (!ShadowRootConstructor || !(root instanceof ShadowRootConstructor)) {
        break;
      }
      knownShadowRoots.current.set(root.host, root);
      current = root.host;
    }
    if (target.ownerDocument) {
      observeRoot(target.ownerDocument);
    }
  }

  function observeRoot(root: Node) {
    const ownerDocument = root.nodeType === 9 ? (root as Document) : root.ownerDocument;
    if (
      !observationLifecycle.current.mounted ||
      focusObservers.current.has(root) ||
      !ownerDocument?.defaultView ||
      (retiredFocusDocuments.current.has(ownerDocument) && !ownerDocument.hasFocus())
    ) {
      return;
    }
    retiredFocusDocuments.current.delete(ownerDocument);
    const onFocus = (event: Event) => observeFocus(event, (event.composedPath()[0] ?? event.target) as Node | null);
    const doc = root.nodeType === 9 ? (root as Document) : undefined;
    const win = doc?.defaultView;
    let timeout: number | undefined;
    let disposed = false;
    const onWindowBlur = (event: Event) => {
      const currentWindow = doc?.defaultView;
      const generation = observationLifecycle.current.generation;
      if (!disposed && currentWindow) {
        currentWindow.clearTimeout(timeout);
        timeout = currentWindow.setTimeout(() => {
          if (!disposed && observationLifecycle.current.generation === generation) {
            observeFocus(event, null);
          }
        }, 0);
      }
    };
    const onWindowFocus = (event: Event) => observeFocus(event, null);
    const onPageHide = (event: PageTransitionEvent) => {
      if (doc && !event.persisted) {
        retiredFocusDocuments.current.add(doc);
        focusObservers.current.forEach((dispose, observedRoot) => {
          if (observedRoot === doc || observedRoot.ownerDocument === doc) {
            dispose();
          }
        });
      }
    };
    root.addEventListener('focusin', onFocus, true);
    root.addEventListener('fuiframefocus', onFocus, true);
    win?.addEventListener('blur', onWindowBlur);
    win?.addEventListener('focus', onWindowFocus);
    win?.addEventListener('pagehide', onPageHide);
    focusObservers.current.set(root, () => {
      if (disposed) {
        return;
      }
      disposed = true;
      root.removeEventListener('focusin', onFocus, true);
      root.removeEventListener('fuiframefocus', onFocus, true);
      // A captured WindowProxy can become cross-origin after its document navigates.
      const currentWindow = doc?.defaultView;
      currentWindow?.removeEventListener('blur', onWindowBlur);
      currentWindow?.removeEventListener('focus', onWindowFocus);
      currentWindow?.removeEventListener('pagehide', onPageHide);
      currentWindow?.clearTimeout(timeout);
      if (doc) {
        currentWindow?.clearInterval(framePolls.current.get(doc));
        framePolls.current.delete(doc);
      }
      focusObservers.current.delete(root);
    });
  }

  const onBoundaryFocusCapture = (event: React.FocusEvent<HTMLElement>) => {
    if (open && !trapFocus) {
      observeFocus(event.nativeEvent, event.target);
    }
  };

  useIsomorphicLayoutEffect(() => {
    observationLifecycle.current.mounted = true;
    if (!open || trapFocus) {
      observationLifecycle.current.generation++;
      focusWasInside.current = false;
      focusObservations.current = [];
      focusObservers.current.forEach(dispose => dispose());
      focusObservers.current.clear();
      knownShadowRoots.current.clear();
      return;
    }
    // Surviving listeners and learned portal roots stay attached across commits.
    [contentRef.current, triggerRef.current].forEach(element => {
      if (element) {
        observeRootChain(element);
        if (isFocusInside(getDeepActiveElement(element.ownerDocument))) {
          focusWasInside.current = true;
        }
      }
    });
    knownShadowRoots.current.forEach(root => {
      observeRoot(root);
      observeRoot(root.ownerDocument);
    });
    scheduleFocusReconciliation();
  });
  useIsomorphicLayoutEffect(() => {
    const observers = focusObservers.current;
    const lifecycle = observationLifecycle.current;
    return () => {
      lifecycle.mounted = false;
      lifecycle.generation++;
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
