import { getActiveElement } from '../../hooks/top-layer/utils';

const tabStops =
  'a[href], area[href], button, input:not([type="hidden"]), select, textarea, iframe, audio[controls], video[controls], ' +
  'details > summary:first-of-type, [contenteditable]:not([contenteditable="false"]), [tabindex]';

const tryFocus = (target: HTMLElement): boolean => {
  if (target.closest('[hidden], [inert], [aria-hidden="true"]') || target.matches(':disabled')) {
    return false;
  }
  target.focus({ preventScroll: true });
  return getActiveElement(target) === target;
};

/** Prefer the slide's focus stop, then sequentially focusable content, then the group itself. */
export function focusCarouselPage(page: HTMLElement): void {
  if (Array.from(page.querySelectorAll<HTMLElement>('[aria-roledescription="slide"]')).some(tryFocus)) {
    return;
  }
  for (const target of Array.from(page.querySelectorAll<HTMLElement>(tabStops))) {
    // For named radios, :indeterminate means that no radio in the group is checked.
    if (
      (!target.hasAttribute('tabindex') || target.tabIndex >= 0) &&
      !target.matches('input[type="radio"][name]:not([name=""]):not(:checked):not(:indeterminate)') &&
      tryFocus(target)
    ) {
      return;
    }
  }
  if (!page.hasAttribute('tabindex')) {
    page.setAttribute('tabindex', '-1');
    page.addEventListener('blur', () => page.removeAttribute('tabindex'), { once: true });
  }
  tryFocus(page);
}
