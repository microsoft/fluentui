/* tslint:disable */
import { INavLink, INavProps, INavState } from './Nav.types';
import * as React from 'react';
/* tslint:enable */

export class NavBase extends React.Component<INavProps, INavState> {
  protected _hasAtleastOneHiddenLink = false;

  constructor(props: INavProps) {
    super(props);
  }

  /* given a link, find if one of the child is selected */
  protected isChildLinkSelected(link: INavLink): boolean {
    if (!link || !link.links || link.links.length === 0) {
      return false;
    }

    return link.links.some((childLink: INavLink) => {
      return !!childLink && childLink.isSelected;
    });
  }

  protected getLinkText(link: INavLink, showMore?: boolean): string | undefined {
    if (!link) {
      return undefined;
    }

    if (link.isShowMoreLink && !showMore && link.alternateText) {
      // if the link is show more/less link, based on the showMore state; return "Show more" localized text
      return link.alternateText;
    }

    return link.name;
  }

  // find if atleast one child link is visible using isHidden property
  // showMore flag will overwrite isHidden property
  protected hasAtleastOneVisibleLink(links: INavLink[], showMore?: boolean): boolean {
    if (!links || links.length === 0) {
      return false;
    }

    return (
      links.some(
        (link: INavLink): boolean => {
          return !link.isHidden;
        }
      ) || !!showMore
    );
  }
}
