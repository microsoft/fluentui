import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { css } from '../../utilities/css';
import './Nav.scss';

import {
  INav,
  INavProps,
  INavLinkGroup,
  INavLink } from './Nav.Props';

export interface INavState {
  isGroupExpanded: boolean[];
}

export class Nav extends React.Component<INavProps, INavState> implements INav {

  public static defaultProps: INavProps = {
    groups: null,
    onRenderLink: (link: INavLink) => (<span className='ms-Nav-linkText'>{ link.name }</span>)
  };

  private _selectedKey: string;

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

    if (this.props.initialSelectedKey) {
      this._selectedKey = this.props.initialSelectedKey;
    }

    const groupElements: React.ReactElement<{}>[] = this.props.groups.map(
      (group: INavLinkGroup, groupIndex: number) => this._renderGroup(group, groupIndex));

    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <nav role='navigation' className={ css('ms-Nav', { 'is-onTop ms-u-slideRightIn40' : this.props.isOnTop }) }>
          { groupElements }
        </nav>
      </FocusZone>
    );
  }

  public get selectedKey(): string {
    return this._selectedKey;
  }

  private _renderLink(link: INavLink, linkIndex: number): React.ReactElement<{}> {
    let { onLinkClick } = this.props;

    const isLinkSelected: boolean = _isLinkSelected(link, this._selectedKey);
    if (isLinkSelected) {
      this._selectedKey = link.key ? link.key : undefined;
    }

    return (
      <li key={ linkIndex }>
        <a
          className={ css('ms-Nav-link', { 'is-selected' : isLinkSelected }) }
          href={ link.url || 'javascript:' }
          onClick={ onLinkClick }
          aria-label={ link.ariaLabel }
          title={ link.title ? link.title : '' }
          target={ link.target || '' }
        >
          { (link.iconClassName ?
          <i className={ css('ms-Icon', 'ms-Nav-IconLink', link.iconClassName) }></i>
          : '') }
         { this.props.onRenderLink(link)}
        </a> { this._renderLinks(link.links) }
    </li>
    );
  }

  private _renderLinks(links: INavLink[]): React.ReactElement<{}> {
    if (!links || !links.length) {
      return null;
    }

    const linkElements: React.ReactElement<{}>[] = links.map(
      (link: INavLink, linkIndex: number) => this._renderLink(link, linkIndex));

    return (
      <ul>
        { linkElements }
      </ul>
    );
  }

  private _renderGroup(group: INavLinkGroup, groupIndex: number): React.ReactElement<{}> {
    const isGroupExpanded: boolean = this.state.isGroupExpanded[groupIndex] !== false;

    return (
      <div key={ groupIndex } className={ css('ms-Nav-group', { 'is-expanded' : isGroupExpanded }) }>
        { (group.name ?
        <button
          className='ms-Nav-groupButton'
          onClick={ this._onGroupHeaderClicked.bind(this, groupIndex) }
        >
          <i className={ css('ms-Nav-groupChevron', 'ms-Icon', 'ms-Icon--chevronDown') }></i>
          { group.name }
        </button> : null)
        }

        <div className={ css('ms-Nav-groupContent', 'ms-u-slideDownIn20') }>
        { this._renderLinks(group.links) }
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

// A tag used for resolving links.
const _urlResolver = document.createElement('a');

function _isLinkSelected(link: INavLink, selectedKey: string): boolean {
    if (!link.url) {
      return false;
    }
    _urlResolver.href = link.url || '';
    const target: string = _urlResolver.href;

    if (selectedKey && link.key === selectedKey) {
      return true;
    }

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
