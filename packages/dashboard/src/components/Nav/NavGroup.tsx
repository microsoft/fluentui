import * as React from 'react';
import { INavGroupProps, INavGroupStyles } from './NavGroup.types';
import { NavLink } from './NavLink';
import { NavLinkGroup } from './NavLinkGroup';
import { getStyles } from './NavGroup.styles';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<{}, INavGroupStyles>();

export class NavGroup extends React.PureComponent<INavGroupProps, {}> {
  constructor(props: INavGroupProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { groupIndex, groupName, links, isNavCollapsed, onCollapse, navRef } = this.props;
    const classNames = getClassNames(getStyles, { isNavCollapsed });

    return (
      <>
        {(groupName || groupIndex !== 0) && (
          <>
            <li role="none" className={classNames.navGroupDivider} />
            {!isNavCollapsed && <li className={classNames.navGroupTitle}>{groupName}</li>}
          </>
        )}
        {links.map((link: INavLink, linkIndex: number) => {
          const keyStr = groupIndex.toString() + linkIndex.toString();
          const hasSelectedNestedLink = this._isNestedLinkSelected(link);

          return (
            // if there are nested links, render a NavLinkGroup, otherwise just render a NavLink
            <li className={classNames.navItem} role="none" key={keyStr}>
              {!!link.links && link.links ? (
                <NavLinkGroup
                  isExpanded={link.isExpanded ? link.isExpanded : false}
                  isNavCollapsed={isNavCollapsed}
                  link={link}
                  hasNestedMenu={true}
                  hasSelectedNestedLink={hasSelectedNestedLink}
                  onCollapse={onCollapse}
                  navRef={navRef}
                />
              ) : (
                <NavLink
                  isNavCollapsed={isNavCollapsed}
                  name={link.name}
                  href={link.url}
                  target={link.target}
                  onClick={link.onClick}
                  data-value={link.name}
                  aria-label={link.ariaLabel ? link.ariaLabel : link.name}
                  primaryIconName={link.icon}
                  hasNestedMenu={false}
                  isNested={false}
                  role="menuitem"
                />
              )}
            </li>
          );
        })}
      </>
    );
  }

  private _isNestedLinkSelected(link: INavLink): boolean {
    return (
      link &&
      !!link.links &&
      link.links.some((childLink: INavLink) => {
        return !!childLink && childLink.isSelected;
      })
    );
  }
}
