/**
 * Reads the `tabindex` attribute and returns it as a number.
 * Returns `NaN` when the attribute is absent or unparseable.
 */
export function getTabIndex(element: HTMLElement): number {
  const tabIndex = element.getAttribute('tabindex');
  return parseInt(tabIndex ?? '', 10);
}
