import { getDocument } from './getDocument';

/** Raises a click event.
 * @deprecated Moved to `FocusZone` component since it was the only place internally using this function.
 */
export function raiseClick(target: Element, doc?: Document): void {
  const theDoc = doc ?? getDocument()!;
  const event = createNewEvent('MouseEvents', theDoc);
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  event.initEvent('click', true, true);
  target.dispatchEvent(event);
}

function createNewEvent(eventName: string, doc: Document): Event {
  let event;
  if (typeof Event === 'function') {
    // Chrome, Opera, Firefox
    event = new Event(eventName);
  } else {
    // IE
    event = doc.createEvent('Event');
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    event.initEvent(eventName, true, true);
  }
  return event;
}
