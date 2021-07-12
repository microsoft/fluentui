import * as React from 'react';
import { FUI_FRAME_EVENT } from './useIFrameFocusDispatch';

export const useIFrameListener = (
  enableFrameFocusDispatch: boolean,
  callback: (e: Event) => void,
  targetDocument: Document,
) => {
  const listener = React.useCallback(
    (e: Event) => {
      if (callback) {
        callback(e);
      }
    },
    [callback],
  );

  React.useEffect(() => {
    if (enableFrameFocusDispatch) {
      targetDocument?.addEventListener(FUI_FRAME_EVENT, listener);
    }
    return () => {
      targetDocument?.removeEventListener(FUI_FRAME_EVENT, listener);
    };
  }, [targetDocument, enableFrameFocusDispatch, listener]);
};
