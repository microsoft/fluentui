import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { css } from '../../utilities/css';
import { getRTL } from '../../utilities/rtl';
import { Button, ButtonType } from '../../Button';
import './Nav.scss';

import {
  INav,
  INavProps,
  INavLinkGroup,
  INavLink } from './Nav.Props';

// The number pixels per indentation level for Nav links.
const _indentationSize: number = 14;
// Tne number of pixels of left margin when there is expand/collaps button
const _indentWithExpandButton: number = 28;
// Tne number of pixels of left margin when there is expand/collaps button
const _indentNoExpandButton: number = 20;

export interface INavState {
  isGroupExpanded?: boolean[];
  isLinkExpandStateChanged?: boolean;
}

export class Nav extends React.Component<INavProps, INavState> implements INav {

  public static defaultProps: INavProps = {
    groups: null,
    onRenderLink: (link: INavLink) => (<span className='ms-Nav-linkText'>{ link.name }</span>)
  };

  private _selectedKey: string;
  private _hasExpandButton: boolean;

  constructor() {
    super();

    this.state = {
      isGroupExpanded: [],
      isLinkExpandStateChanged: false
    };
    this._hasExpandButton = false;
  }

  public render(): React.ReactElement<{}> {
    if (!this.props.groups) {
      return null;
    }

    if (this.props.initialSelectedKey) {
      this._selectedKey = this.props.initialSelectedKey;
    }

    // when this.props.groups[x].name is specified or Any of the link has child link, chevorn Expand/collaps button is shown,
    // different padding is needed. _hasExpandButton marks this condition.
    this._hasExpandButton = this.props.groups.some((group: INavLinkGroup, groupIndex: number) => {
      return !!group.name || group.links && group.links.some((link: INavLink, linkIndex: number) => { return !!link.links && link.links.length > 0; });
    });

    const groupElements: React.ReactElement<{}>[] = this.props.groups.map(
      (group: INavLinkGroup, groupIndex: number) => this._renderGroup(group, groupIndex));

    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <nav role='navigation'
          className={ css('ms-Nav', { 'is-onTop ms-u-slideRightIn40': this.props.isOnTop }) }>
          { groupElements }
        </nav>
      </FocusZone>
    );
  }

  public get selectedKey(): string {
    return this._selectedKey;
  }

  private _renderAnchorLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> {
    // Determine the appropriate padding to add before this link.
    // In RTL, the "before" padding will go on the right instead of the left.
    const isRtl: boolean = getRTL();
    const paddingBefore: string = (_indentationSize * nestingLevel +
      (this._hasExpandButton ? _indentWithExpandButton : _indentNoExpandButton)).toString(10) + 'px';

    return (
        <a
          className={ css('ms-Nav-link') }
          style={ { [isRtl ? 'paddingRight' : 'paddingLeft'] : paddingBefore } }
          href={ link.url || 'javascript:' }
          onClick={ this._onNavAnchorLinkClicked.bind(this, link) }
          aria-label={ link.ariaLabel }
          title={ link.title || link.name }
          target={ link.target }
        >
         { link.iconClassName && <i className={ css('ms-Icon', 'ms-Nav-IconLink', link.iconClassName) }></i> }
         { this.props.onRenderLink(link)}
        </a>
    );
  }

  private _renderButtonLink(link: INavLink, linkIndex: number) {
    return (
      <Button
        className={ css('ms-Nav-link ms-Nav-linkButton', { 'isOnExpanded': this._hasExpandButton }) }
          buttonType={ ButtonType.command }
          icon={ link.icon }
          description={ link.title || link.name }
          onClick={ this._onNavButtonLinkClicked.bind(this, link) }>
          { link.name }
      </Button>);
  }

  private _renderCompositeLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> {
    const isLinkSelected: boolean = _isLinkSelected(link, this._selectedKey);
    if (isLinkSelected) {
      this._selectedKey = link.key ? link.key : undefined;
    }

    return (
      <div key={ link.key || linkIndex }
           className={ css('ms-Nav-compositeLink', { ' is-expanded': link.isExpanded, 'is-selected': isLinkSelected }) }>
        { (nestingLevel === 0 && link.links && link.links.length > 0 ?
          <button
            buttonType={ ButtonType.icon }
            className='ms-Nav-chevronButton ms-Nav-chevronButton--link'
            onClick={ this._onLinkExpandClicked.bind(this, link) }
            title={ (link.isExpanded ? this.props.expandedStateText : this.props.collapsedStateText) }
            >
            <i className='ms-Nav-chevron ms-Icon ms-Icon--ChevronDown'></i>
          </button> : null
        )}
          { !!link.onClick ? this._renderButtonLink(link, linkIndex) : this._renderAnchorLink(link, linkIndex, nestingLevel) }
      </div>
     );
  }

  private _renderLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> {
    return (
      <li key={ link.key || linkIndex } role='listitem'>
         { this._renderCompositeLink(link, linkIndex, nestingLevel) }
          { (link.isExpanded ? this._renderLinks(link.links, ++nestingLevel) : null) }
      </li>
    );
  }

  private _renderLinks(links: INavLink[], nestingLevel: number): React.ReactElement<{}> {
    if (!links || !links.length) {
      return null;
    }
    const linkElements: React.ReactElement<{}>[] = links.map(
      (link: INavLink, linkIndex: number) => this._renderLink(link, linkIndex, nestingLevel));

    return (
      <ul role='list' aria-label={ this.props.ariaLabel }>
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
          className='ms-Nav-chevronButton ms-Nav-chevronButton--group ms-Nav-groupHeaderFontSize'
          onClick={ this._onGroupHeaderClicked.bind(this, groupIndex) }
        >
          <i className={ css('ms-Nav-chevron', 'ms-Icon', 'ms-Icon--ChevronDown') }></i>
          { group.name }
        </button> : null)
        }
        <div className={ css('ms-Nav-groupContent', 'ms-u-slideDownIn20') }>
          { this._renderLinks(group.links, 0 /* nestingLevel */) }
        </div>
      </div>
    );
  }

  private _onGroupHeaderClicked(groupIndex: number, ev: React.MouseEvent): void {
    let isGroupExpanded: boolean[] = this.state.isGroupExpanded;
    isGroupExpanded[groupIndex] = !isGroupExpanded[groupIndex];
    this.setState({ isGroupExpanded: isGroupExpanded });

    ev.preventDefault();
    ev.stopPropagation();
  }

  private _onLinkExpandClicked(link: INavLink, ev: React.MouseEvent): void {
    link.isExpanded = !link.isExpanded;
    this.setState({ isLinkExpandStateChanged: true });

    ev.preventDefault();
    ev.stopPropagation();
  }

  private _onNavAnchorLinkClicked(link: INavLink, ev: React.MouseEvent): void {
    this._selectedKey = link.key;

    if (this.props.onLinkClick) {
      this.props.onLinkClick(ev, link);
    }
  }

  private _onNavButtonLinkClicked(link: INavLink, ev: React.MouseEvent): void {
    this._selectedKey = link.key;

    if (link.onClick) {
      link.onClick(ev, link);
    }
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