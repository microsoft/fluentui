import { EVENTS } from '../constants';
import type { PlayToastEventDetail, ToastId, ToasterId } from '../types';

export function playToast(
  toastId: ToastId,
  toasterId: ToasterId | undefined = undefined,
  targetDocument: Document,
): void {
  const event = new CustomEvent<PlayToastEventDetail>(EVENTS.play, {
    bubbles: false,
    cancelable: false,
    detail: { toastId, toasterId },
  });
  targetDocument.dispatchEvent(event);
}
