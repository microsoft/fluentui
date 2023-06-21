import * as React from 'react';
import { useEventCallback, useForceUpdate } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { createToaster } from './vanilla';
import { Toast, ToastListenerMap, ToastPosition, ToasterId, ToasterOptions } from './types';
import { ToasterProps } from '../components/Toaster';
import { EVENTS } from './constants';

export function useToaster<TElement extends HTMLElement>(options: ToasterProps = {}) {
  const forceUpdate = useForceUpdate();
  const toasterOptions = useToasterOptions(options);
  const [toaster] = React.useState(() => createToaster(toasterOptions));
  const { targetDocument } = useFluent();

  const isCorrectToaster = useEventCallback((toasterId: ToasterId | undefined) => {
    return toasterId === toasterOptions.toasterId;
  });

  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }

    const buildToast: ToastListenerMap[typeof EVENTS.show] = e => {
      if (!isCorrectToaster(e.detail.toasterId)) {
        return;
      }

      toaster.buildToast(e.detail, forceUpdate);
      forceUpdate();
    };

    const dismissToast: ToastListenerMap[typeof EVENTS.dismiss] = e => {
      if (!isCorrectToaster(e.detail.toasterId)) {
        return;
      }

      toaster.dismissToast(e.detail.toastId);
      forceUpdate();
    };

    const updateToast: ToastListenerMap[typeof EVENTS.update] = e => {
      if (!isCorrectToaster(e.detail.toasterId)) {
        return;
      }

      toaster.updateToast(e.detail);
      forceUpdate();
    };

    const dismissAllToasts: ToastListenerMap[typeof EVENTS.dismissAll] = e => {
      if (!isCorrectToaster(e.detail.toasterId)) {
        return;
      }

      toaster.dismissAllToasts();
      forceUpdate();
    };

    targetDocument.addEventListener(EVENTS.show, buildToast as () => void);
    targetDocument.addEventListener(EVENTS.dismiss, dismissToast as () => void);
    targetDocument.addEventListener(EVENTS.update, updateToast as () => void);
    targetDocument.addEventListener(EVENTS.dismissAll, dismissAllToasts as () => void);

    return () => {
      targetDocument.removeEventListener(EVENTS.show, buildToast as () => void);
      targetDocument.removeEventListener(EVENTS.dismiss, dismissToast as () => void);
      targetDocument.removeEventListener(EVENTS.update, updateToast as () => void);
      targetDocument.removeEventListener(EVENTS.dismissAll, dismissAllToasts as () => void);
    };
  }, [toaster, forceUpdate, isCorrectToaster, targetDocument]);

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
  };
}

function useToasterOptions(options: ToasterProps): Partial<ToasterOptions> {
  const { pauseOnHover, pauseOnWindowBlur, position, timeout, limit, toasterId } = options;

  return React.useMemo<Partial<ToasterOptions>>(
    () => ({
      pauseOnHover,
      pauseOnWindowBlur,
      position,
      timeout,
      limit,
      toasterId,
    }),
    [pauseOnHover, pauseOnWindowBlur, position, timeout, limit, toasterId],
  );
}
