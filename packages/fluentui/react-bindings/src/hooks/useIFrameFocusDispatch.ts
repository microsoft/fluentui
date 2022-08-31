import * as React from 'react';

export const FUI_FRAME_EVENT = 'fuiframefocus';

/**
 * Watch the `document.activeElement` and dispatch a custom event if the current active element is a iframe.
 */
export const useIFrameFocusDispatch = (
  enableFrameFocusDispatch: boolean,
  targetDocument: Document,
  pollDuration: number = 1000,
) => {
  const timeoutRef = React.useRef<number>();

  React.useEffect(() => {
    if (enableFrameFocusDispatch) {
      timeoutRef.current = targetDocument?.defaultView?.setInterval(() => {
        const activeElement = targetDocument?.activeElement;
        if (activeElement?.tagName === 'IFRAME' || activeElement?.tagName === 'WEBVIEW') {
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
