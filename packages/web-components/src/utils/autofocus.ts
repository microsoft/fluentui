/**
 * This
 */
export function setAutoFocus(element: HTMLElement) {
  const doc = element.ownerDocument;
  if (
    element.isConnected &&
    element?.hasAttribute('autofocus') &&
    [null, element, doc.body, doc.documentElement].includes(doc.activeElement as HTMLElement | null)
  ) {
    element.focus();
  }
}
