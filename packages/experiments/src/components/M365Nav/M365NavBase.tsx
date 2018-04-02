/* tslint:disable */
import { IM365NavLink, IM365NavProps } from './M365Nav.types';
import { INav } from 'office-ui-fabric-react/lib/components/Nav';
import { INavState } from 'office-ui-fabric-react/lib/components/Nav/Nav.base';
import * as React from 'react';
/* tslint:enable */

export class M365NavBase extends React.Component<IM365NavProps, INavState> implements INav {
  constructor(props: IM365NavProps) {
    super(props);
  }

  public get selectedKey(): string | undefined {
    return this.state.selectedKey;
  }

  protected getPreferredSelectedKey(): string {
    let selectedKey: string = '';

    // if caller passes in selectedKey, use it as first choice or use current state.selectedKey
    if (this.props.selectedKey) {
      selectedKey = this.props.selectedKey;
    } else if (this.state.selectedKey) {
      selectedKey = this.state.selectedKey;
    }

    return selectedKey;
  }

  /* given a link, find if one of the child is selected */
  protected isChildLinkSelected(link: IM365NavLink): boolean {
    const selectedKey = this.getPreferredSelectedKey();

    if (!selectedKey || !link || !link.links || link.links.length === 0) {
      return false;
    }

    return link.links.some((childLink: IM365NavLink) => {
      return !!childLink && childLink.key === selectedKey;
    });
  }

  // given a link and an optional includeChildren parameter, find if the link or any of the children is selected
  protected isLinkSelected(link: IM365NavLink, includeChildren: boolean): boolean {
    const selectedKey = this.getPreferredSelectedKey();

    if (!selectedKey || !link) {
      return false;
    }

    // check if the link or any of the child link is selected
    return link.key === selectedKey ||
      (includeChildren && this.isChildLinkSelected(link));
  }
}
