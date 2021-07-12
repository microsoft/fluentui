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
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    if (enableFrameFocusDispatch) {
      timeoutRef.current = setInterval(() => {
        const activeElement = targetDocument?.activeElement;
        if (activeElement?.tagName === 'IFRAME') {
          const event = new CustomEvent(FUI_FRAME_EVENT, { bubbles: true });
          activeElement.dispatchEvent(event);
        }
      }, pollDuration);
    }
    return () => {
      clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
    };
  }, [targetDocument, enableFrameFocusDispatch, pollDuration]);
};
