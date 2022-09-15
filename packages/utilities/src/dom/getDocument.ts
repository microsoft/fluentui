import { canUseDOM } from './canUseDOM';

/**
 * Helper to get the document object. Note that in popup window cases, document
 * might be the wrong document, which is why we look at ownerDocument for the
 * truth.
 *
 * @public
 */
export function getDocument(rootElement?: HTMLElement | null): Document | undefined {
  if (!canUseDOM() || typeof document === 'undefined') {
    return undefined;
  } else {
    const el = rootElement as Element;

    return el && el.ownerDocument ? el.ownerDocument : document;
  }
}
