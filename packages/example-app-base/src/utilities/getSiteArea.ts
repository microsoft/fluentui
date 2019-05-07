import { pascalize } from './string';

/**
 * Retrieves the current top level page name from the window URL or the passed hash.
 * @param hash - The hash.
 * @param pascal - If the returned string should be in pascal case.
 */
export function getSiteArea(hash?: string, pascal?: boolean): string {
  hash = hash || window.location.hash;
  const mod = pascal !== false;
  const area = hash.indexOf('#/') > -1 ? hash.split('#/')[1].split('/')[0] : '';
  return mod ? pascalize(area) : area;
}
