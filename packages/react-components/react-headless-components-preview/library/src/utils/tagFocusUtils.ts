/**
 * CSS selector used to locate focusable tag elements inside a TagPickerGroup.
 *
 * The focusgroup polyfill manages roving `tabindex` on the tags, so items carry
 * `tabindex="-1"` and remain programmatically focusable without filtering by value.
 */
const FOCUSABLE_TAG_SELECTOR = 'button, [tabindex]';

/**
 * Returns the NodeList of focusable tag elements within `container`, or an empty
 * NodeList when the container has no matching children.
 */
function getFocusableTags(container: HTMLElement): NodeListOf<HTMLElement> {
  return container.querySelectorAll<HTMLElement>(FOCUSABLE_TAG_SELECTOR);
}

/**
 * Moves focus to the last focusable element within the tag group container.
 * Does nothing when the container is empty or contains no focusable tags.
 */
export function focusLastTag(container: HTMLElement): void {
  const focusable = getFocusableTags(container);
  focusable[focusable.length - 1]?.focus();
}

/**
 * Returns `true` when `target` is the last focusable element within the tag
 * group container; `false` otherwise (including when the container is empty).
 */
export function isLastFocusableTag(container: HTMLElement, target: HTMLElement): boolean {
  const focusable = getFocusableTags(container);
  return focusable.length > 0 && focusable[focusable.length - 1] === target;
}
