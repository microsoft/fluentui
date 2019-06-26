/** Raises a click event. */
export function raiseClick(target: Element): void {
  const event = createNewEvent('MouseEvents');
  event.initEvent('click', true, true);
  target.dispatchEvent(event);
}

function createNewEvent(eventName: string): Event {
  let event;
  // Chrome, Opera, Firefox
  if (typeof Event === 'function') {
    event = new Event(eventName);
  } else {
    // IE
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  return event;
}
