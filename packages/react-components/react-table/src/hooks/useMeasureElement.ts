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
export function useMeasureElement(el: React.RefObject<HTMLElement>) {
  const [width, setWidth] = useState(0);
  const container = useRef<HTMLElement | null>(null);
  const { current: currentContainer } = container;

  // the handler for resize observer
  const _handleResize = useCallback(() => {
    const w = container.current?.getBoundingClientRect().width;
    setWidth(w || 0);
  }, [container, setWidth]);

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver] = useState(new ResizeObserver(_handleResize));

  // After the ResizeObserver is created or the currentContainer reference has been changed(created),
  // update the observer
  React.useEffect(() => {
    currentContainer && resizeObserver.observe(currentContainer);
    return () => resizeObserver.disconnect();
  }, [resizeObserver, currentContainer]);

  useEffect(() => {
    container.current = document.createElement('div');
    el.current?.insertAdjacentElement('beforebegin', container.current);
  }, [el]);

  // Update the element width based on the measuring container width
  useEffect(() => {
    el.current &&
      Object.assign(el.current.style, {
        width: `${width}px`,
      });
  }, [el, width]);

  React.useEffect(() => {
    const w = container.current?.getBoundingClientRect().width;
    setWidth(w || 0);
  }, [container]);

  return width;
}
