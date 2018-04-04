/* tslint:disable */
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/components/FocusZone';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { INavLinkGroup } from 'office-ui-fabric-react/lib/components/Nav';
import { INavState } from 'office-ui-fabric-react/lib/components/Nav/Nav.base';
import * as React from 'react';
import {
  IM365NavProps,
  IM365NavLink,
  IM365NavStyleProps,
  IM365NavStyles
} from './M365Nav.types';
import {
  getStyles
} from './M365Nav.styles';
import { M365NavBase } from './M365NavBase';
import {
  styled,
  classNamesFunction
} from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<IM365NavStyleProps, IM365NavStyles>();

class M365SlimNavComponent extends M365NavBase {
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
    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, { isSelected, nestingLevel });

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
        <div className={classNames.navFloatingItemRoot}>
          {
            <div className={classNames.navItemNameColumn} style={linkTextStyle}>
              {link.name}
            </div>
          }
          {
            rightIconName ?
              <Icon
                className={classNames.navItemIconColumn}
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

    const hasChildren = (!!link.links && link.links.length > 0);
    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, { hasChildren, scrollTop: link.scrollTop });

    return (
      <div className={classNames.navFloatingRoot}>
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
    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, { isSelected, hasChildren });

    return (
      <li
        role='listitem'
        key={link.key || linkIndex}
        onMouseEnter={this.onLinkMouseEnterOrLeave.bind(this, link)}
        onMouseLeave={this.onLinkMouseEnterOrLeave.bind(this, link)}
        title={link.name}
        className={classNames.navSlimItemRoot}>
        <a
          href={link.url ? link.url : undefined}
          target={link.target ? link.target : undefined}
          key={link.key || linkIndex}
          data-hint='SlimReactLeftNav'
          data-value={link.name}
          tabIndex={0}
          onClick={this.onLinkClicked.bind(this, link)}>
          <div className={classNames.navItemRoot}>
            <Icon
              className={classNames.navItemIconColumn}
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

    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, {});

    return (
      <div key={groupIndex}>
        {
          // do not render group header for the first group
          groupIndex > 0 && group.name ?
            <div className={classNames.navGroupSeparatorRoot}>
              <div className={classNames.navGroupSeparatorHrLine}>
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

export const M365SlimNav = styled<IM365NavProps, IM365NavStyleProps, IM365NavStyles>(
  M365SlimNavComponent,
  getStyles
);
/* tslint:enable */
