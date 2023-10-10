/** Raises a click event.
 * @deprecated Moved to `FocusZone` component since it was the only place internally using this function.
 */
export function raiseClick(
  target: Element,
  // eslint-disable-next-line no-restricted-globals
  doc: Document = document,
): void {
  const event = createNewEvent('MouseEvents', doc);
  // eslint-disable-next-line deprecation/deprecation
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
    // eslint-disable-next-line deprecation/deprecation
    event.initEvent(eventName, true, true);
  }
  return event;
}
