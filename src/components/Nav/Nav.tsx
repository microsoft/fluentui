import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import './Nav.scss';

import {
  INavProps,
  INavLinkGroup,
  INavLink } from './Nav.Props';

export interface INavState {
  isGroupExpanded: boolean[];
}

export class Nav extends React.Component<INavProps, INavState> {

  public static defaultProps: INavProps = {
    groups: null,
    onRenderLink: (link: INavLink) => (<span className='ms-Nav-linkText'>{ link.name }</span>)
  };

  constructor() {
    super();

    this.state = {
      isGroupExpanded: []
    };
  }

  public render(): React.ReactElement<{}> {
    if (!this.props.groups) {
      return null;
    }

    const groupElements: React.ReactElement<{}>[] = this.props.groups.map(
      (group: INavLinkGroup, groupIndex: number) => this._renderGroup(group, groupIndex));

    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <nav role='navigation' className={'ms-Nav' + (this.props.isOnTop ? ' is-onTop ms-u-slideRightIn40' : '')}>
          { groupElements }
        </nav>
      </FocusZone>
    );
  }

  private _renderAnchorLink(link: INavLink): React.ReactElement<{}> {
    return (<a className={'ms-Nav-link' + (_isLinkSelected(link) ? ' is-selected' : '')}
              href={ link.url || 'javascript:' }
              onClick={ this.props.onLinkClick }
              title={ link.name }
            >
              { this.props.onRenderLink(link) }
          </a>);
  }

  private _renderCompositeLink(link: INavLink, linkIndex: number): React.ReactElement<{}> {
    return (
      <div key={ linkIndex } className={ 'ms-Nav-links' + (link.isExpanded ? ' is-expanded' : ' is-collapsed') }>
          <button
              className='ms-Nav-chevronButton ms-Nav-chevronButton--link'
              onClick={ this._onLinkExpandClicked.bind(this, link) }
              title={ (link.isExpanded ? this.props.expandedStateText : this.props.collapsedStateText) }
          >
            <i className='ms-Nav-chevron ms-Icon ms-Icon--chevronDown'></i>
          </button>
          { this._renderAnchorLink(link) }
      </div>
     );
  }

  private _renderLink(link: INavLink, linkIndex: number, level: number): React.ReactElement<{}> {
    return (
      <li key={ linkIndex }>
         {(level === 0 && link.links && link.links.length > 0 ?
            this._renderCompositeLink(link, linkIndex)  :  this._renderAnchorLink(link)
         )}
          { (link.isExpanded ? this._renderLinks(link.links, ++level) : null) }
      </li>
    );
  }

  private _renderLinks(links: INavLink[], level: number): React.ReactElement<{}> {
    if (!links || !links.length) {
      return null;
    }

    const linkElements: React.ReactElement<{}>[] = links.map(
      (link: INavLink, linkIndex: number) => this._renderLink(link, linkIndex, level));

    return (
      <ul>
        { linkElements }
      </ul>
    );
  }

  private _renderGroup(group: INavLinkGroup, groupIndex: number): React.ReactElement<{}> {
    const isGroupExpanded: boolean = this.state.isGroupExpanded[groupIndex] !== false;

    return (
      <div key={ groupIndex } className={ 'ms-Nav-group' + (isGroupExpanded ? ' is-expanded' : ' is-collapsed') }>
        { (group.name ?
        <button
          className='ms-Nav-chevronButton ms-Nav-chevronButton--group'
          onClick={ this._onGroupHeaderClicked.bind(this, groupIndex) }
        >
          <i className='ms-Nav-chevron ms-Icon ms-Icon--chevronDown'></i>
          { group.name }
        </button> : null)
        }

        <div className='ms-Nav-groupContent ms-u-slideDownIn20'>
        { this._renderLinks(group.links, 0) }
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

  private _onLinkExpandClicked(link: INavLink, ev: React.MouseEvent): void {
    link.isExpanded = !link.isExpanded;
    this.forceUpdate();

    ev.preventDefault();
    ev.stopPropagation();
  }
}

// A tag used for resolving links.
const _urlResolver = document.createElement('a');

function _isLinkSelected(link: INavLink): boolean {
    if (!link.url) {
      return false;
    }
    _urlResolver.href = link.url || '';
    const target: string = _urlResolver.href;

    if (location.protocol + '//' + location.host + location.pathname === target) {
      return true;
    }

    if (location.href === target) {
      return true;
    }

    if (location.hash) {
      // Match the hash to the url.
      if (location.hash === link.url) {
        return true;
      }

      // Match a rebased url. (e.g. #foo becomes http://hostname/foo)
      _urlResolver.href = location.hash.substring(1);

      return _urlResolver.href === target;
    }

    return false;
  }
