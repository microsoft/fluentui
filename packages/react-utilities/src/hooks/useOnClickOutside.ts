import * as React from 'react';
import { useEventCallback } from './useEventCallback';

export type UseOnClickOrScrollOutsideOptions = {
  /**
   * The element to listen for the click event
   */
  element: Document | undefined;
  /**
   * Refs to elements that check if the click is outside
   */
  refs: React.MutableRefObject<HTMLElement | undefined | null>[];

  /**
   * By default uses element.contains, but custom contain function can be provided
   * @param parentRef - provided parent ref
   * @param child - event target element
   */
  contains?(parent: HTMLElement | null, child: HTMLElement): boolean;

  /**
   * Disables event listeners
   */
  disabled?: boolean;

  /**
   * Called if the click is outside the element refs
   */
  callback: (ev: MouseEvent | TouchEvent) => void;
};

/**
 * Utility to perform checks where a click/touch event was made outside a component
 */
export const useOnClickOutside = (options: UseOnClickOrScrollOutsideOptions) => {
  const { refs, callback, element, disabled, contains: containsProp } = options;
  const timeoutId = React.useRef<number | undefined>(undefined);
  useIFrameFocus(!disabled, element, callback as (e: Event) => void);

  const listener = useEventCallback((ev: MouseEvent | TouchEvent) => {
    const contains: UseOnClickOrScrollOutsideOptions['contains'] =
      containsProp || ((parent, child) => !!parent?.contains(child));

    const isOutside = refs.every(ref => !contains(ref.current || null, ev.target as HTMLElement));
    if (isOutside && !disabled) {
      callback(ev);
    }
  });

  React.useEffect(() => {
    // Store the current event to avoid triggering handlers immediately
    // Note this depends on a deprecated but extremely well supported quirk of the web platform
    // https://github.com/facebook/react/issues/20074
    let currentEvent = getWindowEvent(window);

    const conditionalHandler = (event: MouseEvent | TouchEvent) => {
      // Skip if this event is the same as the one running when we added the handlers
      if (event === currentEvent) {
        currentEvent = undefined;
        return;
      }

      listener(event);
    };

    if (!disabled) {
      // use capture phase because React can update DOM before the event bubbles to the document
      element?.addEventListener('click', conditionalHandler, true);
      element?.addEventListener('touchstart', conditionalHandler, true);
      element?.addEventListener('contextmenu', conditionalHandler, true);
    }

    // Garbage collect this event after it's no longer useful to avoid memory leaks
    timeoutId.current = window.setTimeout(() => {
      currentEvent = undefined;
    }, 1);

    return () => {
      element?.removeEventListener('click', conditionalHandler, true);
      element?.removeEventListener('touchstart', conditionalHandler, true);
      element?.removeEventListener('contextmenu', conditionalHandler, true);

      clearTimeout(timeoutId.current);
      currentEvent = undefined;
    };
  }, [listener, element, disabled]);
};

const getWindowEvent = (target: Node | Window): Event | undefined => {
  if (target) {
    if (typeof (target as Window).window === 'object' && (target as Window).window === target) {
      // eslint-disable-next-line deprecation/deprecation
      return target.event;
    }

    // eslint-disable-next-line deprecation/deprecation
    return (target as Node).ownerDocument?.defaultView?.event ?? undefined;
  }

  return undefined;
};

const FUI_FRAME_EVENT = 'fuiframefocus';

/**
 * Since click events do not propagate past iframes, we use focus to detect if a
 * click has happened inside an iframe, since the only ways of focusing inside an
 * iframe are:
 *   - clicking inside
 *   - tabbing inside
 *
 * Polls the value of `document.activeElement`. If it is an iframe, then dispatch
 * a custom DOM event. When the custom event is received call the provided callback
 *
 * @param enableFrameFocusDispatch - boolean flag to start dispatching events
 * @param targetDocument - the document to dispatch events and set timeouts
 * @param pollDuration  - in milliseconds
 */
const useIFrameFocus = (
  enableFrameFocusDispatch: boolean,
  targetDocument: Document | undefined,
  callback: (e: Event) => void,
  pollDuration: number = 1000,
) => {
  const timeoutRef = React.useRef<number>();

  const listener = useEventCallback((e: Event) => {
    if (callback) {
      callback(e);
    }
  });

  // Adds listener to the custom iframe focus event
  React.useEffect(() => {
    if (enableFrameFocusDispatch) {
      targetDocument?.addEventListener(FUI_FRAME_EVENT, listener, true);
    }
    return () => {
      targetDocument?.removeEventListener(FUI_FRAME_EVENT, listener, true);
    };
  }, [targetDocument, enableFrameFocusDispatch, listener]);

  // Starts polling for the active element
  React.useEffect(() => {
    if (enableFrameFocusDispatch) {
      timeoutRef.current = targetDocument?.defaultView?.setInterval(() => {
        const activeElement = targetDocument?.activeElement;
        if (activeElement?.tagName === 'IFRAME') {
          const event = new CustomEvent(FUI_FRAME_EVENT, { bubbles: true });
          activeElement.dispatchEvent(event);
        }
      }, pollDuration);
    }
    return () => {
      targetDocument?.defaultView?.clearTimeout(timeoutRef.current);
    };
  }, [targetDocument, enableFrameFocusDispatch, pollDuration]);
};
