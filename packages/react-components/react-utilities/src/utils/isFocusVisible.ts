/**
 * Checks if an element matches `:focus-visible`, i.e. the browser would show a focus indicator for it,
 * usually because it was focused with the keyboard.
 *
 * @internal
 * @returns `undefined` when the browser does not support `:focus-visible`, callers decide the fallback.
 */
export function isFocusVisible(element: Element): boolean | undefined {
  try {
    return element.matches(':focus-visible');
  } catch {
    return undefined;
  }
}
