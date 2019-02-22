import * as React from 'react';
import { INavGroupProps, INavStyles, INavStyleProps } from './Nav.types';
import { NavLink } from './NavLink';
import { NavLinkGroup } from './NavLinkGroup';
import { getStyles } from './Nav.styles';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

export class NavGroup extends React.PureComponent<INavGroupProps, {}> {
  constructor(props: INavGroupProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { groupIndex, groupName, links } = this.props;
    const classNames = getClassNames(getStyles);

    return (
      <ul role="list" className={classNames.navGroup}>
        {this._renderGroupName(groupName, groupIndex)}
        {links.map((link: INavLink, linkIndex: number) => {
          return this._renderLinks(link, linkIndex, groupIndex);
        })}
      </ul>
    );
  }

  private _renderGroupName(groupName: string | undefined, groupIndex: number): React.ReactElement<{}> | null {
    const classNames = getClassNames(getStyles);
    // The default group heading will not show even if it is supplied
    // because it is redundant
    if (!groupName || groupIndex === 0) {
      return null;
    }

    const { isNavCollapsed } = this.props;

    return (
      <>
        <li className={classNames.navGroupDivider} />
        {!isNavCollapsed ? <li className={classNames.navGroupTitle}>{groupName}</li> : null}
      </>
    );
  }

  private _isNestedLinkSelected(link: INavLink): boolean {
    if (!link || !link.links || link.links.length === 0) {
      return false;
    }
    return link.links.some((childLink: INavLink) => {
      return !!childLink && childLink.isSelected;
    });
  }

  private _renderLinks(link: INavLink, linkIndex: number, groupIndex: number): React.ReactElement<{}> | null {
    if (!link) {
      return null;
    }
    const { isNavCollapsed } = this.props;
    const classNames = getClassNames(getStyles, { isNavCollapsed: isNavCollapsed });
    const keyStr = groupIndex.toString() + linkIndex.toString();
    const hasSelectedNestedLink = this._isNestedLinkSelected(link);

    return (
      // if there are nested links, render a NavLinkGroup, otherwise just render a NavLink
      <li className={classNames.navItem} role="listitem" key={keyStr}>
        {!!link.links && link.links ? (
          <NavLinkGroup
            isExpanded={link.isExpanded ? link.isExpanded : false}
            isNavCollapsed={isNavCollapsed}
            link={link}
            hasNestedMenu={true}
            hasSelectedNestedLink={hasSelectedNestedLink}
            onCollapse={this.props.onCollapse}
          />
        ) : (
          <NavLink
            isNavCollapsed={isNavCollapsed}
            id={link.name}
            name={link.name}
            href={link.url}
            target={link.target}
            onClick={link.onClick}
            ariaExpanded={!isNavCollapsed}
            dataValue={link.name}
            ariaLabel={link.ariaLabel}
            primaryIconName={link.icon}
            hasNestedMenu={false}
            isNested={false}
            role="menuitem"
          />
        )}
      </li>
    );
  }
}
