import { ISiteDefinition } from './SiteDefinition.types';

/**
 * Retrieves the first platform defined in the page's AppState definition.
 * @param pageTitle The title of the page as defined in AppState.
 */
export function getPageFirstPlatform<TPlatforms extends string = string>(
  pageTitle: string,
  siteDefinition: ISiteDefinition<TPlatforms>,
): TPlatforms {
  const page = siteDefinition.pages.filter(pg => pg.title === pageTitle)[0];
  if (page && page.platforms) {
    return Object.keys(page.platforms)[0] as TPlatforms;
  }
  return Object.keys(siteDefinition.platforms || {})[0] as TPlatforms;
}
