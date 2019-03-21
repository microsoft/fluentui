import { IStyle, INavLink } from 'office-ui-fabric-react';
export interface INavLinkGroupProps {
  /**
   * L1 link which contains all NavLink data and L2 links array
   */
  link: INavLink;

  /**
   * Takes this prop from NavGroup, uses it to set and manage L1 expanded/collapsed state
   */
  isExpanded: boolean;

  /**
   * Pays attention to Nav collapsed state to render the nested L2 menu appropriately
   */
  isNavCollapsed?: boolean;

  /**
   * Receives this prop from NavGroup and passes it through to NavLink so NavLink knows how to render L1 selected indicator
   */
  hasNestedMenu?: boolean;

  /**
   * Receives this prop from NavGroup and passes it through to NavLink so NavLink knows how to render L2 selected indicator
   */
  hasSelectedNestedLink?: boolean;

  /**
   * callback for when a group has been collapsed or expanded
   */
  onCollapse?: () => void;

  /**
   * Ref to the scrolling container of the navigation
   */
  navRef: React.RefObject<HTMLDivElement>;
}

export interface INavLinkGroupStates {
  /**
   * Should be set on a link group when one of it's NavLink's is selected. NavLinkGroup reads this for default value for it's own state.
   */
  isExpanded: boolean;
  /**
   * Set to true when one of it's NavLink's is selected. This is used to manage when the selected indicator is visible or not.
   */
  hasSelectedNestedLink?: boolean;
}

export interface INavLinkGroupStyleProps {
  /**
   * Pays attention to the NavLinkGroup expanded/collapsed state
   */
  isExpanded?: boolean;

  /**
   * Pays attention to the Nav expanded/collapsed state
   */
  isNavCollapsed?: boolean;
}

export interface INavLinkGroupStyles {
  /**
   * NavLinkGroup
   */
  root: IStyle;
  navMenuContainer: IStyle;
  nestedNavLinksWrapper: IStyle;
  nestedNavLinks: IStyle;
}
