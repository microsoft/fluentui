import { INavPage } from '../components/Nav/index';
import { removeAnchorLink } from './removeAnchorLink';

/**
 * Retrieves the current top level page name defined in the pages array from the window URL or the passed hash.
 * @param pages - Array of pages.
 * @param hash - The hash.
 */

export function getSiteArea(pages?: INavPage[], hash: string = location.hash): string {
  hash = removeAnchorLink(hash);
  const topLevel = hash.indexOf('#/') > -1 ? hash.split('#/')[1].split('/')[0] : '';
  let area = topLevel;
  if (pages) {
    for (const page of pages) {
      if (page.url.indexOf(topLevel) === 2) {
        area = page.title;
        break;
      }
    }
  }
  return area;
}
