import * as React from 'react';
import {
  BaseComponent,
  css,
  getRTL
} from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { CommandButton } from '../../Button';
import { Icon } from '../../Icon';
import * as stylesImport from './Nav.scss';
const styles: any = stylesImport;
import { AnimationClassNames } from '../../Styling';
import {
  INav,
  INavProps,
  INavLinkGroup,
  INavLink
} from './Nav.Props';

// The number pixels per indentation level for Nav links.
const _indentationSize: number = 14;
// Tne number of pixels of left margin when there is expand/collaps button
const _indentWithExpandButton: number = 28;
// Tne number of pixels of left margin when there is expand/collaps button
const _indentNoExpandButton: number = 20;

// global var used in _isLinkSelectedKey
let _urlResolver: HTMLAnchorElement | undefined;

export interface INavState {
  isGroupCollapsed?: { [key: string]: boolean };
  isLinkExpandStateChanged?: boolean;
  selectedKey?: string;
}

export class Nav extends BaseComponent<INavProps, INavState> implements INav {

  public static defaultProps: INavProps = {
    groups: null,
    onRenderLink: (link: INavLink) => (<span className={ css('ms-Nav-linkText', styles.linkText) }>{ link.name }</span>)
  };

  private _hasExpandButton: boolean;

  constructor(props: INavProps) {
    super(props);

    this.state = {
      isGroupCollapsed: {},
      isLinkExpandStateChanged: false,
      selectedKey: props.initialSelectedKey || props.selectedKey,
    };
    this._hasExpandButton = false;
  }

