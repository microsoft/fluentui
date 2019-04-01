import { IStyle, INavLink, IFocusZone, IStyleFunctionOrObject } from 'office-ui-fabric-react';
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

  /**
   * Ref to the main FocusZone of the navigation
   */
  focusZoneRef: React.RefObject<IFocusZone>;

  /**
   * Styles function or object that drives rendering of the step
   */
  styles?: IStyleFunctionOrObject<INavLinkGroupStyleProps, INavLinkGroupStyles>;
}

export interface INavLinkGroupStates {
  /**
   * Should be set on a link group when one of it's NavLink's is selected. NavLinkGroup reads this for default value for it's own state.
   */
  isExpanded?: boolean;

  /** Boolean to track whether or not a keyboard user has expanded the nav item
   * while the nav itself is collapsed
   */
  isKeyboardExpanded?: boolean;
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

  /** Boolean to track whether or not a keyboard user has expanded the nav item
   * while the nav itself is collapsed
   */
  isKeyboardExpanded: boolean;
}

export interface INavLinkGroupStyles {
  /**
   * NavLinkGroup
   */
  root: IStyle;
  nestedNav: IStyle;
  nestedNavLinksWrapper: IStyle;
  nestedNavLinks: IStyle;
  nestedNavHeaderItem: IStyle;
}
