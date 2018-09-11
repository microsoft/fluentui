/* tslint:disable */
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import { ICustomNavLinkGroup, INavProps, INavState, INavLink, INavStyleProps, INavStyles, NavGroupType } from './Nav.types';
import { getStyles } from './Nav.styles';
import { NavBase } from './NavBase';
import { styled, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { NavLink } from './NavLink';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();
const classNames = getClassNames(getStyles);

class NavComponent extends NavBase {
  constructor(props: INavProps) {
    super(props);

    this.state = {
      // Collapsable
      // Editable
      isNavCollapsed: props.isNavCollapsed ? props.isNavCollapsed : false,
      isLinkExpandStateChanged: false
    };
  }

  public render() {
    if (!this.props.groups || this.props.groups.length === 0) {
      return null;
    }

    // reset the flag
    // on render link, find if there is atleast one hidden link to display "Show more" link
    this._hasAtleastOneHiddenLink = false;

    return (
      <nav role="navigation" className={classNames.root}>
        {this._renderExpandCollapseNavItem()}
        {this.props.groups.map((group: ICustomNavLinkGroup, groupIndex: number) => {
          return this._renderGroup(group, groupIndex);
        })}
      </nav>
    );
  }

  private _onNavCollapseClicked(ev: React.MouseEvent<HTMLElement>): void {
    this.setState((prevState: INavState) => {
      const isNavCollapsed = !prevState.isNavCollapsed;

      // inform the caller about the collapse event
      if (!!this.props.onNavCollapsedCallback) {
        this.props.onNavCollapsedCallback(isNavCollapsed);
      }

      return {
        isNavCollapsed: isNavCollapsed
      };
    });

    ev.preventDefault();
    ev.stopPropagation();
  }

  private _renderExpandCollapseNavItem(): React.ReactElement<{}> | null {
    const isNavCollapsed = this.state.isNavCollapsed;
    const { dataHint } = this.props;
    const ariaLabel = isNavCollapsed ? 'Navigation collapsed' : 'Navigation expanded';

    return (
      <NavLink
        id={'NavToggle'}
        href={'#'}
        onClick={this._onNavCollapseClicked.bind(this)}
        ariaExpanded={!isNavCollapsed}
        dataHint={dataHint}
        dataValue={'NavToggle'}
        ariaLabel={ariaLabel}
        rootClassName={classNames.navItemRoot}
        primaryIconName={'GlobalNavButton'}
        role="menu"
      />
    );
  }

  private _onLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    const hasChildren = link.links && link.links.length > 0;

    if (hasChildren) {
      // show child links
      link.isExpanded = !link.isExpanded;

      if (!!this.props.onNavNodeExpandedCallback && link.key) {
        this.props.onNavNodeExpandedCallback(link.key, link.isExpanded);
      }
    } else if (link.onClick) {
      if (!!this.props.onEditLeftNavClickedCallback && link.key && link.key === 'EditNavLink') {
        this.props.onEditLeftNavClickedCallback();
      } else {
        // if there is a onClick defined, call it
        link.onClick(ev, link);
      }
    }

    this.setState({
      isLinkExpandStateChanged: link.isExpanded
    });

    if (hasChildren || link.onClick) {
      // prevent further action if the link has children or onClick handler is defined
      ev.preventDefault();
    }

    ev.stopPropagation();
  }

  private _renderCompositeLink(link: INavLink, keyIndex: string, nestingLevel: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    let ariaProps = {};

    let secondaryIconName = undefined;
    if (link.links && link.links.length > 0 && nestingLevel === 0) {
      // for the first level link, show chevron icon if there is a children
      secondaryIconName = link.isExpanded ? 'ChevronUp' : 'ChevronDown';

      ariaProps = {
        ariaExpanded: !!link.isExpanded
      };
    } else if (link.url && link.target && link.target === '_blank') {
      // for external links, show an icon
      secondaryIconName = 'OpenInNewWindow';
    }

    const hasChildren = !!link.links && link.links.length > 0;

    let isSelected = undefined;
    if (hasChildren) {
      if (link.isExpanded) {
        isSelected = false;
      } else if (!link.isExpanded && this.isChildLinkSelected(link)) {
        console.log(link);
        isSelected = true;
      }
    } else {
      isSelected = link.isSelected;
    }

    // show nav icon for the first level only
    const primaryIconName = nestingLevel === 0 ? link.icon : undefined;
    const { showMore, onShowMoreLinkClicked, dataHint } = this.props;
    const linkText = this.getLinkText(link, showMore);
    const onClickHandler = link.isShowMoreLink && onShowMoreLinkClicked ? onShowMoreLinkClicked : this._onLinkClicked.bind(this, link);

    return (
      <ul>
        <li>
          <NavLink
            id={keyIndex}
            href={link.url}
            target={link.target}
            onClick={onClickHandler}
            dataHint={dataHint}
            dataValue={keyIndex}
            ariaLabel={linkText}
            {...ariaProps}
            level={nestingLevel}
            isSelected={isSelected}
            role="menu"
            primaryIconName={primaryIconName}
            secondaryIconName={secondaryIconName}
          />
        </li>
      </ul>
    );
  }

  private _renderLink(link: INavLink, linkIndex: number, nestingLevel: number, groupIndex: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    const linkText = this.getLinkText(link, this.props.showMore);

    // Build a unique key and keep it from collapsing by stringifying it, ex: 001 should be 001, not 1
    let keyIndex = groupIndex.toString() + nestingLevel.toString() + linkIndex.toString();

    return (
      <li role="listitem" key={keyIndex} title={linkText}>
        {this._renderCompositeLink(link, keyIndex, nestingLevel)}
        {// show child links
        // 1. only for the first level and
        // 2. if the link is expanded
        nestingLevel == 0 && link.isExpanded ? (
          <ul role="list" key={nestingLevel.toString() + keyIndex} className={AnimationClassNames.slideDownIn20}>
            {this._renderLinks(link.links as INavLink[], ++nestingLevel, linkIndex)}
          </ul>
        ) : null}
      </li>
    );
  }

  private _renderLinks(links: INavLink[], nestingLevel: number, groupIndex: number): React.ReactElement<{}> | null {
    if (!links || links.length === 0) {
      return null;
    }

    const { enableCustomization, showMore } = this.props;

    return (
      <>
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
            return this._renderLink(link, linkIndex, nestingLevel, groupIndex);
          }
        })}
      </>
    );
  }

  private _renderGroup(group: ICustomNavLinkGroup, groupIndex: number): React.ReactElement<{}> | null {
    if (!group || !group.links || group.links.length === 0) {
      return null;
    }

    const { enableCustomization } = this.props;

    // skip customization group if customization is not enabled
    if (!enableCustomization && group.groupType === NavGroupType.CustomizationGroup) {
      return null;
    }

    // TODO - set this
    let isGroupHeaderVisible = false;

    return (
      <ul role="list" key={groupIndex.toString()}>
        {isGroupHeaderVisible ? (
          <>
            <li className={classNames.navGroupDivider} />
            {group.name ? <li className={classNames.navGroupTitle}>{group.name}</li> : null}
          </>
        ) : null}
        {this._renderLinks(group.links, 0 /* nestingLevel */, groupIndex)}
      </ul>
    );
  }
}

export const Nav = styled<INavProps, INavStyleProps, INavStyles>(NavComponent, getStyles);

/* tslint:enable */
