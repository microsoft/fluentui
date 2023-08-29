import * as React from 'react';
import { useEventCallback } from './useEventCallback';

/**
 * @internal
 */
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
   *
   * @param parent - provided parent element
   * @param child - event target element
   */
  contains?(parent: HTMLElement | null, child: HTMLElement): boolean;

  /**
   * Disables event listeners
   */
  disabled?: boolean;

  /**
   * Disables custom focus event listeners for iframes
   */
  disabledFocusOnIframe?: boolean;

  /**
   * Called if the click is outside the element refs
   */
  callback: (ev: MouseEvent | TouchEvent) => void;
};

const DEFAULT_CONTAINS: UseOnClickOrScrollOutsideOptions['contains'] = (parent, child) => !!parent?.contains(child);

/**
 * @internal
 * Utility to perform checks where a click/touch event was made outside a component
 */
export const useOnClickOutside = (options: UseOnClickOrScrollOutsideOptions) => {
  const { refs, callback, element, disabled, disabledFocusOnIframe, contains = DEFAULT_CONTAINS } = options;
  const timeoutId = React.useRef<number | undefined>(undefined);

  useIFrameFocus({ element, disabled: disabledFocusOnIframe || disabled, callback, refs, contains });

  const isMouseDownInsideRef = React.useRef(false);
  const listener = useEventCallback((ev: MouseEvent | TouchEvent) => {
    if (isMouseDownInsideRef.current) {
      isMouseDownInsideRef.current = false;
      return;
    }

    const target = ev.composedPath()[0] as HTMLElement;
    const isOutside = refs.every(ref => !contains(ref.current || null, target));

    if (isOutside && !disabled) {
      callback(ev);
    }
  });

  const handleMouseDown = useEventCallback((ev: MouseEvent) => {
    // Selecting text from inside to outside will rigger click event.
    // In this case click event target is outside but mouse down event target is inside.
    // And this click event should be considered as inside click.
    isMouseDownInsideRef.current = refs.some(ref => contains(ref.current || null, ev.target as HTMLElement));
  });

  React.useEffect(() => {
    if (disabled) {
      return;
    }

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

    // use capture phase because React can update DOM before the event bubbles to the document
    element?.addEventListener('touchstart', conditionalHandler, true);
    element?.addEventListener('mouseup', conditionalHandler, true);
    element?.addEventListener('mousedown', handleMouseDown, true);

    // Garbage collect this event after it's no longer useful to avoid memory leaks
    timeoutId.current = window.setTimeout(() => {
      currentEvent = undefined;
    }, 1);

    return () => {
      element?.removeEventListener('touchstart', conditionalHandler, true);
      element?.removeEventListener('mouseup', conditionalHandler, true);
      element?.removeEventListener('mousedown', handleMouseDown, true);

      clearTimeout(timeoutId.current);
      currentEvent = undefined;
    };
  }, [listener, element, disabled, handleMouseDown]);
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

interface UseIFrameFocusOptions
  extends Pick<UseOnClickOrScrollOutsideOptions, 'disabled' | 'element' | 'callback' | 'contains' | 'refs'> {
  /**
   * Millisecond duration to poll
   */
  pollDuration?: number;
}

/**
 * Since click events do not propagate past iframes, we use focus to detect if a
 * click has happened inside an iframe, since the only ways of focusing inside an
 * iframe are:
 *   - clicking inside
 *   - tabbing inside
 *
 * Polls the value of `document.activeElement`. If it is an iframe, then dispatch
 * a custom DOM event. When the custom event is received call the provided callback
 */
const useIFrameFocus = (options: UseIFrameFocusOptions) => {
  const {
    disabled,
    element: targetDocument,
    callback,
    contains = DEFAULT_CONTAINS,
    pollDuration = 1000,
    refs,
  } = options;
  const timeoutRef = React.useRef<number>();

  const listener = useEventCallback((e: Event) => {
    const isOutside = refs.every(ref => !contains(ref.current || null, e.target as HTMLElement));

    if (isOutside && !disabled) {
      callback(e as MouseEvent);
    }
  });

  // Adds listener to the custom iframe focus event
  React.useEffect(() => {
    if (disabled) {
      return;
    }

    targetDocument?.addEventListener(FUI_FRAME_EVENT, listener, true);

    return () => {
      targetDocument?.removeEventListener(FUI_FRAME_EVENT, listener, true);
    };
  }, [targetDocument, disabled, listener]);

  // Starts polling for the active element
  React.useEffect(() => {
    if (disabled) {
      return;
    }

    timeoutRef.current = targetDocument?.defaultView?.setInterval(() => {
      const activeElement = targetDocument?.activeElement;

      if (activeElement?.tagName === 'IFRAME' || activeElement?.tagName === 'WEBVIEW') {
        const event = new CustomEvent(FUI_FRAME_EVENT, { bubbles: true });
        activeElement.dispatchEvent(event);
      }
    }, pollDuration);

    return () => {
      targetDocument?.defaultView?.clearTimeout(timeoutRef.current);
    };
  }, [targetDocument, disabled, pollDuration]);
};
