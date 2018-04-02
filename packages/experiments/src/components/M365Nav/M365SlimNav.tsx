/* tslint:disable */
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/components/FocusZone';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { INavLinkGroup } from 'office-ui-fabric-react/lib/components/Nav';
import { INavState } from 'office-ui-fabric-react/lib/components/Nav/Nav.base';
import { AnimationClassNames, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { IM365NavLink, IM365NavProps } from './M365Nav.types';
import {
  getM365NavItemStyle,
  getM365NavGroupSeparatorStyle,
  getM365SlimNavItemStyle,
  getM365FloatingNavStyle,
  getM365FloatingNavItemStyle
} from './M365Nav.styles';
import { M365NavBase } from './M365NavBase';

export class M365SlimNav extends M365NavBase {
  constructor(props: IM365NavProps) {
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

    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <nav role='navigation'>
          {
            this.props.groups.map((group: INavLinkGroup, groupIndex: number) => {
              return this.renderGroup(group, groupIndex);
            })
          }
        </nav>
      </FocusZone>
    );
  }

  private onLinkClicked(link: IM365NavLink, ev: React.MouseEvent<HTMLElement>): void {
    // set selected node
    var nextState: INavState = {
      selectedKey: link.key
    };
    this.setState(nextState);

    var hasChildren = link.links && link.links.length > 0;

    // if there is no children and onClick handler is defined, call it
    if (!hasChildren && link.onClick) {
      link.onClick(ev, link);
    }

    // prevent url action on anchor tag if the node has a children or if the onClick handler is defined
    if (hasChildren || link.onClick) {
      ev.preventDefault();
    }

    ev.stopPropagation();
  }

  private getScrollTop(): number | undefined {
    if (!this.props.navScrollerId) {
      return undefined;
    }

    var navScroller = document.getElementById(this.props.navScrollerId) as HTMLElement;

    if (navScroller && navScroller.scrollTop > 0) {
      return navScroller.scrollTop;
    }

    return undefined;
  }


  private onLinkMouseEnterOrLeave(link: IM365NavLink, ev: React.SyntheticEvent<HTMLElement>): void {
    link.scrollTop = this.getScrollTop();
    this.setState({ isLinkExpandStateChanged: true });

    ev.preventDefault();
    ev.stopPropagation();
  }

  private renderCompositeLink(link: IM365NavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    var rightIconName = null;
    if (link.url && link.target && link.target === '_blank') {
      // for external links, show an icon
      rightIconName = 'OpenInNewWindow';
    }

    var linkTextStyle: React.CSSProperties = {};
    if (!rightIconName) {
      linkTextStyle.width = '100%';
    }
    else {
      // leave 50px to the icon on the right
      linkTextStyle.width = 'calc(100% - 50px)';
    }

    const isSelected = nestingLevel > 0 && this.isLinkSelected(link, false /* includeChildren */);
    const navItemStyle = getM365FloatingNavItemStyle(isSelected, nestingLevel);

    return (
      <a
        href={link.url ? link.url : undefined}
        target={link.target ? link.target : undefined}
        key={link.key || linkIndex}
        data-hint='SlimReactLeftNav'
        data-value={link.name}
        aria-label={link.name}
        tabIndex={0}
        onClick={this.onLinkClicked.bind(this, link)}>
        <div className={mergeStyles(navItemStyle.root)}>
          {
            <div className={mergeStyles(navItemStyle.nameColumn)} style={linkTextStyle}>
              {link.name}
            </div>
          }
          {
            rightIconName ?
              <Icon
                className={mergeStyles(navItemStyle.iconColumn)}
                iconName={rightIconName}
              />
              : null
          }
        </div>
      </a>
    );
  }

  private renderFloatingLink(link: IM365NavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    return (
      <li
        role='listitem'
        key={link.key || linkIndex}
        title={link.name}>
        {
          this.renderCompositeLink(link, linkIndex, nestingLevel)
        }
        {
          // show child links
          // 1. only for the first level
          nestingLevel == 0 ?
            <div>
              {
                this.renderFloatingLinks(link.links as IM365NavLink[], ++nestingLevel)
              }
            </div>
            : null
        }
      </li>
    )
  }

  private renderFloatingLinks(links: IM365NavLink[], nestingLevel: number): React.ReactElement<{}> | null {
    if (!links || links.length === 0) {
      return null;
    }

    return (
      <ul role='list'>
        {
          links.map((link: IM365NavLink, linkIndex: number) => {
            return this.renderFloatingLink(link, linkIndex, nestingLevel);
          })
        }
      </ul>
    );
  }

  private renderFloatingNav(link: IM365NavLink, _linkIndex: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    var isRtl = getRTL();
    var animationClassName = isRtl ? AnimationClassNames.slideLeftIn20 : AnimationClassNames.slideRightIn20;

    const hasChildren = (!!link.links && link.links.length > 0);
    const floatingNavStyle = getM365FloatingNavStyle(hasChildren, link.scrollTop);

    return (
      <div className={mergeStyles(animationClassName, floatingNavStyle)}>
        {
          this.renderFloatingLinks([link], 0 /* nestingLevel */)
        }
      </div>
    );
  }

  private renderLink(link: IM365NavLink, linkIndex: number, _nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    const isSelected = this.isLinkSelected(link, true /* includeChildren */);
    const hasChildren = (!!link.links && link.links.length > 0);
    const navItemStyle = getM365NavItemStyle(isSelected, hasChildren);
    const slimNavItemStyle = getM365SlimNavItemStyle(hasChildren);

    return (
      <li
        role='listitem'
        key={link.key || linkIndex}
        onMouseEnter={this.onLinkMouseEnterOrLeave.bind(this, link)}
        onMouseLeave={this.onLinkMouseEnterOrLeave.bind(this, link)}
        title={link.name}
        className={mergeStyles(slimNavItemStyle)}>
        <a
          href={link.url ? link.url : undefined}
          target={link.target ? link.target : undefined}
          key={link.key || linkIndex}
          data-hint='SlimReactLeftNav'
          data-value={link.name}
          tabIndex={0}
          onClick={this.onLinkClicked.bind(this, link)}>
          <div className={mergeStyles(navItemStyle.root)}>
            <Icon
              className={mergeStyles(navItemStyle.iconColumn)}
              iconName={link.icon}
            />
          </div>
        </a>
        {
          this.renderFloatingNav(link, linkIndex)
        }
      </li>
    );
  }

  private renderLinks(links: IM365NavLink[], nestingLevel: number): React.ReactElement<{}> | null {
    if (!links || links.length === 0) {
      return null;
    }

    return (
      <ul role='list'>
        {
          links.map((link: IM365NavLink, linkIndex: number) => {
            return this.renderLink(link, linkIndex, nestingLevel);
          })
        }
      </ul>
    );
  }

  private renderGroup(group: INavLinkGroup, groupIndex: number): React.ReactElement<{}> | null {
    if (!group || !group.links || group.links.length === 0) {
      return null;
    }

    const navGroupSeparatorStyle = getM365NavGroupSeparatorStyle();

    return (
      <div key={groupIndex}>
        {
          // do not render group header for the first group
          groupIndex > 0 && group.name ?
            <div className={mergeStyles(navGroupSeparatorStyle)}>
              <div className='horizontalLine'>
              </div>
            </div>
            : null
        }
        {
          this.renderLinks(group.links, 0 /* nestingLevel */)
        }
      </div>
    );
  }
}
/* tslint:enable */
