import * as React from 'react';
import { INavGroupProps, INavStyles, INavLink, INavStyleProps } from './Nav.types';
import { NavLink } from './NavLink';
import { getStyles } from './Nav.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();
const classNames = getClassNames(getStyles);

class NavGroup extends React.Component<INavGroupProps, {}> {
  constructor(props: INavGroupProps) {
    super(props);

    this.state = {
      linkCollapsed: this.props.linkCollapsed ? this.props.children : false,
      hasHiddenLink: this.props.hasHiddenLink ? this.props.hasHiddenLink : false
    };
  }

  public render(): JSX.Element {
    const { groupIndex, groupName, links } = this.props;

    return (
      <ul role="list" key={groupIndex}>
        {this._renderGroupName(groupName, groupIndex)}
        {this._renderLinks(links, 0, groupIndex)}
      </ul>
    );
  }

  /* given a link, find if one of the child is selected */
  protected isChildLinkSelected(link: INavLink): boolean {
    if (!link || !link.links || link.links.length === 0) {
      return false;
    }

    return link.links.some((childLink: INavLink) => {
      return !!childLink && childLink.isSelected;
    });
  }

  private _onLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    const hasChildren = link.links && link.links.length > 0;

    if (hasChildren) {
      // show child links
      link.isExpanded = !link.isExpanded;

      if (!!this.props.onNavNodeExpandedCallback && link.key) {
        this.props.onNavNodeExpandedCallback(link.key, link.isExpanded);
      }
    }
    // else if (link.onClick) {
    //   if (!!this.props.onEditLeftNavClickedCallback && link.key && link.key === 'EditNavLink') {
    //     this.props.onEditLeftNavClickedCallback();
    //   } else {
    //     // if there is a onClick defined, call it
    //     link.onClick(ev, link);
    //   }
    // }

    this.setState({
      linkCollapsed: link.isExpanded
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

    // TODO - move this down into the nav group that folds nested links
    // let ariaProps = {};
    const hasChildren = !!link.links && link.links.length > 0;
    const { onShowNestedLink, dataHint, isNavCollapsed } = this.props;

    let isSelected = undefined;
    if (hasChildren) {
      // Nav is expanded and the nested links are exposed, L1 has no selected indicator
      if (link.isExpanded && !isNavCollapsed) {
        isSelected = false;
        // L1 has indicator when...
        // Nav is collapsed, nested link menu is expanded, and a nested link is selected or
        // Nav is expanded, nested link menu is collapsed
      } else if (
        (link.isExpanded && isNavCollapsed && this.isChildLinkSelected(link)) ||
        (!link.isExpanded && this.isChildLinkSelected(link))
      ) {
        isSelected = true;
      }
    } else {
      isSelected = link.isSelected;
    }

    // show nav icon for the first level only
    const primaryIconName = nestingLevel === 0 ? link.icon : undefined;
    const onClickHandler = link.isShowMoreLink && onShowNestedLink ? onShowNestedLink : this._onLinkClicked.bind(this, link);

    return (
      <NavLink
        id={keyIndex}
        href={link.url}
        name={link.name}
        target={link.target}
        onClick={onClickHandler}
        dataHint={dataHint}
        dataValue={keyIndex}
        ariaLabel={link.name}
        {...ariaProps}
        hasNestedMenu={hasChildren}
        isNested={nestingLevel > 0 ? true : false}
        isExpanded={link.isExpanded}
        isSelected={isSelected}
        role="menu"
        primaryIconName={primaryIconName}
        isNavCollapsed={isNavCollapsed}
      />
    );
  }

  private _renderLink(link: INavLink, linkIndex: number, nestingLevel: number, groupIndex: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }

    // Build a unique key and keep it from collapsing by stringifying it, ex: 001 should be 001, not 1
    const keyIndex = groupIndex.toString() + nestingLevel.toString() + linkIndex.toString();
    const { isNavCollapsed } = this.props;

    return (
      <li role="listitem" key={keyIndex} title={link.name}>
        {this._renderCompositeLink(link, keyIndex, nestingLevel)}
        {// show child links
        // 1. only for the first level and
        // 2. only if nav pane is expanded and
        // 2. only the link is expanded
        nestingLevel === 0 && link.isExpanded && !isNavCollapsed ? (
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
            return null;
          } else {
            return this._renderLink(link, linkIndex, nestingLevel, groupIndex);
          }
        })}
      </>
    );
  }

  private _renderGroupName(groupName: string | undefined, groupIndex: number): React.ReactElement<{}> | null {
    // The default group heading will not show even if it is supplied
    // because it is redundant
    const { isNavCollapsed } = this.props;
    if (!groupName || groupIndex === 0) {
      return null;
    }

    return (
      <>
        <li className={classNames.navGroupDivider} />
        {!isNavCollapsed ? <li className={classNames.navGroupTitle}>{groupName}</li> : null}
      </>
    );
  }
}

export const NavLinkGroup = NavGroup;
