import { EVENTS } from '../constants';
import type { DismissToastEventDetail, ToastId, ToasterId } from '../types';

export function dismissToast(
  toastId: ToastId,
  toasterId: ToasterId | undefined = undefined,
  targetDocument: Document,
): void {
  const event = new CustomEvent<DismissToastEventDetail>(EVENTS.dismiss, {
    bubbles: false,
    cancelable: false,
    detail: { toastId, toasterId },
  });
  targetDocument.dispatchEvent(event);
}
