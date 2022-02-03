/** Raises a click event.
 * @deprecated Moved to `FocusZone` component since it was the only place internally using this function.
 */
export function raiseClick(target: Element): void {
  const event = createNewEvent('MouseEvents');
  event.initEvent('click', true, true);
  target.dispatchEvent(event);
}

function createNewEvent(eventName: string): Event {
  let event;
  if (typeof Event === 'function') {
    // Chrome, Opera, Firefox
    event = new Event(eventName);
  } else {
    // IE
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  return event;
}
