import { EVENTS } from '../constants';
import { PlayToastEventDetail, ToastId, ToasterId } from '../types';

export function playToast(toastId: ToastId, toasterId: ToasterId | undefined = undefined, targetDocument: Document) {
  const event = new CustomEvent<PlayToastEventDetail>(EVENTS.play, {
    bubbles: false,
    cancelable: false,
    detail: { toastId, toasterId },
  });
  targetDocument.dispatchEvent(event);
}
