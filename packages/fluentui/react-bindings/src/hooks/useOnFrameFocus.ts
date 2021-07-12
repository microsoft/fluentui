import { useFrameFocusDispatch } from './useFrameFocusDispatch';
import { useFrameListener } from './useFrameListener';

/**
 * It enabables a interval to check if the iframe is focused and executes the callback function.
 */
export const useOnFrameFocus = (enableFrameFocusDispatch: boolean, $document: Document, cb: (e: Event) => void) => {
  useFrameFocusDispatch(enableFrameFocusDispatch, $document);
  useFrameListener(enableFrameFocusDispatch, cb, $document);
};
