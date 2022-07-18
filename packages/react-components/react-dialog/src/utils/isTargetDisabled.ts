import * as React from 'react';

export function isTargetDisabled(e: React.SyntheticEvent | Event) {
  const isDisabled = (el: HTMLElement) =>
    el.hasAttribute('disabled') || (el.hasAttribute('aria-disabled') && el.getAttribute('aria-disabled') === 'true');
  if (e.target instanceof HTMLElement && isDisabled(e.target)) {
    return true;
  }

  return e.currentTarget instanceof HTMLElement && isDisabled(e.currentTarget);
}
