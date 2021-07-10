import { useFrameFocusDispatch } from './useFrameFocusDispatch';
import { useFrameListener } from './useFrameListener';

export const useFrameFocus = (enableFrameFocusDispatch: boolean, $document: Document, cb: (e: Event) => void) => {
  useFrameFocusDispatch(enableFrameFocusDispatch, $document);
  useFrameListener(cb, $document);
};
