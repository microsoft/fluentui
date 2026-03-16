/**
 * Measures the width of the scrollbar for the given document.
 *
 * @param targetDocument - Document to measure the scrollbar width
 * @returns The width of the scrollbar in pixels
 */
export function measureScrollbarWidth(targetDocument: Document): number {
  const outer = targetDocument.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';

  const inner = targetDocument.createElement('div');
  outer.appendChild(inner);

  targetDocument.body.appendChild(outer);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.remove();

  return scrollbarWidth;
}
