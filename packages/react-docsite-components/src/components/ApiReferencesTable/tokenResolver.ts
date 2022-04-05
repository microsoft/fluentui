import { ILinkToken } from '@fluentui/react/lib/common/DocPage.types';
import { TokenResolver } from './ApiReferencesTableSet.types';
import { getCurrentUrl } from '../../utilities/getCurrentUrl';

/**
 * Get a default token resolver for resolving links within the Fabric website or demo app.
 * @param currentUrl - Mock current URL for testing purposes (otherwise uses the actual current URL)
 */
export function getTokenResolver(currentUrl?: string): TokenResolver {
  // Get the area path to set correct href value on the links for the local site vs. the Fabric site.
  // The "area path" for this purpose is typically /controls/web/ (website) or /examples/ (demo).
  const currentRoute = (currentUrl || getCurrentUrl()).split('#')[1] || '';
  // Remove the possible references/ part when matching
  const areaPathMatch = currentRoute.match(/^(\/.+?\/)(references\/)?\w+$/);
  const areaPath = (areaPathMatch && areaPathMatch[1]) || '/controls/web/';

  return (token: Required<ILinkToken>) => {
    // Currently the group is only relevant if it's references
    const group = token.linkedPageGroup.toLowerCase() === 'references' ? 'references/' : '';

    const linkRoute = `${areaPath}${group}${token.linkedPage.toLowerCase()}`;
    const newTab = linkRoute !== currentRoute;

    return {
      href: `#${linkRoute}#${token.text}`,
      target: newTab ? '_blank' : undefined,
    };
  };
}
