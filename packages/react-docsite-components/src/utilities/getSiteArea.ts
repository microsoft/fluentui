import { INavPage } from '../components/Nav/index';
import { getNormalizedPath, normalizePath } from './getNormalizedPath';
import { removeAnchorLink } from './removeAnchorLink';

/**
 * Retrieves the current top level page name defined in the pages array from the window URL or the passed hash.
 * @param pages - Array of pages.
 * @param hashOrUrl - The hash or new URL, if getting the area for something besides the current page
 */
export function getSiteArea(pages?: INavPage[], hashOrUrl?: string): string {
  hashOrUrl = hashOrUrl ? normalizePath(removeAnchorLink(hashOrUrl)) : getNormalizedPath();
  // Get the first level from the URL as a fallback. "#/controls/web/button" would be "controls"
  const topLevel = hashOrUrl.indexOf('#/') > -1 ? hashOrUrl.split('#/')[1].split('/')[0] : '';
  const urlRegex = new RegExp(`\^#/${topLevel}\\b`);
  let area = topLevel;
  if (pages) {
    for (const page of pages) {
      // Test if the page url starts with '#/' + the topLevel string
      if (page.url && urlRegex.test(page.url)) {
        area = page.title;
        break;
      }
    }
  }
  return area;
}
