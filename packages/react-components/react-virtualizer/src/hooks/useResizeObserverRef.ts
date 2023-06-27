import * as React from 'react';
import { debounce } from '../utilities/debounce';
import { canUseDOM } from '@fluentui/react-utilities';
import { ResizeCallbackWithRef } from './hooks.types';

/**
 * useResizeObserverRef_unstable simplifies resize observer connection and ensures debounce/cleanup
 */
export const useResizeObserverRef_unstable = (resizeCallback: ResizeCallbackWithRef) => {
  const container = React.useRef<HTMLElement | null>(null);
  // the handler for resize observer
  const handleResize = debounce((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
    resizeCallback(entries, observer, container);
  });

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver, setResizeObserver] = React.useState(() =>
    canUseDOM() ? new ResizeObserver(handleResize) : undefined,
  );

  React.useEffect(() => {
    // Update our state when resizeCallback changes
    container.current = null;
    resizeObserver?.disconnect();
    setResizeObserver(canUseDOM() ? new ResizeObserver(handleResize) : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizeCallback]);

  React.useEffect(() => {
    return () => {
      container.current = null;
      resizeObserver?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollRef = React.useCallback(
    (instance: HTMLElement | HTMLDivElement | null) => {
      if (container.current !== instance) {
        if (container.current) {
          resizeObserver?.unobserve(container.current);
        }

        container.current = instance;
        if (container.current) {
          resizeObserver?.observe(container.current);
        }
      }
    },
    [resizeObserver],
  );

  return scrollRef;
};
