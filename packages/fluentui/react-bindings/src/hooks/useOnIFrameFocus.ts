import { useIFrameFocusDispatch } from './useIFrameFocusDispatch';
import { useIFrameListener } from './useIFrameListener';

/**
 * It enabables a interval to check if the iframe is focused and executes the callback function.
 */
export const useOnIFrameFocus = (
  enableFrameFocusDispatch: boolean,
  targetDocument: Document,
  cb: (e: Event) => void,
) => {
  useIFrameFocusDispatch(enableFrameFocusDispatch, targetDocument);
  useIFrameListener(enableFrameFocusDispatch, cb, targetDocument);
};
