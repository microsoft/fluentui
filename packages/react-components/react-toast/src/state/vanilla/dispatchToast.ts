import { ToastOptions } from '../types';
import { EVENTS } from '../constants';

let counter = 0;

export function dispatchToast(content: unknown, options: ToastOptions = {}, targetDocument: Document) {
  options.toastId ??= (counter++).toString();
  const event = new CustomEvent<ToastOptions>(EVENTS.show, {
    bubbles: false,
    cancelable: false,
    detail: { ...options, content },
  });
  targetDocument.dispatchEvent(event);
}
