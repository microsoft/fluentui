import { canUseDOM } from '@fluentui/react-utilities';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * This hook does two things:
 *  - reports width of the element whose ref has been passed as the parameter
 *  - as the parent resizes, it sets the ref element width to always fill the parent
 *
 * It creates a dummy element adjacent to the one we are trying to measure and
 * uses it to track the available space for the element.
 *
 * This approach is also faster than trying to measure the final element (e.g. a table)
 * which can take much more time to be laid out than an empty div.
 *
 * @param el element to measure and report width on
 * @returns
 */
export function useMeasureElement(el: HTMLElement | null) {
  const [width, setWidth] = useState(0);
  const container = useRef<HTMLElement | null>(null);

  // the handler for resize observer
  const handleResize = useCallback(() => {
    const w = container.current?.getBoundingClientRect().width;
    setWidth(w || 0);
  }, []);

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver] = useState(canUseDOM() ? new ResizeObserver(handleResize) : undefined);

  // After the ResizeObserver is created or the currentContainer reference has been changed(created),
  // update the observer
  React.useEffect(() => {
    if (el && resizeObserver) {
      // If the refs changed, clean up the previous measuring element and resizeObserver listener
      if (container.current) {
        container.current.remove();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      container.current = document.createElement('div');
      el.insertAdjacentElement('beforebegin', container.current);
      resizeObserver?.observe(container.current);
      handleResize();
    }
    return () => {
      container.current?.remove();
      container.current = null;
      resizeObserver?.disconnect();
    };
  }, [el, handleResize, resizeObserver]);

  // Update the element width based on the measuring container width
  useEffect(() => {
    el &&
      Object.assign(el.style, {
        width: `${width}px`,
      });
  }, [el, width]);

  return width;
}
