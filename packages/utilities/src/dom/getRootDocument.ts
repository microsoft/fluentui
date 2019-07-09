import { getWindow } from './getWindow';

/**
 * Helper to get the top-most document object.
 *
 * @public
 */
export function getRootDocument(): Document | undefined {
  let current = getWindow();
  while (current!.parent !== current) {
    current = current!.parent;
  }

  return current.document;
}
