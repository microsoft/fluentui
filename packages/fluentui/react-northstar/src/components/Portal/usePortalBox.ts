import { useIsomorphicLayoutEffect } from '@fluentui/react-bindings';
import * as React from 'react';

import { isBrowser } from '../../utils/isBrowser';

type UsePortalBoxOptions = {
  className: string;
  rtl: boolean;
  target: Document | undefined;
};

export const usePortalBox = (options: UsePortalBoxOptions): HTMLDivElement | null => {
  const { className, rtl, target } = options;

  const element: HTMLDivElement | null = React.useMemo(() => {
    const newElement = isBrowser() && target ? target.createElement('div') : null;

    // Element should be attached to DOM during render to make elements that will be rendered
    // inside accessible in effects of child components
    if (newElement) {
      target.body.appendChild(newElement);
    }

    return newElement;
  }, [target]);

  useIsomorphicLayoutEffect(() => {
    const classes = className.split(' ').filter(Boolean);

    if (element) {
      element.classList.add(...classes);

      if (rtl) {
        element.setAttribute('dir', 'rtl');
      } else {
        element.removeAttribute('dir');
      }
    }

    return () => {
      if (element) {
        element.classList.remove(...classes);
        element.removeAttribute('dir');
      }
    };
  }, [className, element, rtl]);

  // This effect should always last as it removes element from HTML tree
  React.useEffect(() => {
    return () => {
      if (element) {
        target.body.removeChild(element);
      }
    };
  }, [element, target]);

  return element;
};
