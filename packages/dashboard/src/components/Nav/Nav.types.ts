import * as React from 'react';
import { IStyle, IStyleFunctionOrObject, IBaseProps, INavLinkGroup, INavState } from 'office-ui-fabric-react';

export interface INavProps extends IBaseProps {
  /**
   * A collection of link groups to display in the navigation bar
   */
  groups: INavLinkGroup[];

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

  shouldScroll: boolean;
}

export interface INavStyleProps {
  /**
   * When the Nav is collapsed
   */
  isNavCollapsed: boolean;
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
  navGroup: IStyle;
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
