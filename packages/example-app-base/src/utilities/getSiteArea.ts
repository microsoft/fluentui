import { INavPage } from '../components/Nav/index';
import { removeAnchorLink } from './removeAnchorLink';

/**
 * Retrieves the current top level page name defined in the pages array from the window URL or the passed hash.
 * @param pages - Array of pages.
 * @param hash - The hash.
 */
export function getSiteArea(pages?: INavPage[], hash: string = location.hash): string {
  hash = removeAnchorLink(hash).split('?')[0];
  // Get the first level from the URL as a fallback. "#/controls/web/button" would be "controls"
  const topLevel = hash.indexOf('#/') > -1 ? hash.split('#/')[1].split('/')[0] : '';
  const urlRegex = new RegExp(`\^#/${topLevel}\\b`);
  let area = topLevel;
  if (pages) {
    for (const page of pages) {
      // Test if the page url starts with '#/' + the topLevel string
      if (urlRegex.test(page.url)) {
        area = page.title;
        break;
      }
    }
  }
  return area;
}
