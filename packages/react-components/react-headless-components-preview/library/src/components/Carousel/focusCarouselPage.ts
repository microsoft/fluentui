import { getActiveElement } from '../../hooks/top-layer/utils';

const tabStops =
  'a[href], area[href], button, input:not([type="hidden"]), select, textarea, iframe, audio[controls], video[controls], ' +
  'details > summary:first-of-type, [contenteditable]:not([contenteditable="false"]), [tabindex]';

const isSequential = (target: HTMLElement): boolean =>
  (!target.hasAttribute('tabindex') || target.tabIndex >= 0) && !target.matches(':disabled');

const tryFocus = (target: HTMLElement): boolean => {
  if (target.closest('[hidden], [inert], [aria-hidden="true"]') || target.matches(':disabled')) {
    return false;
  }
  target.focus({ preventScroll: true });
  return getActiveElement(target) === target;
};

// Whether the page's own content hides the target: hidden, inert, display:none, a closed details body or a visibility
// that the page doesn't share. The generated page's inactive state is ignored.
const isConcealedWithin = (target: HTMLElement, page: HTMLElement): boolean => {
  const win = page.ownerDocument.defaultView;
  for (let node: HTMLElement | null = target; node && node !== page; node = node.parentElement) {
    const parent: HTMLElement | null = node.parentElement;
    if (
      node.hidden ||
      node.hasAttribute('inert') ||
      win?.getComputedStyle(node).display === 'none' ||
      (parent?.matches('details:not([open])') && node !== parent.querySelector(':scope > summary'))
    ) {
      return true;
    }
  }
  const visibility = win?.getComputedStyle(target).visibility;
  return !!visibility && visibility !== 'visible' && visibility !== win?.getComputedStyle(page).visibility;
};

/**
 * Whether the group's own content provides a sequential focus stop, irrespective of whether the group itself is
 * currently hidden.
 */
export function hasTabStop(page: HTMLElement): boolean {
  return Array.from(page.querySelectorAll<HTMLElement>(tabStops)).some(
    target => isSequential(target) && !isConcealedWithin(target, page),
  );
}

/** Prefer the slide's focus stop, then sequentially focusable content, then the group itself. */
export function focusCarouselPage(page: HTMLElement): void {
  if (Array.from(page.querySelectorAll<HTMLElement>('[aria-roledescription="slide"]')).some(tryFocus)) {
    return;
  }
  for (const target of Array.from(page.querySelectorAll<HTMLElement>(tabStops))) {
    // For named radios, :indeterminate means that no radio in the group is checked.
    if (
      isSequential(target) &&
      !target.matches('input[type="radio"][name]:not([name=""]):not(:checked):not(:indeterminate)') &&
      tryFocus(target)
    ) {
      return;
    }
  }
  if (!page.hasAttribute('tabindex')) {
    page.setAttribute('tabindex', '-1');
    page.addEventListener(
      'blur',
      () => {
        // The group may have become a persistent focus stop in the meantime.
        if (page.getAttribute('tabindex') === '-1') {
          page.removeAttribute('tabindex');
        }
      },
      { once: true },
    );
  }
  tryFocus(page);
}

/** Focus the selected group, clamped to the groups that are still rendered. */
export function focusSelectedPage(viewport: HTMLElement | null, index: number): void {
  const page = viewport?.children[Math.min(index, viewport.children.length - 1)];
  if (page) {
    focusCarouselPage(page as HTMLElement);
  }
}
