import { Updates } from '@microsoft/fast-element';

/**
 * Artificial sets the focus to the given element, if no other element in the
 * document is currently focused and the given element meets the following
 * conditions:
 *
 * - is connected to DOM
 * - has `autofocus` attribute
 * - is visible
 *
 * For more details of this issue, see https://codepen.io/editor/marchbox/pen/019e9ab9-cd81-7c21-a3ae-1b7fe2d3458a
 */
export function maybeSetAutoFocus(element: HTMLElement) {
  const doc = element.ownerDocument;
  if (
    element?.isConnected &&
    element?.hasAttribute('autofocus') &&
    // Note: opacity=0 is considered visible based on the native `autofocus` implementation
    element?.checkVisibility?.({ contentVisibilityAuto: true, visibilityProperty: true }) &&
    [null, element, doc.body, doc.documentElement].includes(doc.activeElement as HTMLElement | null)
  ) {
    Updates.enqueue(() => {
      element.focus();
    });
  }
}
