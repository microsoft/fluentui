/* tslint:disable */
import * as React from 'react';
import { ICustomNavLinkGroup, INavProps, INavState, INavLink, INavStyleProps, INavStyles, NavGroupType } from './Nav.types';
import { getStyles } from './Nav.styles';
import { NavBase } from './NavBase';
import { styled, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { NavLink } from './NavLink';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

class SlimNavComponent extends NavBase {
  // store the previous floating nav shown to close when the current floating nav shows up.
  private _prevFloatingNav: any;

  constructor(props: INavProps) {
    super(props);

    this.state = {
      isLinkExpandStateChanged: false,
      selectedKey: props.initialSelectedKey || props.selectedKey
    };
  }

  public get selectedKey(): string | undefined {
    return this.state.selectedKey;
  }

  public render() {
    if (!this.props.groups || this.props.groups.length === 0) {
      return null;
    }

    // reset the flag
    // on render link, find if there is atleast one hidden link to display "Show more" link
    this._hasAtleastOneHiddenLink = false;

    return (
      <>
        {this.props.groups.map((group: ICustomNavLinkGroup, groupIndex: number) => {
          return this._renderGroup(group, groupIndex);
        })}
      </>
    );
  }

  private _onLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    // set selected node
    const nextState: INavState = {
      selectedKey: link.key
    };
    this.setState(nextState);

    const hasChildren = link.links && link.links.length > 0;

    // if there is no children and onClick handler is defined, call it
    if (!hasChildren && link.onClick) {
      if (!!this.props.onEditLeftNavClickedCallback && link.key && link.key === 'EditNavLink') {
        this.props.onEditLeftNavClickedCallback();
      } else {
        // if there is a onClick defined, call it
        link.onClick(ev, link);
      }
    }

    // prevent url action on anchor tag if the node has a children or if the onClick handler is defined
    if (hasChildren || link.onClick) {
      ev.preventDefault();
    }

    ev.stopPropagation();
  }

  private _getScrollTop(): number | undefined {
    if (!this.props.navScrollerId) {
      return undefined;
    }

    const navScroller = document.getElementById(this.props.navScrollerId) as HTMLElement;

    if (navScroller && navScroller.scrollTop > 0) {
      return navScroller.scrollTop;
    }

    return undefined;
  }

  private _onLinkMouseEnterOrLeave(link: INavLink, ev: React.SyntheticEvent<HTMLElement>): void {
    link.scrollTop = this._getScrollTop();
    this.setState({ isLinkExpandStateChanged: true });

    ev.preventDefault();
    ev.stopPropagation();
  }

  private _getFloatingNav(parentElement: HTMLElement | null): HTMLDivElement | undefined {
    if (!parentElement) {
      return;
    }

    return parentElement.querySelector('[data-floating-nav]') as HTMLDivElement;
  }

  private _onKeyDown(link: INavLink, ev: React.SyntheticEvent<HTMLElement>): void {
    const nativeEvent = ev as any;
    if (nativeEvent.keyCode !== 13) {
      // accept only enter key to open the floating nav from slim nav
      return;
    }

    const a = nativeEvent.target as HTMLElement;
    const li = a.parentElement;
    const currentFloatingNav = this._getFloatingNav(li);

    if (!currentFloatingNav) {
      return;
    }

    if (this._prevFloatingNav === currentFloatingNav) {
      // toggle the floating nav
      if (currentFloatingNav.style && currentFloatingNav.style.display && currentFloatingNav.style.display === 'block') {
        currentFloatingNav.removeAttribute('style');
      } else {
        currentFloatingNav.setAttribute('style', 'display: block');
      }
    } else {
      // prev and current floating navs are different
      // close the previous if there is one
      if (this._prevFloatingNav) {
        this._prevFloatingNav.removeAttribute('style');
      }

      // open the current one
      currentFloatingNav.setAttribute('style', 'display: block');

      // store the current as prev
      this._prevFloatingNav = currentFloatingNav;
    }
  }

  private _renderCompositeLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    let rightIconName = undefined;
    if (link.url && link.target && link.target === '_blank') {
      // for external links, show an icon
      rightIconName = 'OpenInNewWindow';
    }

    const isSelected = nestingLevel > 0 && this.isLinkSelected(link, false /* includeChildren */);
    const { styles, showMore, dataHint, onShowMoreLinkClicked, theme } = this.props;
    const classNames = getClassNames(styles!, { isSelected, nestingLevel, theme: theme! });
    const linkText = this.getLinkText(link, showMore);
    const onClickHandler = link.isShowMoreLink && onShowMoreLinkClicked ? onShowMoreLinkClicked : this._onLinkClicked.bind(this, link);

    return (
      <NavLink
        id={link.key}
        content={linkText}
        href={link.url}
        target={link.target}
        dataHint={dataHint}
        dataValue={link.key}
        ariaLabel={linkText}
        role="menu"
        onClick={onClickHandler}
        rootClassName={classNames.navFloatingItemRoot}
        rightIconName={rightIconName}
        textClassName={classNames.navItemNameColumn}
        iconClassName={classNames.navItemIconColumn}
        barClassName={classNames.navItemBarMarker}
        focusedStyle={classNames.focusedStyle}
      />
    );
  }

  private _renderFloatingLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    const linkText = this.getLinkText(link, this.props.showMore);

    return (
      <li role="listitem" key={link.key || linkIndex} title={linkText}>
        {this._renderCompositeLink(link, linkIndex, nestingLevel)}
        {// show child links
        // 1. only for the first level
        nestingLevel == 0 ? <div>{this._renderFloatingLinks(link.links as INavLink[], ++nestingLevel)}</div> : null}
      </li>
    );
  }

  private _renderFloatingLinks(links: INavLink[], nestingLevel: number): React.ReactElement<{}> | null {
    if (!links || links.length === 0) {
      return null;
    }

    return (
      <ul role="list">
        {links.map((link: INavLink, linkIndex: number) => {
          return this._renderFloatingLink(link, linkIndex, nestingLevel);
        })}
      </ul>
    );
  }

  private _renderFloatingNav(link: INavLink, _linkIndex: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    const hasChildren = !!link.links && link.links.length > 0;
    const { styles, theme } = this.props;
    const classNames = getClassNames(styles!, { hasChildren, scrollTop: link.scrollTop, theme: theme! });

    return (
      <div className={classNames.navFloatingRoot} data-floating-nav>
        {this._renderFloatingLinks([link], 0 /* nestingLevel */)}
      </div>
    );
  }

  private _renderLink(link: INavLink, linkIndex: number, _nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    const isSelected = this.isLinkSelected(link, true /* includeChildren */);
    const hasChildren = !!link.links && link.links.length > 0;
    const { styles, showMore, onShowMoreLinkClicked, dataHint, theme } = this.props;
    const classNames = getClassNames(styles!, { isSelected, hasChildren, theme: theme! });
    const linkText = this.getLinkText(link, showMore);
    const onClickHandler = link.isShowMoreLink && onShowMoreLinkClicked ? onShowMoreLinkClicked : this._onLinkClicked.bind(this, link);

    return (
      <li
        role="listitem"
        key={link.key || linkIndex}
        onMouseEnter={this._onLinkMouseEnterOrLeave.bind(this, link)}
        onMouseLeave={this._onLinkMouseEnterOrLeave.bind(this, link)}
        onKeyDown={this._onKeyDown.bind(this, link)}
        title={linkText}
        className={classNames.navSlimItemRoot}
      >
        <NavLink
          id={link.key}
          href={link.url}
          target={link.target}
          dataHint={dataHint}
          dataValue={link.key}
          ariaLabel={linkText}
          role="menu"
          onClick={onClickHandler}
          rootClassName={classNames.navItemRoot}
          leftIconName={link.icon}
          iconClassName={classNames.navItemIconColumn}
          barClassName={classNames.navItemBarMarker}
          focusedStyle={classNames.focusedStyle}
        />
        {this._renderFloatingNav(link, linkIndex)}
      </li>
    );
  }

  private _renderLinks(links: INavLink[], nestingLevel: number): React.ReactElement<{}> | null {
    if (!links || links.length === 0) {
      return null;
    }

    const { enableCustomization, showMore } = this.props;

    return (
      <ul role="list">
        {links.map((link: INavLink, linkIndex: number) => {
          if (enableCustomization && link.isHidden && !showMore) {
            // atleast one link is hidden
            this._hasAtleastOneHiddenLink = true;

            // "Show more" overrides isHidden property
            return null;
          } else if (link.isShowMoreLink && !this._hasAtleastOneHiddenLink && !showMore) {
            // there is no hidden link, hide "Show more" link
            return null;
          } else {
            return this._renderLink(link, linkIndex, nestingLevel);
          }
        })}
      </ul>
    );
  }

  private _renderGroup(group: ICustomNavLinkGroup, groupIndex: number): React.ReactElement<{}> | null {
    if (!group || !group.links || group.links.length === 0) {
      return null;
    }

    const { styles, enableCustomization, theme } = this.props;

    // skip customization group if customization is not enabled
    if (!enableCustomization && group.groupType === NavGroupType.CustomizationGroup) {
      return null;
    }

    const classNames = getClassNames(styles!, { theme: theme! });

    let isGroupHeaderVisible = false;

    // first group header is hidden by default, display group header for other groups only if there are visible links
    if (groupIndex > 0) {
      isGroupHeaderVisible = this.hasAtleastOneVisibleLink(group.links, this.props.showMore);
    }

    return (
      <div key={groupIndex}>
        {// do not render group header for the first group
        isGroupHeaderVisible ? (
          <div className={classNames.navGroupSeparatorRoot}>
            <div className={classNames.navGroupSeparatorHrLine} />
          </div>
        ) : null}
        {this._renderLinks(group.links, 0 /* nestingLevel */)}
      </div>
    );
  }
}

export const SlimNav = styled<INavProps, INavStyleProps, INavStyles>(SlimNavComponent, getStyles);
/* tslint:enable */
