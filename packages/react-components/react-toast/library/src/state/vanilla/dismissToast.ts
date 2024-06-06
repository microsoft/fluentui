import { EVENTS } from '../constants';
import { DismissToastEventDetail, ToastId, ToasterId } from '../types';

export function dismissToast(toastId: ToastId, toasterId: ToasterId | undefined = undefined, targetDocument: Document) {
  const event = new CustomEvent<DismissToastEventDetail>(EVENTS.dismiss, {
    bubbles: false,
    cancelable: false,
    detail: { toastId, toasterId },
  });
  targetDocument.dispatchEvent(event);
}
