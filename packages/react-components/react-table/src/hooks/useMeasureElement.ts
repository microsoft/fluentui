import { canUseDOM } from '@fluentui/react-utilities';
import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * Provides a way of reporting element width.
 * Returns
 * `width` - current element width (0 by default),
 * `measureElementRef` - a ref function to be passed as `ref` to the element you want to measure
 */
export function useMeasureElement() {
  const [width, setWidth] = React.useState(0);
  const container = React.useRef<HTMLElement | undefined>(undefined);

  const fluent = useFluent();
  const { targetDocument } = fluent;

  const handleResize = React.useCallback(() => {
    const w = container.current?.getBoundingClientRect().width;
    setWidth(w || 0);
  }, []);

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver] = React.useState(canUseDOM() ? new ResizeObserver(handleResize) : undefined);

  const measureElementRef = React.useCallback(
    (el: HTMLElement | null) => {
      if (!targetDocument || !resizeObserver) {
        return;
      }

      // cleanup previous container
      if (container.current) {
        resizeObserver.unobserve(container.current);
        container.current.remove();
        container.current = undefined;
      }

      if (el) {
        container.current = targetDocument?.createElement('div');
        el.insertAdjacentElement('beforebegin', container.current);
        resizeObserver.observe(container.current);
        handleResize();
      }
    },
    [targetDocument, resizeObserver, handleResize],
  );

  return { width, measureElementRef };
}
