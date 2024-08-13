import { useIFrameFocusDispatch } from './useIFrameFocusDispatch';
import { useIFrameListener } from './useIFrameListener';

/**
 * A hook that creates an interval to check if the iframe is focused and executes the callback function once it happens.
 */
export const useOnIFrameFocus = (
  enableFrameFocusDispatch: boolean,
  targetDocument: Document,
  cb: (e: Event) => void,
) => {
  useIFrameFocusDispatch(enableFrameFocusDispatch, targetDocument);
  useIFrameListener(enableFrameFocusDispatch, cb, targetDocument);
};
