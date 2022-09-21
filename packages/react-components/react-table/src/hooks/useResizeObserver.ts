function hasResizeObserver() {
  return typeof window.ResizeObserver !== 'undefined';
}

import * as React from 'react';

type UseResizeObserverOptionsType<T> = {
  ref: React.RefObject<T | undefined> | undefined;
  onResize: () => void;
};

export function useResizeObserver<T extends Element>(options: UseResizeObserverOptionsType<T>) {
  const { ref, onResize } = options;

  React.useEffect(() => {
    const element = ref?.current;
    if (!element) {
      return;
    }

    if (!hasResizeObserver()) {
      window.addEventListener('resize', onResize, false);
      return () => {
        window.removeEventListener('resize', onResize, false);
      };
    } else {
      const resizeObserverInstance = new window.ResizeObserver(entries => {
        if (!entries.length) {
          return;
        }

        onResize();
      });
      resizeObserverInstance.observe(element);

      return () => {
        if (element) {
          resizeObserverInstance.unobserve(element);
        }
      };
    }
  }, [onResize, ref]);
}
