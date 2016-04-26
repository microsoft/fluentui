import * as React from 'react';

import FocusZone from '../../utilities/focus/FocusZone';
import './Nav.scss';
import {
  INavProps,
  INavLinkGroup,
  INavLink } from './Nav.Props';

export interface INavState {
  isGroupExpanded: boolean[];
}

export default class Nav extends React.Component<INavProps, INavState> {

  constructor() {
    super();

    this.state = {
      isGroupExpanded: []
    };
  }

  public static defaultProps: INavProps = {
    groups: null,
    onRenderLink: (link: INavLink) => (<span className='ms-Nav-linkText'>{ link.name }</span>)
  };

  private static isSelected(link: INavLink): boolean {
    return link.url && (location.hash === link.url || location.href === link.url);
  }

  public render(): React.ReactElement<{}> {
    if (!this.props.groups) {
      return null;
    }

    const groupElements: React.ReactElement<{}>[] = this.props.groups.map(
      (group: INavLinkGroup, groupIndex: number) => this.renderGroup(group, groupIndex));

    return (
      <FocusZone>
        <nav role='navigation' className={'ms-Nav' + (this.props.isOnTop ? ' is-onTop ms-u-slideRightIn40' : '')}>
          { groupElements }
        </nav>
      </FocusZone>
    );
  }

  private renderLink(link: INavLink, linkIndex: number): React.ReactElement<{}> {
    return (
      <li key={ linkIndex }>
        <a
          className={'ms-Nav-link' + (Nav.isSelected(link) ? ' is-selected' : '')}
          href={ link.url || 'javascript://' }
          onClick={ this.props.onLinkClick }
        >
          { this.props.onRenderLink(link) }
        </a> { this.renderLinks(link.links) }
    </li>
    );
  }

  private renderLinks(links: INavLink[]): React.ReactElement<{}> {
    if (!links || !links.length) {
      return null;
    }

    const linkElements: React.ReactElement<{}>[] = links.map(
      (link: INavLink, linkIndex: number) => this.renderLink(link, linkIndex));

    return (
      <ul>
        { linkElements }
      </ul>
    );
  }

  private renderGroup(group: INavLinkGroup, groupIndex: number): React.ReactElement<{}> {
    const isGroupExpanded: boolean = this.state.isGroupExpanded[groupIndex] !== false;

    return (
      <div key={ groupIndex } className={ 'ms-Nav-group' + (isGroupExpanded ? ' is-expanded' : '') }>
        { (group.name ?
        <button
          className='ms-Nav-groupButton'
          onClick={ this._onGroupHeaderClicked.bind(this, groupIndex) }
        >
          <i className='ms-Nav-groupChevron ms-Icon ms-Icon--chevronDown'></i>
          { group.name }
        </button> : null)
        }

        <div className='ms-Nav-groupContent ms-u-slideDownIn20'>
        { this.renderLinks(group.links) }
        </div>
      </div>
    );
  }

  private _onGroupHeaderClicked(groupIndex: number, ev: React.MouseEvent): void {
    const currentState: boolean = this.state.isGroupExpanded[groupIndex] !== false;

    this.state.isGroupExpanded[groupIndex] = !currentState;
    this.forceUpdate();

    ev.preventDefault();
    ev.stopPropagation();
  }
}
