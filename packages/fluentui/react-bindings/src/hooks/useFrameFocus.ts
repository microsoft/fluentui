import { useFrameFocusDispatch } from './useFrameFocusDispatch';
import { useFrameListener } from './useFrameListener';

export const useOnFrameFocus = (enableFrameFocusDispatch: boolean, $document: Document, cb: (e: Event) => void) => {
  useFrameFocusDispatch(enableFrameFocusDispatch, $document);
  useFrameListener(enableFrameFocusDispatch, cb, $document);
};
