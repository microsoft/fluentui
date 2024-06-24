import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { debounce } from '../utilities/debounce';
import { createResizeObserverFromDocument } from '../utilities/createResizeObserverFromDocument';
import { ResizeCallbackWithRef } from './hooks.types';

/**
 * useResizeObserverRef_unstable simplifies resize observer connection and ensures debounce/cleanup
 */
export const useResizeObserverRef_unstable = (resizeCallback: ResizeCallbackWithRef) => {
  'use no memo';

  const { targetDocument } = useFluent();
  const container = React.useRef<HTMLElement | null>(null);
  // the handler for resize observer
  // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286
  // eslint-disable-next-line no-restricted-globals
  const handleResize = debounce((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
    resizeCallback(entries, observer, container);
  });

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver, setResizeObserver] = React.useState(() =>
    createResizeObserverFromDocument(targetDocument, handleResize),
  );

  React.useEffect(() => {
    // Update our state when resizeCallback changes
    container.current = null;
    resizeObserver?.disconnect();
    setResizeObserver(() => createResizeObserverFromDocument(targetDocument, handleResize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizeCallback, targetDocument]);

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
