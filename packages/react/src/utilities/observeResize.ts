import { getWindow } from '@fluentui/utilities';

/**
 * Wrapper for ResizeObserver, with fallback for browsers that don't support ResizeObserver.
 *
 * Calls the onResize callback once layout is complete, and again whenever any of the target(s) change size.
 * Or if ResizeObserver isn't supported, calls the callback whenever the window changes size.
 *
 * @param target - Either a single element, or array of elements to watch for size changes.
 * @param onResize - Callback to be notified when layout is complete, and when the target(s) change size.
 *    If this browser supports ResizeObserver, the callback will be passed the ResizeObserverEntry[] array.
 *    Otherwise, the entries array will be undefined, and you'll need to find another way to get the element's size,
 *    (e.g. clientWidth/clientHeight or getBoundingClientRect).
 *
 * @returns A function to clean up the observer/listener.
 */
export const observeResize = (
  target: Element | Element[],
  onResize: (entries: readonly ResizeObserverEntry[] | undefined) => void,
): (() => void) => {
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(onResize);

    if (Array.isArray(target)) {
      target.forEach(t => observer.observe(t));
    } else {
      observer.observe(target);
    }

    return () => observer.disconnect();
  } else {
    // Fallback for browsers that don't support ResizeObserver
    const onResizeWrapper = () => onResize(undefined);

    const win = getWindow(Array.isArray(target) ? target[0] : target);
    if (!win) {
      // Can't listen for resize if we can't get the window object
      return () => {
        // Nothing to clean up
      };
    }

    // Listen for the first animation frame, which will happen after layout is complete
    const animationFrameId = win.requestAnimationFrame(onResizeWrapper);
    win.addEventListener('resize', onResizeWrapper, false);

    return () => {
      win.cancelAnimationFrame(animationFrameId);
      win.removeEventListener('resize', onResizeWrapper, false);
    };
  }
};

/** Temporary type definition for ResizeObserver. Can be removed when official types are available. */
type ResizeObserver = {
  new (callback: (entries: readonly ResizeObserverEntry[], observer: ResizeObserver) => void): ResizeObserver;
  observe(target: Element, options?: { box: 'content-box' | 'border-box' }): void;
  unobserve(target: Element): void;
  disconnect(): void;
};

/** Temporary type definition for ResizeObserverEntry. Can be removed when official types are available. */
type ResizeObserverEntry = {
  readonly contentRect: DOMRectReadOnly;
  readonly target: Element;
};

/** Temporary definition for ResizeObserver. Can be removed when official types are available. */
declare const ResizeObserver: ResizeObserver | undefined;
