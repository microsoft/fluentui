'use client';

import * as React from 'react';
import { useEventCallback, useForceUpdate, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isInTopLayer, isPopoverOpen, log } from './utils';
import type {
  DialogAdapter,
  LayerLifecycleCallbacks,
  ToggleEvent,
  TopLayerMode,
  TopLayerOpenChangeData,
  UseLayerOpenStateOptions,
} from './types';
import { useElementListeners } from './useElementListeners';

const POPOVER_EVENTS = ['beforetoggle', 'toggle'];
const DIALOG_EVENTS = [...POPOVER_EVENTS, 'cancel', 'close'];

const showPopover = (element: HTMLElement): boolean => {
  if (isPopoverOpen(element)) {
    return false;
  }

  if (typeof element.showPopover !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      log(
        'warn',
        'the Popover API is not supported in this browser. Include a popover polyfill for better browser support.',
      );
    }

    return false;
  }

  try {
    element.showPopover();
    return true;
  } catch {
    return false;
  }
};

/**
 * Open state of a top-layer element, kept in sync with the browser: shows and hides the element with the Popover API,
 * and reports opens and closes the browser makes.
 * For `mode="modal"`, use `useDialogLayerOpenState`.
 */
export const useLayerOpenState = (ref: React.RefObject<HTMLElement | null>, options: UseLayerOpenStateOptions): void =>
  useLayerOpenStateWith(ref, options);

/**
 * The shared implementation. Only `useDialogLayerOpenState` passes `dialog` and `lifecycle`.
 */
export const useLayerOpenStateWith = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseLayerOpenStateOptions<TopLayerMode>,
  dialog?: DialogAdapter,
  lifecycle?: LayerLifecycleCallbacks,
): void => {
  const { open, mode } = options;

  const [syncToken, resync] = React.useReducer((count: number) => count + 1, 0);
  const scheduleDevCloseCheck = useForceUpdate();

  const openRef = React.useRef(false);
  const shownElement = React.useRef<HTMLElement | null>(null);
  const shownPopoverMode = React.useRef<string | null>(null);
  // An element the browser started opening, already passed to `onBeforeShow`.
  const nativeShowElement = React.useRef<HTMLElement | null>(null);
  const warnedNativeOpen = React.useRef(false);
  const devCloseCheckPending = React.useRef(false);
  // Where the element is between show and hide, so each hide callback runs once per close.
  const phase = React.useRef<'hidden' | 'shown' | 'hiding'>('hidden');

  const notifyBeforeHide = (element: HTMLElement) => {
    if (phase.current === 'shown') {
      phase.current = 'hiding';
      lifecycle?.onBeforeHide(element);
    }
  };

  const notifyHide = (element: HTMLElement) => {
    if (phase.current !== 'hidden') {
      phase.current = 'hidden';
      lifecycle?.onHide(element);
    }
  };

  const reportNativeClose = (data: TopLayerOpenChangeData) => {
    if (!openRef.current) {
      return;
    }

    options.onOpenChange?.(false, data);

    if (process.env.NODE_ENV !== 'production') {
      devCloseCheckPending.current = true;
      scheduleDevCloseCheck();
    }
  };

  const handleBeforeToggle = (event: Event) => {
    const element = event.currentTarget as HTMLElement;
    if ((event as ToggleEvent).newState === 'closed') {
      notifyBeforeHide(element);
    } else {
      shownPopoverMode.current = element.getAttribute('popover');
      // A browser open: call `onBeforeShow` now, before `[autofocus]` takes focus, not once React accepts the open.
      if (!openRef.current && nativeShowElement.current !== element) {
        nativeShowElement.current = element;
        lifecycle?.onBeforeShow(element);
      }
    }
  };

  const handleToggle = (event: Event) => {
    const element = event.currentTarget as HTMLElement;
    const newState = (event as ToggleEvent).newState;
    if ((newState === 'open') !== isInTopLayer(element)) {
      return;
    }

    if (newState === 'open') {
      if (openRef.current) {
        return;
      }

      if (options.onOpenChange) {
        options.onOpenChange(true, { type: 'native-open', event });
      } else if (process.env.NODE_ENV !== 'production' && !warnedNativeOpen.current) {
        warnedNativeOpen.current = true;
        log(
          'warn',
          'the browser opened a top-layer element while `open` is false (e.g. a `popovertarget` invoker). ' +
            'Pass `onOpenChange` to sync it into React state.',
        );
      }

      resync();
      return;
    }

    if (dialog?.usesDialogEvents(element, mode)) {
      return;
    }

    if (openRef.current && element.getAttribute('popover') !== shownPopoverMode.current) {
      resync();
      return;
    }

    notifyHide(element);
    reportNativeClose({ type: 'light-dismiss', event });
  };

  const handleDialogEvent = (event: Event) => {
    const element = event.currentTarget as HTMLElement;
    if (event.target === element) {
      if (event.type === 'cancel') {
        notifyBeforeHide(element);
      } else if (!isInTopLayer(element)) {
        notifyHide(element);
      }
    }
    dialog?.handleEvent(event, type => reportNativeClose({ type, event }));
  };

  const handleEvent = useEventCallback((event: Event) => {
    if (event.type === 'beforetoggle') {
      handleBeforeToggle(event);
    } else if (event.type === 'toggle') {
      handleToggle(event);
    } else {
      handleDialogEvent(event);
    }
  });

  useIsomorphicLayoutEffect(() => {
    if (open && openRef.current && ref.current !== shownElement.current) {
      resync();
    }

    if (process.env.NODE_ENV !== 'production' && devCloseCheckPending.current) {
      devCloseCheckPending.current = false;
      if (open) {
        log(
          'warn',
          '`open` stayed true after `onOpenChange(false)`. The browser already closed the element, so it stays ' +
            'hidden until `open` changes.',
        );
      }
    }
  });

  useElementListeners(ref, handleEvent, element =>
    dialog?.usesDialogEvents(element, mode) ? DIALOG_EVENTS : POPOVER_EVENTS,
  );

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    const wasOpen = openRef.current;
    openRef.current = open;

    if (!open) {
      nativeShowElement.current = null;
      if (!element) {
        return;
      }

      if (isInTopLayer(element)) {
        notifyBeforeHide(element);
      }

      if (isPopoverOpen(element)) {
        element.hidePopover();
      } else {
        dialog?.hide(element);
      }

      if (!isInTopLayer(element)) {
        notifyHide(element);
      }

      return;
    }

    const fresh = !wasOpen || shownElement.current !== element;
    shownElement.current = element;

    if (!element) {
      return;
    }

    if (fresh && nativeShowElement.current !== element) {
      lifecycle?.onBeforeShow(element);
    }
    nativeShowElement.current = null;

    const shown = dialog?.show(element, mode) ?? showPopover(element);

    if (isInTopLayer(element)) {
      phase.current = 'shown';
    }

    if (fresh && (shown || isInTopLayer(element))) {
      options.onShow?.(element);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, open, mode, syncToken]);
};
