/* tslint:disable */
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/components/FocusZone';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { INavLinkGroup } from 'office-ui-fabric-react/lib/components/Nav';
import { INavState } from 'office-ui-fabric-react/lib/components/Nav/Nav.base';
import * as React from 'react';
import {
  INavProps,
  INavLink,
  INavStyleProps,
  INavStyles
} from './Nav.types';
import {
  getStyles
} from './Nav.styles';
import { NavBase } from './NavBase';
import {
  styled,
  classNamesFunction
} from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

class SlimNavComponent extends NavBase {
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

    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <nav role='navigation'>
          {
            this.props.groups.map((group: INavLinkGroup, groupIndex: number) => {
              return this._renderGroup(group, groupIndex);
            })
          }
        </nav>
      </FocusZone>
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
      link.onClick(ev, link);
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

  private _renderCompositeLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    let rightIconName = null;
    if (link.url && link.target && link.target === '_blank') {
      // for external links, show an icon
      rightIconName = 'OpenInNewWindow';
    }

    let linkTextStyle: React.CSSProperties = {};
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
        href={ link.url ? link.url : undefined }
        target={ link.target ? link.target : undefined }
        key={ link.key || linkIndex }
        data-hint='SlimReactLeftNav'
        data-value={ link.name }
        aria-label={ link.name }
        onClick={ this._onLinkClicked.bind(this, link) }>
        <div className={ classNames.navFloatingItemRoot }>
          {
            <div className={ classNames.navItemNameColumn } style={ linkTextStyle }>
              { link.name }
            </div>
          }
          {
            rightIconName ?
              <Icon
                className={ classNames.navItemIconColumn }
                iconName={ rightIconName }
              />
              : null
          }
        </div>
      </a>
    );
  }

  private _renderFloatingLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    return (
      <li
        role='listitem'
        key={ link.key || linkIndex }
        title={ link.name }>
        {
          this._renderCompositeLink(link, linkIndex, nestingLevel)
        }
        {
          // show child links
          // 1. only for the first level
          nestingLevel == 0 ?
            <div>
              {
                this._renderFloatingLinks(link.links as INavLink[], ++nestingLevel)
              }
            </div>
            : null
        }
      </li>
    )
  }

  private _renderFloatingLinks(links: INavLink[], nestingLevel: number): React.ReactElement<{}> | null {
    if (!links || links.length === 0) {
      return null;
    }

    return (
      <ul role='list'>
        {
          links.map((link: INavLink, linkIndex: number) => {
            return this._renderFloatingLink(link, linkIndex, nestingLevel);
          })
        }
      </ul>
    );
  }

  private _renderFloatingNav(link: INavLink, _linkIndex: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    const hasChildren = (!!link.links && link.links.length > 0);
    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, { hasChildren, scrollTop: link.scrollTop });

    return (
      <div className={ classNames.navFloatingRoot }>
        {
          this._renderFloatingLinks([link], 0 /* nestingLevel */)
        }
      </div>
    );
  }

  private _renderLink(link: INavLink, linkIndex: number, _nestingLevel: number): React.ReactElement<{}> | null {
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
        key={ link.key || linkIndex }
        onMouseEnter={ this._onLinkMouseEnterOrLeave.bind(this, link) }
        onMouseLeave={ this._onLinkMouseEnterOrLeave.bind(this, link) }
        title={ link.name }
        className={ classNames.navSlimItemRoot }>
        <a
          href={ link.url ? link.url : undefined }
          target={ link.target ? link.target : undefined }
          key={ link.key || linkIndex }
          data-hint='SlimReactLeftNav'
          data-value={ link.name }
          onClick={ this._onLinkClicked.bind(this, link) }>
          <div className={ classNames.navItemRoot }>
            <Icon
              className={ classNames.navItemIconColumn }
              iconName={ link.icon }
            />
          </div>
        </a>
        {
          this._renderFloatingNav(link, linkIndex)
        }
      </li>
    );
  }

  private _renderLinks(links: INavLink[], nestingLevel: number): React.ReactElement<{}> | null {
    if (!links || links.length === 0) {
      return null;
    }

    return (
      <ul role='list'>
        {
          links.map((link: INavLink, linkIndex: number) => {
            return this._renderLink(link, linkIndex, nestingLevel);
          })
        }
      </ul>
    );
  }

  private _renderGroup(group: INavLinkGroup, groupIndex: number): React.ReactElement<{}> | null {
    if (!group || !group.links || group.links.length === 0) {
      return null;
    }

    const { getStyles } = this.props;
    const classNames = getClassNames(getStyles!, {});

    return (
      <div key={ groupIndex }>
        {
          // do not render group header for the first group
          groupIndex > 0 && group.name ?
            <div className={ classNames.navGroupSeparatorRoot }>
              <div className={ classNames.navGroupSeparatorHrLine }>
              </div>
            </div>
            : null
        }
        {
          this._renderLinks(group.links, 0 /* nestingLevel */)
        }
      </div>
    );
  }
}

export const SlimNav = styled<INavProps, INavStyleProps, INavStyles>(
  SlimNavComponent,
  getStyles
);
/* tslint:enable */
