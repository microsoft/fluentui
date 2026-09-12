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
  const [intersecting, setIntersecting] = React.useState(false);
  const IntersectionObserverConstructor = targetDocument?.defaultView?.IntersectionObserver;
  const visible = !enabled || !IntersectionObserverConstructor || intersecting;

  React.useEffect(() => {
    if (!enabled || !element || !IntersectionObserverConstructor) {
      return;
    }

    const observer = new IntersectionObserverConstructor(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { root, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, enabled, root, rootMargin, IntersectionObserverConstructor]);

  return {
    ref: React.useCallback((next: TElement | null) => setElement(next), []),
    visible,
  };
};
