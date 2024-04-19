import { EVENTS } from '../constants';
import { PauseToastEventDetail, ToastId, ToasterId } from '../types';

export function pauseToast(toastId: ToastId, toasterId: ToasterId | undefined = undefined, targetDocument: Document) {
  const event = new CustomEvent<PauseToastEventDetail>(EVENTS.pause, {
    bubbles: false,
    cancelable: false,
    detail: { toastId, toasterId },
  });
  targetDocument.dispatchEvent(event);
}
