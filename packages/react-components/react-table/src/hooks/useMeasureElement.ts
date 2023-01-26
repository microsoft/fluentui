import { canUseDOM } from '@fluentui/react-utilities';
import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

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
  const [width, setWidth] = React.useState(0);
  const container = React.useRef<HTMLElement | undefined>(undefined);

  const fluent = useFluent();
  const { targetDocument } = fluent;

  // the handler for resize observer
  const handleResize = React.useCallback(() => {
    const w = container.current?.getBoundingClientRect().width;
    setWidth(w || 0);
  }, []);

  // Keep the reference of ResizeObserver in the state, as it should live through renders
  const [resizeObserver] = React.useState(canUseDOM() ? new ResizeObserver(handleResize) : undefined);

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

      container.current = targetDocument?.createElement('div');
      if (container.current) {
        el.insertAdjacentElement('beforebegin', container.current);
        resizeObserver?.observe(container.current);
        handleResize();
      }
    }
    return () => {
      container.current?.remove();
      container.current = undefined;
      resizeObserver?.disconnect();
    };
  }, [el, targetDocument, handleResize, resizeObserver]);

  // Update the element width based on the measuring container width
  React.useEffect(() => {
    el &&
      Object.assign(el.style, {
        width: `${width}px`,
      });
  }, [el, width]);

  return width;
}
