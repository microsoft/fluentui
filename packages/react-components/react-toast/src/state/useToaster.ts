import * as React from 'react';
import { useEventCallback, useForceUpdate } from '@fluentui/react-utilities';
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

    const cleanupBuildListener = addToastListener(EVENTS.show, buildToast);
    const cleanupUpdateListener = addToastListener(EVENTS.update, updateToast);
    const cleanupDismissListener = addToastListener(EVENTS.dismiss, dismissToast);
    const cleanupDismissAllListener = addToastListener(EVENTS.dismissAll, dismissAllToasts);

    return () => {
      cleanupBuildListener();
      cleanupDismissAllListener();
      cleanupUpdateListener();
      cleanupDismissListener();
    };
  }, [toaster, forceUpdate, targetDocument, isCorrectToaster]);

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
