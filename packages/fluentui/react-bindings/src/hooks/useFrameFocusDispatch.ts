import * as React from 'react';

export const FUI_FRAME_EVENT = 'fuiframefocus';

export const useFrameFocusDispatch = (
  enableFrameFocusDispatch: boolean,
  $document: Document,
  pollDuration: number = 1000,
) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    if (enableFrameFocusDispatch) {
      timeoutRef.current = setInterval(() => {
        const activeElement = $document?.activeElement;
        if (activeElement?.tagName === 'IFRAME') {
          const event = new CustomEvent(FUI_FRAME_EVENT, { bubbles: true });
          activeElement.dispatchEvent(event);
        }
      }, pollDuration);
    }
    return () => {
      clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
    };
  }, [$document?.activeElement, enableFrameFocusDispatch, pollDuration]);
};
