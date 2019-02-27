import * as React from 'react';
import { IStyle, IStyleFunctionOrObject, IBaseProps, INavLink, INavLinkGroup, INavState } from 'office-ui-fabric-react';

export interface INavProps extends IBaseProps {
  /**
   * A collection of link groups to display in the navigation bar
   */
  groups: INavLinkGroup[] | null;

  /**
   * (Optional) Used to toggle the nav component between expanded and collapsed state
   */
  isNavCollapsed?: boolean;

  /**
   * (Optional) If used inside a parent element with scrollbar, provide the parent element id to properly position
   * the floating nav by considering the scroll bar.
   */
  navScrollerId?: string;

  /**
   * (Optional) Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<INavStyleProps, INavStyles>;

  /**
   * (Optional) Used for telemetry
   */
  dataHint?: string;

  /**
   * (Optional) Enables the Edit link
   */
  enableCustomization?: boolean;

  /**
   * (Optional) Enables the show more / show less toggle. Only used when enableCustomization is true.
   */
  showMore?: boolean;

  /**
   * (Optional) enables custom string for the Edit link
   */
  editString?: string;

  /**
   * (Optional) enables custom string for the Show more link
   */
  showMoreString?: string;

  /**
   * (Optional) enables custom string for the Show less link
   */
  showLessString?: string;

  /**
   * (Optional) callback for the parent component when the nav component is toggled between expanded and collapsed state
   */
  onNavCollapsedCallback?(isCollapsed: boolean): void;

  /**
   * (Optional) callback for the Nav and when the "Show more" / "Show less" nav link is clicked.
   * The state "showMore" stays in the parent NavToggler component to keep show more/less state of Nav and SlimNav component in sync.
   */
  onShowMoreLinkClicked?(ev: React.MouseEvent<HTMLElement>): void;

  /**
   * (Optional) callback for the parent component when the nav node is toggled between expanded and collapsed state
   */
  onNavLinkGroupExpandedCallback?(nodeKey: string, isExpanded: boolean): void;

  /**
   * (Optional) callback for the parent component when the edit nav node is clicked
   */
  onEditNavClickedCallback?(): void;
}

export interface INavState extends INavState {
  /**
   * Used to toggle the nav component between expanded and collapsed state.
   */
  isNavCollapsed: boolean;
}

export interface INavGroupProps {
  /**
   * Title of the group. Is hidden for the first nav group.
   */
  groupName?: string;

  /**
   * Manages key index of nav groups, is passed down to navLinkGroup to help with unique ID
   */
  groupIndex: number;

  /**
   * Navigation links array
   */
  links: INavLink[];

  /**
   * TODO: Not sure what this is for
   */
  dataHint?: string;

  /**
   * Passes the state of the nav as a prop so the lower level components know how to behave
   */
  isNavCollapsed: boolean;

  /**
   * callback for when a group has been collapsed or expanded
   */
  onCollapse?: () => void;

  /**
   * Ref to the scrolling container of the navigation
   */
  navRef: React.RefObject<HTMLDivElement>;
}

export interface INavLinkProps extends React.AllHTMLAttributes<HTMLAnchorElement> {
  /**
   * Used for telemetry
   */
  dataHint?: string;

  /**
   * Used for telemetry
   */
  dataValue?: string;

  /**
   * Used by the screen reader to describe the nav link
   */
  ariaLabel?: string;

  /**
   * True means the nav link is currently expanded (visible), false means the nav link is currently collapsed (invisible)
   */
  ariaExpanded?: boolean;

  /**
   * Icon name for the icon shown on the left side of the nav link
   */
  primaryIconName?: string;

  /**
   * Icon name for the icon shown on the right side of the nav link
   */
  secondaryIconName?: string;

  /**
   * Has an L2 (nested) menu
   */
  hasNestedMenu?: boolean;

  /**
   * One of it's L2 links is selected (required for selected indicator)
   */
  hasSelectedNestedLink?: boolean;

  /**
   * Is an L2 (nested) link
   */
  isNested?: boolean;

  /**
   * Is an L1 in an expanded state
   */
  isExpanded?: boolean;

  /**
   * Either is the selected link, or the L1 with a selected L2
   */
  isSelected?: boolean;

  /**
   * Pays attention to Nav collapsed state to render the right selected indicator and nested menu
   */
  isNavCollapsed?: boolean;

  offsetUpdated?: (offset: number) => void;
}

export interface INavLinkGroupProps extends INavLinkProps {
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

export interface INavStyleProps {
  /**
   * When the Nav is collapsed
   */
  isNavCollapsed?: boolean;
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

export interface INavStyles {
  /**
   * Nav
   */
  root: IStyle;
  navWrapper: IStyle;
  navContainer: IStyle;
  navWrapperScroll: IStyle;
  navContainerScroll: IStyle;

  /**
   * NavGroup
   */
  navGroup: IStyle;
  navGroupDivider: IStyle;
  navGroupTitle: IStyle;
  navItem: IStyle;

  /**
   * NavLinkGroup
   */
  nestedNavMenu: IStyle;
  nestedNavMenuWhenNavCollapsed: IStyle;
  nestedNavLinksWrapper: IStyle;
  nestedNavLinksWhenNavCollapsed: IStyle;

  /**
   * NavLink
   */
  navLink: IStyle;
  navLinkSmall: IStyle;
  navItemBarMarker: IStyle;
  navItemIcon: IStyle;
  navItemText: IStyle;
  iconWrapper: IStyle;
}

export interface INavClassNames {
  root?: string;

  /**
   * NavGroup
   */
  navGroup?: string;
  navGroupDivider?: string;
  navGroupTitle?: string;
  navItem?: string;

  /**
   * NavLinkGroup
   */
  nestedNavMenu?: string;
  nestedNavMenuWhenNavCollapsed?: string;
  nestedNavLinksWrapper?: string;
  nestedNavLinksWhenNavCollapsed?: string;

  /**
   * NavLink
   */
  navLink?: string;
  navLinkSmall?: string;
  navItemBarMarker?: string;
  navItemIcon?: string;
  navItemText?: string;
  iconWrapper?: string;
}
