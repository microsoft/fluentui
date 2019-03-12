/** Raises a click event. */
export function raiseClick(target: Element): void {
  const event = new Event('MouseEvents');

  event.initEvent('click', true, true);
  target.dispatchEvent(event);
}
