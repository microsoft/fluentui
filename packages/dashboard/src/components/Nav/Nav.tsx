/* tslint:disable */
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
import { ICustomNavLinkGroup, INavProps, INavState, INavLink, INavStyleProps, INavStyles, NavGroupType } from './Nav.types';
import { getStyles } from './Nav.styles';
import { NavBase } from './NavBase';
import { styled, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { NavLink } from './NavLink';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

class NavComponent extends NavBase {
  constructor(props: INavProps) {
    super(props);

    this.state = {
      isLinkExpandStateChanged: false,
      selectedKey: props.initialSelectedKey || props.selectedKey
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
      <nav role="navigation">
        {this.props.groups.map((group: ICustomNavLinkGroup, groupIndex: number) => {
          return this._renderGroup(group, groupIndex);
        })}
      </nav>
    );
  }

  private _onLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    let nextState: INavState = {
      selectedKey: link.key
    };

    const hasChildren = link.links && link.links.length > 0;

    if (hasChildren) {
      // show child links
      link.isExpanded = !link.isExpanded;

      nextState.isLinkExpandStateChanged = true;

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

    this.setState(nextState);

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

    // show nav icon for the first level only
    const primaryIconName = nestingLevel === 0 ? link.icon : undefined;
    const isLinkSelected = this.isLinkSelected(link, false /* includeChildren */);
    const isChildLinkSelected = this.isChildLinkSelected(link);
    const hasChildren = !!link.links && link.links.length > 0;
    const isSelected = (isLinkSelected && !hasChildren) || (isChildLinkSelected && !link.isExpanded);
    const { showMore, onShowMoreLinkClicked, dataHint } = this.props;
    const linkText = this.getLinkText(link, showMore);
    const onClickHandler = link.isShowMoreLink && onShowMoreLinkClicked ? onShowMoreLinkClicked : this._onLinkClicked.bind(this, link);

    return (
      <NavLink
        id={keyIndex}
        content={linkText}
        href={link.url}
        target={link.target}
        onClick={onClickHandler}
        dataHint={dataHint}
        dataValue={keyIndex}
        ariaLabel={linkText}
        {...ariaProps}
        level={nestingLevel}
        selected={isSelected}
        role="menu"
        primaryIconName={primaryIconName}
        secondaryIconName={secondaryIconName}
      />
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

    const { styles, enableCustomization } = this.props;
    const hasGroupName = !!group.name;

    // skip customization group if customization is not enabled
    if (!enableCustomization && group.groupType === NavGroupType.CustomizationGroup) {
      return null;
    }

    const classNames = getClassNames(styles!, { hasGroupName });

    let isGroupHeaderVisible = false;

    // first group header is hidden by default, display group header for other groups only if there are visible links
    if (groupIndex > 0) {
      isGroupHeaderVisible = this.hasAtleastOneVisibleLink(group.links, this.props.showMore);
    }

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
