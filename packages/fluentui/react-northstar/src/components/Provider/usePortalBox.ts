import { useIsomorphicLayoutEffect } from '@fluentui/react-bindings';
import * as React from 'react';

import isBrowser from '../../utils/isBrowser';

type UsePortalBoxOptions = {
  className: string;
  rtl: boolean;
  target: Document;
};

export const PortalBoxContext = React.createContext<HTMLDivElement>(null);

const usePortalBox = (options: UsePortalBoxOptions): HTMLDivElement => {
  const { className, rtl, target } = options;

  const element: HTMLDivElement | null = React.useMemo(() => (isBrowser() ? target.createElement('div') : null), [
    target,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (element) {
      target.body.appendChild(element);
    }

    return () => {
      if (element) {
        target.body.removeChild(element);
      }
    };
  }, []);
  useIsomorphicLayoutEffect(() => {
    if (element) {
      element.setAttribute('class', className);

      if (rtl) {
        element.setAttribute('dir', 'rtl');
      } else {
        element.removeAttribute('dir');
      }
    }
  }, [className, rtl]);

  return element;
};

export default usePortalBox;
