import * as React from 'react';
import { Toaster } from './vanilla/toaster';
import { useForceUpdate } from '@fluentui/react-utilities';
import { DefaultToastOptions, Toast, ToastPosition, ToasterOptions } from './types';

export function useToaster<TElement extends HTMLElement>(options: ToasterOptions = {}) {
  const forceRender = useForceUpdate();
  const defaultToastOptions = useDefaultToastOptions(options);
  const toasterRef = React.useRef<TElement>(null);
  const [toaster] = React.useState(() => new Toaster());

  React.useEffect(() => {
    if (toasterRef.current) {
      toaster.connectToDOM(toasterRef.current, defaultToastOptions);
      toaster.onUpdate = forceRender;
    }

    return () => toaster.disconnect();
  }, [toaster, defaultToastOptions, forceRender]);

  const getToastsToRender = React.useCallback(
    <T>(cb: (position: ToastPosition, toasts: Toast[]) => T) => {
      if (!toaster) {
        return [];
      }

      const toRender = new Map<ToastPosition, Toast[]>();
      const toasts = Array.from(toaster.toasts.values());

      toasts.forEach(toast => {
        const { position } = toast;
        toRender.has(position) || toRender.set(position, []);
        toRender.get(position)!.push(toast);
      });

      return Array.from(toRender, ([position, toastsToRender]) => {
        if (position.startsWith('top')) {
          toastsToRender.reverse();
        }

        return cb(position, toastsToRender);
      });
    },
    [toaster],
  );

  return {
    toasterRef,
    isToastVisible: toaster.isToastVisible,
    getToastsToRender,
  };
}

function useDefaultToastOptions(options: DefaultToastOptions) {
  const { pauseOnHover, pauseOnWindowBlur, position, timeout } = options;
  return React.useMemo<DefaultToastOptions>(
    () => ({
      ...(pauseOnHover && { pauseOnHover }),
      ...(pauseOnWindowBlur && { pauseOnWindowBlur }),
      ...(position && { position }),
      ...(timeout && { timeout }),
    }),
    [pauseOnHover, pauseOnWindowBlur, position, timeout],
  );
}
