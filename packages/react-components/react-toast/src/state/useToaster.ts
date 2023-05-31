import * as React from 'react';
import { useForceUpdate } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { Toaster } from './vanilla/toaster';
import { Toast, ToastPosition, ToasterOptions } from './types';
import { ToasterProps } from '../components/Toaster';

export function useToaster<TElement extends HTMLElement>(options: ToasterProps = {}) {
  const forceRender = useForceUpdate();
  const toasterOptions = useToasterOptions(options);
  const [toaster] = React.useState(() => new Toaster());
  const { targetDocument } = useFluent();

  React.useEffect(() => {
    if (targetDocument) {
      toaster.connectToDOM(targetDocument, toasterOptions);
      toaster.onUpdate = forceRender;
    }

    return () => toaster.disconnect();
  }, [toaster, forceRender, toasterOptions, targetDocument]);

  const toastsToRender = (() => {
    if (!toaster) {
      return new Map<ToastPosition, Toast[]>();
    }

    const toRender = new Map<ToastPosition, Toast[]>();
    const toasts = Array.from(toaster.toasts.values());

    toasts.forEach(toast => {
      const { position } = toast;
      toRender.has(position) || toRender.set(position, []);
      toRender.get(position)!.push(toast);
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
