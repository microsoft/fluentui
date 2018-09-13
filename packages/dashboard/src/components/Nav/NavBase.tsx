/* tslint:disable */
import { INavLink, INavProps, INavState } from './Nav.types';
import * as React from 'react';
/* tslint:enable */

export class NavBase extends React.Component<INavProps, INavState> {
  protected _hasAtleastOneHiddenLink = false;

  constructor(props: INavProps) {
    super(props);

    this.state = {
      isNavCollapsed: this.props.isNavCollapsed ? this.props.isNavCollapsed : false,
      showMore: this.props.showMore ? this.props.showMore : false
    };

    this._onShowMoreLinkClicked = this._onShowMoreLinkClicked.bind(this);
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

  protected _onShowMoreLinkClicked(ev: React.MouseEvent<HTMLElement>): void {
    console.log('hey');
    this.setState({
      showMore: !this.state.showMore
    });

    ev.preventDefault();
    ev.stopPropagation();
  }
}
