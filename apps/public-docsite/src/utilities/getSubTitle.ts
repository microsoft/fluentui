import { SiteDefinition } from '../SiteDefinition/index';
import { Platforms } from '../interfaces/Platforms';

/**
 * Gets the page subtitle based on the active platform.
 * @param platform The active platform for the page.
 */
export const getSubTitle = (platform: Platforms): string => {
  return platform !== 'default' && SiteDefinition.platforms![platform] ? SiteDefinition.platforms![platform]!.name : '';
};
