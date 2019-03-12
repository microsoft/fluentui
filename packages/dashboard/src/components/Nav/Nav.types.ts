/* tslint:disable */
import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { INavLink, INavLinkGroup, INavState } from 'office-ui-fabric-react/lib/Nav';
/* tslint:enable */

export enum NavGroupType {
  ToggleGroup,
  MenuGroup,
  CustomizationGroup
}

export interface INavProps {
  /**
   * A collection of link groups to display in the navigation bar
   */
  groups: ICustomNavLinkGroup[] | null;

  /**
   * (Optional) The key of the nav item initially selected.
   */
  initialSelectedKey?: string;

  /**
   * (Optional) The key of the nav item selected by caller.
   */
  selectedKey?: string;

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
   * Used to override isHidden property of the Nav link when the "Show More" link is clicked
   */
  showMore?: boolean;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * (Optional) callback for the parent component when the nav component is toggled between expanded and collapsed state
   */
  onNavCollapsedCallback?(isCollapsed: boolean): void;

  /**
   * (Optional) callback for the Nav and SlimNav component when the "Show more" / "Show less" nav link is clicked.
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

export interface INavTogglerProps extends INavProps {
  /**
   * (Optional) callback for the consumer of NavToggler to know about the "Show more" / "Show less" event.
   */
  onShowMoreLinkClicked?(ev: React.MouseEvent<HTMLElement>, showMore?: boolean): void;
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

export interface ICustomNavLinkGroup extends INavLinkGroup {
  /**
   * Used to identify whether the nav group is toggle group or menu group or the customization group.
   */
  groupType: NavGroupType;
}

export interface INavStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

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
}

export interface INavStyles {
  /**
   * Style set for the nav component root
   */
  root: IStyle;

  /**
   * Style set for the nav item root
   */
  navItemRoot: IStyle;

  /**
   * Style set for the bar marker in the nav item
   */
  navItemBarMarker: IStyle;

  /**
   * Style set for the icon column in the nav item
   */
  navItemIconColumn: IStyle;

  /**
   * Style set for the name column in the nav item
   */
  navItemNameColumn: IStyle;

  /**
   * Style set for the slim version of nav item
   */
  navSlimItemRoot: IStyle;

  /**
   * Style set for the floating nav root in the slim version
   */
  navFloatingRoot: IStyle;

  /**
   * Style set for the floating nav item root
   */
  navFloatingItemRoot: IStyle;

  /**
   * Style set for the nav group separator
   */
  navGroupSeparatorRoot: IStyle;

  /**
   * Style set for the horizontal line in nav group separator
   */
  navGroupSeparatorHrLine: IStyle;

  /**
   * Style set for the group name in nav group separator
   */
  navGroupSeparatorHeaderGroupName: IStyle;

  /**
   * Style set for the nav toggler which toggles expanded and slim nav
   */
  navToggler: IStyle;

  /**
   * Style set to apply border on keyboard focus
   */
  focusedStyle: IStyle;
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
  leftIconName?: string;

  /**
   * Icon name for the icon shown on the right side of the nav link
   */
  rightIconName?: string;

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

  /**
   * Style to apply border on keyboard focus
   */
  focusedStyle?: string;
}