  public render(): React.ReactElement<{}> {
    const { groups, className, isOnTop } = this.props;

    if (!groups) {
      return null;
    }

    // when this.props.groups[x].name is specified or Any of the link has child link, chevorn Expand/collaps button is shown,
    // different padding is needed. _hasExpandButton marks this condition.
    this._hasExpandButton = groups.some((group: INavLinkGroup, groupIndex: number) => {
      return !!group && !!group.name || group.links && group.links.some((link: INavLink, linkIndex: number) => {
        return !!link && !!link.links && link.links.length > 0;
      });
    });

    const groupElements: React.ReactElement<{}>[] = groups.map(
      (group: INavLinkGroup, groupIndex: number) => this._renderGroup(group, groupIndex));

    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <nav role='navigation'
          className={ css(
            'ms-Nav',
            styles.root,
            className,
            isOnTop && css('is-onTop', styles.rootIsOnTop, AnimationClassNames.slideRightIn40)
          ) }>
          { groupElements }
        </nav>
      </FocusZone>
    );
  }

  public get selectedKey(): string {
    return this.state.selectedKey;
  }

  private _renderAnchorLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> {
    // Determine the appropriate padding to add before this link.
    // In RTL, the "before" padding will go on the right instead of the left.
    const isRtl: boolean = getRTL();
    const paddingBefore: string = (_indentationSize * nestingLevel +
      (this._hasExpandButton ? _indentWithExpandButton : _indentNoExpandButton)).toString(10) + 'px';

    return (
      <a
        className={ css('ms-Nav-link', styles.link) }
        style={ { [isRtl ? 'paddingRight' : 'paddingLeft']: paddingBefore } }
        href={ link.url || 'javascript:' }
        onClick={ this._onNavAnchorLinkClicked.bind(this, link) }
        aria-label={ link.ariaLabel }
        title={ link.title || link.name }
        target={ link.target }
      >
        { link.iconClassName && (
          <Icon
            className={ css(link.iconClassName, styles.iconLink) }
            iconName='IconLink'
          />
        ) }
        { this.props.onRenderLink(link) }
      </a>
    );
  }

  private _renderButtonLink(link: INavLink, linkIndex: number) {
    return (
      <CommandButton
        className={ css('ms-Nav-link ms-Nav-linkButton', styles.link, {
          'isOnExpanded': this._hasExpandButton,
          [styles.linkIsOnExpanded]: this._hasExpandButton
        }) }
        href={ link.url }
        iconProps={ { iconName: link.icon } }
        description={ link.title || link.name }
        onClick={ this._onNavButtonLinkClicked.bind(this, link) }>
        { link.name }
      </CommandButton>);
  }

  private _renderCompositeLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> {
    const isLinkSelected: boolean = this._isLinkSelected(link);

    return (
      <div key={ link.key || linkIndex }
        className={ css('ms-Nav-compositeLink', styles.compositeLink, {
          ' is-expanded': link.isExpanded,
          'is-selected': isLinkSelected,
          [styles.compositeLinkIsExpanded]: link.isExpanded,
          [styles.compositeLinkIsSelected]: isLinkSelected
        }) }>
        { (nestingLevel === 0 && link.links && link.links.length > 0 ?
          <button
            className={ css('ms-Nav-chevronButton ms-Nav-chevronButton--link', styles.chevronButton, styles.chevronButtonLink) }
            onClick={ this._onLinkExpandClicked.bind(this, link) }
            aria-label={ this.props.expandButtonAriaLabel }
            aria-expanded={ link.isExpanded ? 'true' : 'false' }
          >
            <Icon
              className={ css('ms-Nav-chevron', styles.chevronIcon, link.isExpanded) }
              iconName='ChevronDown'
            />
          </button> : null
        ) }
        { !!link.onClick ? this._renderButtonLink(link, linkIndex) : this._renderAnchorLink(link, linkIndex, nestingLevel) }
      </div>
    );
  }

  private _renderLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> {
    return (
      <li key={ link.key || linkIndex } role='listitem' className={ css(styles.navItem) }>
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
      <ul role='list' aria-label={ this.props.ariaLabel } className={ css(styles.navItems) }>
        { linkElements }
      </ul>
    );
  }

  private _renderGroup(group: INavLinkGroup, groupIndex: number): React.ReactElement<{}> {
    const isGroupExpanded: boolean = !this.state.isGroupCollapsed[group.name];

    return (
      <div key={ groupIndex } className={ css('ms-Nav-group', styles.group, {
        'is-expanded': isGroupExpanded,
        [styles.groupIsExpanded]: isGroupExpanded
      }) }>
        { (group.name ?
          <button
            className={ css('ms-Nav-chevronButton ms-Nav-chevronButton--group ms-Nav-groupHeaderFontSize', styles.chevronButton, styles.chevronButtonIsGroup, styles.groupHeaderFontSize) }
            onClick={ this._onGroupHeaderClicked.bind(this, group.name) }
          >
            <Icon
              className={ css(
                'ms-Nav-chevron',
                styles.chevronIcon,
                isGroupExpanded && styles.chevronIsExpanded
              ) }
              iconName='ChevronDown'
            />
            { group.name }
          </button> : null)
        }
        <div className={ css('ms-Nav-groupContent', AnimationClassNames.slideDownIn20, styles.groupContent) }>
          { this._renderLinks(group.links, 0 /* nestingLevel */) }
        </div>
      </div>
    );
  }

  private _onGroupHeaderClicked(groupKey: string, ev: React.MouseEvent<HTMLElement>): void {
    let { isGroupCollapsed } = this.state;

    isGroupCollapsed[groupKey] = !isGroupCollapsed[groupKey];
    this.setState({ isGroupCollapsed: isGroupCollapsed });

    ev.preventDefault();
    ev.stopPropagation();
  }

  private _onLinkExpandClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    link.isExpanded = !link.isExpanded;
    this.setState({ isLinkExpandStateChanged: true });

    ev.preventDefault();
    ev.stopPropagation();
  }

  private _onNavAnchorLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    if (this.props.onLinkClick) {
      this.props.onLinkClick(ev, link);
    }

    this.setState({ selectedKey: link.key });
  }

  private _onNavButtonLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    if (link.onClick) {
      link.onClick(ev, link);
    }

    this.setState({ selectedKey: link.key });
  }

  private _isLinkSelected(link: INavLink): boolean {
    // if caller passes in selectedKey, use it as first choice or
    // if current state.selectedKey (from addressbar) is match to the link
    if (this.props.selectedKey !== undefined) {
      return link.key === this.props.selectedKey;
    } else if (this.state.selectedKey !== undefined && link.key === this.state.selectedKey) {
      return true;
    }

    // resolve is not supported for ssr
    if (typeof (window) === 'undefined') {
      return false;
    }

    if (!link.url) {
      return false;
    }

    _urlResolver = _urlResolver || document.createElement('a');

    _urlResolver.href = link.url || '';
    const target: string = _urlResolver.href;

    if (location.href === target) {
      return true;
    }

    if (location.protocol + '//' + location.host + location.pathname === target) {
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
}
