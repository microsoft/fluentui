import * as React from 'react';
import { isHTMLElement, useEventCallback, useForceUpdate } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { createToaster } from './vanilla';
import type {
  CommonToastDetail,
  ShowToastEventDetail,
  Toast,
  ToastListenerMap,
  ToastPosition,
  ToasterId,
  ToasterOptions,
} from './types';
import { EVENTS } from './constants';

export function useToaster<TElement extends HTMLElement = HTMLDivElement>(options: Partial<ToasterOptions> = {}) {
  const forceUpdate = useForceUpdate();
  const { toasterId: userToasterId, shortcuts } = options;
  // Currently the toaster options can never be changed at runtime
  const [toaster] = React.useState(() => createToaster(options));
  const { targetDocument } = useFluent();

  const lastActiveElementRef = React.useRef<HTMLElement | null>(null);

  const isCorrectToaster = useEventCallback((toasterId: ToasterId | undefined) => {
    return toasterId === userToasterId;
  });

  const isFocusShortcut = useEventCallback((e: KeyboardEvent) => {
    if (shortcuts?.focus) {
      return shortcuts.focus(e);
    }
  });

  const pauseAllToasts = React.useCallback(() => {
    toaster.visibleToasts.forEach(toastId => {
      const toast = toaster.toasts.get(toastId);
      toast?.imperativeRef.current?.pause();
    });
  }, [toaster]);

  const playAllToasts = React.useCallback(() => {
    toaster.visibleToasts.forEach(toastId => {
      const toast = toaster.toasts.get(toastId);
      toast?.imperativeRef.current?.play();
    });
  }, [toaster]);

  const getMostRecentVisibleToast = React.useCallback(() => {
    return Array.from(toaster.visibleToasts).reduce((cur, next) => {
      const toast = toaster.toasts.get(next);
      if (!toast) {
        return cur;
      }

      if (!cur) {
        return toast;
      }

      if (cur.order < toast?.order) {
        return toast;
      }

      return cur;
    }, undefined as Toast | undefined);
  }, [toaster]);

  const tryRestoreFocus = React.useCallback(() => {
    const mostRecentToast = getMostRecentVisibleToast();
    if (mostRecentToast?.imperativeRef.current) {
      mostRecentToast.imperativeRef.current.focus();
    } else {
      lastActiveElementRef.current?.focus();
      lastActiveElementRef.current = null;
    }
  }, [getMostRecentVisibleToast]);

  const closeAllToasts = React.useCallback(() => {
    toaster.visibleToasts.forEach(toastId => {
      const toast = toaster.toasts.get(toastId);
      toast?.close();
    });

    tryRestoreFocus();
  }, [toaster, tryRestoreFocus]);

  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }

    const addToastListener = <TType extends keyof ToastListenerMap>(
      eventType: TType,
      callback: ToastListenerMap[TType],
    ) => {
      const listener: ToastListenerMap[TType] = (e: CustomEvent<CommonToastDetail>) => {
        if (!isCorrectToaster(e.detail.toasterId)) {
          return;
        }

        callback(e as CustomEvent<ShowToastEventDetail>);
        forceUpdate();
      };

      targetDocument.addEventListener(eventType, listener as () => void);
      return () => targetDocument.removeEventListener(eventType, listener as () => void);
    };

    const buildToast: ToastListenerMap[typeof EVENTS.show] = e => {
      toaster.buildToast(e.detail, forceUpdate);
    };

    const dismissToast: ToastListenerMap[typeof EVENTS.dismiss] = e => {
      toaster.dismissToast(e.detail.toastId);
    };

    const updateToast: ToastListenerMap[typeof EVENTS.update] = e => {
      toaster.updateToast(e.detail);
    };

    const dismissAllToasts: ToastListenerMap[typeof EVENTS.dismissAll] = e => {
      toaster.dismissAllToasts();
    };

    const pauseToast: ToastListenerMap[typeof EVENTS.pause] = e => {
      const toast = toaster.toasts.get(e.detail.toastId);
      if (toast) {
        toast.imperativeRef.current?.pause();
      }
    };

    const playToast: ToastListenerMap[typeof EVENTS.play] = e => {
      const toast = toaster.toasts.get(e.detail.toastId);
      if (toast) {
        toast.imperativeRef.current?.play();
      }
    };

    const cleanupBuildListener = addToastListener(EVENTS.show, buildToast);
    const cleanupUpdateListener = addToastListener(EVENTS.update, updateToast);
    const cleanupDismissListener = addToastListener(EVENTS.dismiss, dismissToast);
    const cleanupDismissAllListener = addToastListener(EVENTS.dismissAll, dismissAllToasts);
    const cleanupPauseListener = addToastListener(EVENTS.pause, pauseToast);
    const cleanupPlayListener = addToastListener(EVENTS.play, playToast);

    const focusShortcutListener = (e: KeyboardEvent) => {
      if (isFocusShortcut(e)) {
        pauseAllToasts();
        const mostRecentToast = getMostRecentVisibleToast();

        if (mostRecentToast) {
          lastActiveElementRef.current = isHTMLElement(targetDocument.activeElement)
            ? targetDocument.activeElement
            : null;
          mostRecentToast.imperativeRef.current?.focus();
        }
      }
    };

    targetDocument.addEventListener('keydown', focusShortcutListener);

    return () => {
      cleanupBuildListener();
      cleanupDismissAllListener();
      cleanupUpdateListener();
      cleanupDismissListener();
      cleanupPauseListener();
      cleanupPlayListener();

      targetDocument.removeEventListener('keydown', focusShortcutListener);
    };
  }, [
    toaster,
    forceUpdate,
    targetDocument,
    isCorrectToaster,
    pauseAllToasts,
    getMostRecentVisibleToast,
    isFocusShortcut,
  ]);

  const toastsToRender = (() => {
    if (!toaster) {
      return new Map<ToastPosition, Toast[]>();
    }

    const toRender = new Map<ToastPosition, Toast[]>();
    const toasts = Array.from(toaster.toasts.values());

    toasts.forEach(toast => {
      const { position } = toast;
      toRender.has(position) || toRender.set(position, []);
      if (position.startsWith('bottom')) {
        toRender.get(position)!.push(toast);
      } else {
        toRender.get(position)!.unshift(toast);
      }
    });

    return toRender;
  })();

  return {
    isToastVisible: toaster.isToastVisible,
    toastsToRender,
    pauseAllToasts,
    playAllToasts,
    tryRestoreFocus,
    closeAllToasts,
  };
}
