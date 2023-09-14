import { getDocument } from '@fluentui/react/lib/Utilities';
import { removeAnchorLink } from './removeAnchorLink';

/**
 * Get current hash route path, lowercase and without any trailing slash, query, or anchor
 * (will include leading #)
 */
export function getNormalizedPath() {
  let path = getDocument()?.location.hash;
  if (!path) {
    return '';
  }

  path = removeAnchorLink(path);

  return normalizePath(path);
}

/** Convert path to lowercase and remove trailing slash (doesn't check for query or anchor) */
export function normalizePath(path?: string) {
  path = path || '';
  if (path.slice(-1) === '/') {
    path = path.slice(0, -1);
  }
  return path.toLowerCase();
}
