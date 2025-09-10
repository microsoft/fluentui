import { EVENTS } from '../constants';
import { DismissAllToastsEventDetail, ToasterId } from '../types';

export function dismissAllToasts(toasterId: ToasterId | undefined = undefined, targetDocument: Document): void {
  const event = new CustomEvent<DismissAllToastsEventDetail>(EVENTS.dismissAll, {
    bubbles: false,
    cancelable: false,
    detail: { toasterId },
  });
  targetDocument.dispatchEvent(event);
}
