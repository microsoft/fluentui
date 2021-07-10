import * as React from 'react';

export const FUI_FRAME_EVENT = 'fuiframefocus';

export const useFrameFocusDispatch = (enableFrameFocusDispatch: boolean, $document: Document) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    if (enableFrameFocusDispatch) {
      timeoutRef.current = setInterval(() => {
        if ($document.activeElement?.tagName === 'IFRAME') {
          const event = new CustomEvent(FUI_FRAME_EVENT, { bubbles: true });
          $document.activeElement.dispatchEvent(event);
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
    };
  }, [$document.activeElement, enableFrameFocusDispatch]);
};
