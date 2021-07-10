import * as React from 'react';
import { FUI_FRAME_EVENT } from './useFrameFocusDispatch';

export const useFrameListener = (callback: (e: Event) => void, $document: Document) => {
  const listener = React.useCallback(
    (e: Event) => {
      if (callback) {
        callback(e);
      }
    },
    [callback],
  );

  React.useEffect(() => {
    $document.addEventListener(FUI_FRAME_EVENT, listener);

    return () => {
      $document.removeEventListener(FUI_FRAME_EVENT, listener);
    };
  }, [$document, listener]);
};
