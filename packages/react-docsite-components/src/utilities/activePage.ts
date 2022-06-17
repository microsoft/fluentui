import { INavPage } from '../components/Nav/index';
import { getNormalizedPath, normalizePath } from './getNormalizedPath';
import { ISiteDefinition } from './SiteDefinition.types';

/**
 * Returns whether the given page URL or hash route is active.
 * Non-hash URLs are assumed to be external and therefore never active since the current component
 * implementations in this package assume hash routing in many places.
 * @param pageUrl URL or hash route for a page
 * @param currentPath Optional current normalized path (optimization if calling this multiple times)
 */
export function isPageActive(pageUrl: string, currentPath?: string): boolean {
  if (pageUrl[0] !== '#') {
    return false; // external link => can't be active
  }
  currentPath = currentPath || getNormalizedPath();
  return normalizePath(pageUrl) === currentPath;
}

/**
 * Returns whether the given page or a child (for the current platform, if provided) is active.
 * @param page Page to check
 * @param platform Current platform
 * @param currentPath Optional current normalized path (optimization if calling this multiple times)
 */
export function hasActiveChild<TPlatforms extends string = string>(
  page: INavPage<TPlatforms>,
  platform?: TPlatforms,
  currentPath?: string,
): boolean {
  return !!getActivePage(page, platform, currentPath);
}

/**
 * Checks if any of the pages in the object (either site definition or nav page) are active or have
 * an active child (for the current platform, if provided), and returns the active page if found.
 * @param parent Page or site definition to check
 * @param platform Current platform
 * @param currentPath Optional current normalized path (optimization if calling this multiple times)
 */
export function getActivePage<TPlatforms extends string = string>(
  parent: INavPage<TPlatforms> | ISiteDefinition<TPlatforms>,
  platform?: TPlatforms,
  currentPath?: string,
): INavPage<TPlatforms> | undefined {
  if (!parent) {
    return undefined;
  }

  if (_isPage(parent) && isPageActive(parent.url!, currentPath)) {
    return parent;
  }

  let pages: INavPage[] = [];

  const platformPages = platform && parent.platforms && parent.platforms[platform];
  if (platformPages) {
    pages = pages.concat(platformPages as INavPage<TPlatforms>[]);
  }

  if (parent.pages) {
    pages = pages.concat(parent.pages);
  }

  for (const childPage of pages) {
    const activePage = getActivePage(childPage, platform, currentPath);
    if (activePage) {
      return activePage;
    }
  }
}

function _isPage<TPlatforms extends string = string>(
  parent: INavPage<TPlatforms> | ISiteDefinition<TPlatforms>,
): parent is INavPage<TPlatforms> {
  return !!(parent as INavPage).url;
}
