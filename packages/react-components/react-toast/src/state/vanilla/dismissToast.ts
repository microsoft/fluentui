import { EVENTS } from '../constants';
import { DismissToastEventDetail, ToastId } from '../types';

export function dismissToast(toastId: ToastId | undefined = undefined, targetDocument: Document) {
  const event = new CustomEvent<DismissToastEventDetail>(EVENTS.dismiss, {
    bubbles: false,
    cancelable: false,
    detail: { toastId },
  });
  targetDocument.dispatchEvent(event);
}
