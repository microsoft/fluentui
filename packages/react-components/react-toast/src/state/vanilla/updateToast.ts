import { UpdateToastEventDetail } from '../types';
import { EVENTS } from '../constants';

export function updateToast(options: UpdateToastEventDetail, targetDocument: Document) {
  const event = new CustomEvent<UpdateToastEventDetail>(EVENTS.update, {
    bubbles: false,
    cancelable: false,
    detail: options,
  });

  targetDocument.dispatchEvent(event);
}
