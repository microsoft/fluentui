import { ShowToastEventDetail, ToastOptions } from '../types';
import { EVENTS } from '../constants';

let counter = 0;

export function dispatchToast(content: unknown, options: Partial<ToastOptions> = {}, targetDocument: Document) {
  const detail: ShowToastEventDetail = {
    ...options,
    content,
    toastId: options.toastId ?? (counter++).toString(),
  };
  const event = new CustomEvent<ShowToastEventDetail>(EVENTS.show, {
    bubbles: false,
    cancelable: false,
    detail,
  });
  targetDocument.dispatchEvent(event);
}
