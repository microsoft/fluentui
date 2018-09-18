/* tslint:disable */
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { INavLink, INavLinkGroup, INavState } from 'office-ui-fabric-react/lib/Nav';
/* tslint:enable */

export interface INavProps {
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
   * (Optional) When enabled
   * 1. Links will consider isHidden property to show/hide itself.
   * 2. There will be a customization group with show more/less link to show/hide hidden links.
   * 3. There will also be an edit nav link button. This is for the partner to implement the UX which
   * will customize the isHidden property of the nav link (possibly through a flyout and refresh the Nav component).
   */
  enableCustomization?: boolean;

  /**
   * (Optional) enables passing custom strings to the edit and show more links
   */
  editLinkName?: string;
  showMoreLinkName?: string;
  showLessLinkName?: string;

  /**
   * Used to override isHidden property of the Nav link when the "Show More" link is clicked
   */
  showMore?: boolean;

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
  onNavNodeExpandedCallback?(nodeKey: string, isExpanded: boolean): void;

  /**
   * (Optional) callback for the parent component when the edit nav node is clicked
   */
  onEditLeftNavClickedCallback?(): void;
}

export interface INavState extends INavState {
  /**
   * Used to toggle the nav component between expanded and collapsed state.
   */
  isNavCollapsed?: boolean;

  /**
   * Used to override isHidden property of the Nav link when the "Show More" link is clicked
   */
  showMore?: boolean;
}

export interface INavGroupProps {
  /**
   * Used to toggle L1 nav links
   */
  linkCollapsed?: boolean;
  groupName?: string;
  groupIndex: number;
  links: INavLink[];
  enableCustomization?: boolean;
  showMore?: boolean;
  dataHint?: string;
  isNavCollapsed?: boolean;
}

export interface INavLinkGroupProps extends INavLinkProps {
  link: INavLink;
  isExpanded: boolean;
  isNavCollapsed?: boolean;
  hasNestedMenu?: boolean;
  hasSelectedNestedLink?: boolean;
}

export interface INavLinkGroupStates {
  isExpanded: boolean;
  hasSelectedNestedLink?: boolean;
}

export interface INavLink extends INavLink {
  /**
   * (Optional) Used to adjust the floating nav when the scrollbar appears
   */
  scrollTop?: number;

  /**
   * (Optional) Show / hide the nav link
   */
  isHidden?: boolean;

  /**
   * (Optional) Localized alternate text for the name field.
   */
  alternateText?: string;

  /**
   * (Optional) To identify whether this link is show more/less and
   * provide internal implementation to show/hide nav links based on isHidden property.
   */
  isShowMoreLink?: boolean;

  /**
   * (Optional) Provides an ability to toggle auto expand when the selectedKey prop is one of the child of this link
   */
  disableAutoExpand?: boolean;
}

export interface INavStyleProps {
  /**
   * is element selected boolean
   */
  isSelected?: boolean;

  /**
   * has children boolean
   */
  hasChildren?: boolean;

  /**
   * has group name
   */
  hasGroupName?: boolean;

  /**
   * has child be selected boolean
   */
  isChildLinkSelected?: boolean;

  /**
   * nesting level of the nav item in the nav tree
   */
  nestingLevel?: number;

  /**
   * is nav collapsed boolean
   */
  isCollapsed?: boolean;

  /**
   * if the component is hosted inside a scroll bar, send the scrollTop to position the floating nav relative to it's parent
   */
  scrollTop?: number;
  isNavCollapsed?: boolean;
  isExpanded?: boolean;
}

export interface INavGroupStyleProps {
  linkCollapsed?: boolean;
  groupName?: string;
  groupIndex: number;
  links: INavLink[];
  enableCustomization?: boolean;
  showMore?: boolean;
  dataHint?: string;
  isNavCollapsed?: boolean;
}

export interface INavLinkGroupStyleProps {
  link: INavLink;
  isExpanded: boolean;
  isNavCollapsed?: boolean;
  hasNestedMenu?: boolean;
  hasSelectedNestedLink?: boolean;
}

export interface INavLinkStyleProps {
  hasNestedMenu?: boolean;
  hasSelectedNestedLink?: boolean;
  isNested?: boolean;
  isExpanded?: boolean;
  isSelected?: boolean;
  isNavCollapsed?: boolean;
}

export interface INavStyles {
  /**
   * Style set for the nav component root
   */
  nav: IStyle;
  navCollapsed: IStyle;
}

export interface INavGroupStyles {
  /**
   * Style set for the nav group separator
   */
  navGroupDivider: IStyle;

  /**
   * Style set for the group name in nav group separator
   */
  navGroupTitle: IStyle;
  navItem: IStyle;
}

export interface INavLinkGroupStyles {
  nestedNavMenu: IStyle;
  nestedNavMenuCollapsed: IStyle;
}

export interface INavLinkStyles {
  /**
   * Style set for the nav item root
   */

  navLink: IStyle;
  navLinkSmall: IStyle;
  hidden: IStyle;

  /**
   * Style set for the bar marker in the nav item
   */
  navItemBarMarker: IStyle;
  navItemBarMarkerSmall: IStyle;

  /**
   * Style set for the icon column in the nav item
   */
  navItemIcon: IStyle;

  /**
   * Style set for the name column in the nav item
   */
  navItemText: IStyle;

  /**
   * Style for navLink icons
   */
  iconWrapper: IStyle;
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
   * CSS class for the nav link container
   */
  rootClassName?: string;

  /**
   * Icon name for the icon shown on the left side of the nav link
   */
  primaryIconName?: string;

  /**
   * Icon name for the icon shown on the right side of the nav link
   */
  secondaryIconName?: string;

  /**
   * CSS class for the text part of the nav link
   */
  textClassName?: string;

  /**
   * CSS class for the icon part of the nav link
   */
  iconClassName?: string;

  /**
   * CSS class for the bar marker part of the nav link
   */
  barClassName?: string;

  hasNestedMenu?: boolean;
  hasSelectedNestedLink?: boolean;
  isNested?: boolean;
  isExpanded?: boolean;
  isSelected?: boolean;
  isNavCollapsed?: boolean;
}

export interface INavLinkStates {
  isSelected?: boolean;
}
