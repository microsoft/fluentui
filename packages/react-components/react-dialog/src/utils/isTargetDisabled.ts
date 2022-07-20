import * as React from 'react';

export function isTargetDisabled(event: React.SyntheticEvent | Event) {
  const isDisabled = (el: HTMLElement) =>
    el.hasAttribute('disabled') || (el.hasAttribute('aria-disabled') && el.getAttribute('aria-disabled') === 'true');
  if (isHTMLElement(event.target) && isDisabled(event.target as HTMLElement)) {
    return true;
  }

  return isHTMLElement(event.currentTarget) && isDisabled(event.currentTarget);
}

function isHTMLElement(element: object | null): element is HTMLElement {
  return Boolean(element && typeof element === 'object' && 'hasAttribute' in element && 'getAttribute' in element);
}
