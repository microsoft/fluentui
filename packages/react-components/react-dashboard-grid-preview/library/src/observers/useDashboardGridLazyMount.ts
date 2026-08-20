'use client';

import * as React from 'react';

export type UseDashboardGridLazyMountOptions = {
  targetDocument?: Document | null;
  enabled?: boolean;
  root?: Element | null;
  rootMargin?: string;
};

export type DashboardGridLazyMountState<TElement extends HTMLElement> = {
  ref: React.RefCallback<TElement>;
  visible: boolean;
};

export const useDashboardGridLazyMount = <TElement extends HTMLElement = HTMLDivElement>(
  options: UseDashboardGridLazyMountOptions,
): DashboardGridLazyMountState<TElement> => {
  const { targetDocument, enabled = false, root, rootMargin } = options;
  const [element, setElement] = React.useState<TElement | null>(null);
  const [visible, setVisible] = React.useState(!enabled);

  React.useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }

    if (!element) {
      return;
    }

    const IntersectionObserverConstructor = targetDocument?.defaultView?.IntersectionObserver;
    if (!IntersectionObserverConstructor) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserverConstructor(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, enabled, root, rootMargin, targetDocument]);

  return {
    ref: React.useCallback((next: TElement | null) => setElement(next), []),
    visible,
  };
};
