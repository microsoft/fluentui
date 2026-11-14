const EDITABLE_OR_MEDIA_SELECTOR =
  '[contenteditable=""], [contenteditable="true" i], [contenteditable="plaintext-only" i], audio[controls], video[controls]';

/**
 * Elements that are focusable without a `tabindex` attribute.
 */
export const NATURALLY_FOCUSABLE_SELECTOR = `a[href], area[href], button, input, select, textarea, iframe, object, embed, summary, ${EDITABLE_OR_MEDIA_SELECTOR}`;

/**
 * Elements that may be tab stops. Filter the matches with `getTabIndex` and a disabled/visibility check.
 */
export const FOCUSABLE_CANDIDATE_SELECTOR = `[tabindex], ${NATURALLY_FOCUSABLE_SELECTOR}`;

/**
 * The element's `tabIndex`, counting editable and media elements without a `tabindex` attribute as tab stops, since
 * some browsers report `-1` for them.
 */
export const getTabIndex = (element: HTMLElement): number =>
  !element.hasAttribute('tabindex') && element.matches(EDITABLE_OR_MEDIA_SELECTOR) ? 0 : element.tabIndex;
