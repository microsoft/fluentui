import { INavPage } from '../components/Nav/index';
import { getPathMinusLastHash } from './getPathMinusLastHash';

const _urlResolver = document.createElement('a');

export function isPageActive(componentUrl: string): boolean {
  if (!componentUrl) {
    return false;
  }

  _urlResolver.href = componentUrl || '';
  const target: string = _urlResolver.href;
  let path = location.href;

  const exact = location.protocol + '//' + location.host + location.pathname;
  if (exact === target) {
    return true;
  }

  const hashCount = path.split('#').length - 1;
  if (hashCount > 1) {
    path = getPathMinusLastHash(path);
  }

  if (path === target) {
    return true;
  }

  return false;
}

export function hasActiveChild<TPlatforms extends string = string>(page: INavPage<TPlatforms>, platform?: TPlatforms): boolean {
  if (!page) {
    return false;
  }

  if (page.url && isPageActive(page.url)) {
    return true;
  }

  let _hasActiveChild = false;
  let pages: INavPage[] = [];

  const platformPages = platform && page.platforms && page.platforms[platform];
  if (platformPages) {
    pages = pages.concat(platformPages as INavPage<TPlatforms>[]);
  }

  if (page.pages) {
    pages = pages.concat(page.pages);
  }

  if (pages.length > 0) {
    for (const childPage of pages) {
      if (isPageActive(childPage.url)) {
        _hasActiveChild = true;
        break;
      }

      if ((platform && childPage.platforms && childPage.platforms[platform]) || childPage.pages) {
        _hasActiveChild = hasActiveChild(childPage);
        if (_hasActiveChild) {
          break;
        }
      }
    }
  }

  return _hasActiveChild;
}
