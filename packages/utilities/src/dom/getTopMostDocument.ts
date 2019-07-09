/**
 * Helper to get the top-most document object.
 *
 * @public
 */
export function getTopMostDocument(): Document | undefined {
  let current = window;
  while (current.parent !== current) {
    current = current.parent;
  }

  return current.document;
}
