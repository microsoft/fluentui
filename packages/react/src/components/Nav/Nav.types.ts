import * as React from 'react';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IRenderFunction, IStyleFunctionOrObject, IComponentAs } from '../../Utilities';
import type { IIconProps } from '../Icon/Icon.types';
import type { IButtonProps } from '../../Button';
import type { IFocusZoneProps } from '../../FocusZone';

/**
 * {@doccategory Nav}
 */
export interface IRenderGroupHeaderProps extends INavLinkGroup {
  /**
   * Whether or not the group is presently expanded.
   */
  isExpanded?: boolean;
}

/**
 * {@docCategory Nav}
 */
export interface INav {
  /**
   * The meta 'key' property of the currently selected NavItem of the Nav. Can return
   * undefined if the currently selected nav item has no populated key property. Be aware
   * that in order for Nav to properly understand which key is selected all NavItems in
   * all groups of the Nav must have populated key properties.
   */
  selectedKey: string | undefined;
  /**
   * Sets focus to the first tabbable item in the zone.
   * @param forceIntoFirstElement - If true, focus will be forced into the first element, even
   * if focus is already in the focus zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focus(forceIntoFirstElement?: boolean): boolean;
}

/**
 * {@docCategory Nav}
 */
export interface INavProps {
  /**
   * Optional callback to access the INav interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<INav>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<INavStyleProps, INavStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Nav
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * A collection of link groups to display in the navigation bar
   */
  groups: INavLinkGroup[] | null;

  /**
   * Used to customize how content inside the group header is rendered
   */
  onRenderGroupHeader?: IRenderFunction<IRenderGroupHeaderProps>;

  /**
   * Render a custom link in place of the normal one.
   * This replaces the entire button rather than simply button content
   */
  linkAs?: IComponentAs<INavButtonProps>;

  /**
   * Used to customize how content inside the link tag is rendered
   */
  onRenderLink?: IRenderFunction<INavLink>;

  /**
   * Function callback invoked when a link in the navigation is clicked
   */
  onLinkClick?: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => void;

  /**
   * Function callback invoked when the chevron on a link is clicked
   */
  onLinkExpandClick?: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => void;

  /**
   * Indicates whether the navigation component renders on top of other content in the UI
   */
  isOnTop?: boolean;

  /**
   * (Optional) The key of the nav item initially selected.
   */
  initialSelectedKey?: string;

  /**
   * (Optional) Override the role of the `<nav>` element.
   * This is only recommended if you're nesting `Nav` inside a parent navigation region.
   */
  role?: string;

  /**
   * (Optional) The key of the nav item selected by caller.
   */
  selectedKey?: string;

  /**
   * (Optional) The nav container aria label.
   */
  ariaLabel?: string;

  /**
   * (Optional) The nav container aria label. The link name is prepended to this label.
   * If not provided, the aria label will default to the link name.
   *
   * @deprecated Use `expandAriaLabel` and `collapseAriaLabel` on groups instead
   */
  expandButtonAriaLabel?: string;
  /**
   * (Deprecated) Use ariaCurrent on links instead
   * @deprecated Use ariaCurrent on links instead
   */
  selectedAriaLabel?: string;

  /**
   * (Optional) Used to define the props of the FocusZone wrapper.
   */
  focusZoneProps?: IFocusZoneProps;
}

/**
 * {@docCategory Nav}
 */
export interface INavLinkGroup {
  /**
   * Text to render as the header of a group
   */
  name?: string;

  /**
   * Links to render within this group
   */
  links: INavLink[];

  /**
   * The name to use for functional automation tests
   */
  automationId?: string;

  /**
   * If true, the group should render collapsed by default
   */
  collapseByDefault?: boolean;

  /**
   * Callback invoked when a group header is clicked
   */
  onHeaderClick?: (ev?: React.MouseEvent<HTMLElement>, isCollapsing?: boolean) => void;

  /**
   * ARIA label when group is collapsed and can be expanded.
   */
  expandAriaLabel?: string;

  /**
   * ARIA label when group is collapsed and can be expanded.
   * WARNING: using separate labels for expanded and collapsed state is not recommended.
   *
   * @deprecated Use `expandAriaLabel` on its own instead.
   */
  collapseAriaLabel?: string;

  /**
   * (Optional) Any additional properties to apply to a group.
   */
  groupData?: any;
  /**
   * Provides consumer control to update the collapsed/expanded state of the group.
   */
  isExpanded?: boolean;
}

/**
 * {@docCategory Nav}
 */
export interface INavLink {
  /**
   * Text to render for this link
   */
  name: string;

  /**
   * URL to navigate to for this link
   */
  url: string;

  /**
   * Unique, stable key for the link, used when rendering the list of links and for tracking
   * the currently selected link.
   */
  key?: string;

  /**
   * Child links to this link, if any
   */
  links?: INavLink[];

  /**
   * Callback invoked when this link is clicked. Providing this callback will cause the link
   * to render as a button (rather than an anchor) unless forceAnchor is set to true.
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => void;

  /**
   * Name of an icon to render next to the link button.
   */
  icon?: string;

  /**
   * @deprecated Use `iconProps.className` instead.
   */
  iconClassName?: string;

  /**
   * Props for an icon to render next to the link button.
   */
  iconProps?: IIconProps;

  /**
   * The name to use for functional automation tests
   */
  automationId?: string;

  /**
   * Whether or not the link is in an expanded state
   */
  isExpanded?: boolean;

  /**
   * Aria-current token for active nav links. Must be a valid token value, and defaults to 'page'.
   */
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true';

  /**
   * Aria label for nav link. Ignored if `collapseAriaLabel` or `expandAriaLabel` is provided.
   */
  ariaLabel?: string;

  /**
   * Text for title tooltip and ARIA description.
   */
  title?: string;

  /**
   * Link <a> target.
   */
  target?: string;

  /**
   * Whether or not the link is disabled.
   */
  disabled?: boolean;

  /**
   * (Optional) By default, any link with onClick defined will render as a button.
   * Set this property to true to override that behavior. (Links without onClick defined
   * will render as anchors by default.)
   */
  forceAnchor?: boolean;

  /**
   * ARIA label when group is collapsed and can be expanded.
   */
  expandAriaLabel?: string;

  /**
   * ARIA label when group is collapsed and can be expanded.
   */
  collapseAriaLabel?: string;

  /**
   * (Optional) Any additional properties to apply to the rendered links.
   */
  [propertyName: string]: any;
}

/**
 * {@docCategory Nav}
 */
export interface INavStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * is element on top boolean
   */
  isOnTop?: boolean;

  /**
   * is element a link boolean
   */
  isLink?: boolean;

  /**
   * is element disabled
   */
  isDisabled?: boolean;

  /**
   * is element a group boolean
   */
  isGroup?: boolean;

  /**
   * is element expanded boolean
   */
  isExpanded?: boolean;

  /**
   * is element selected boolean
   */
  isSelected?: boolean;

  /**
   * is button
   */
  isButtonEntry?: boolean;

  /**
   * Nav height value
   */
  navHeight?: number;

  /**
   * left padding value
   */
  leftPadding?: number;

  /**
   * left padding when expanded value
   */
  leftPaddingExpanded?: number;

  /**
   * right padding value
   */
  rightPadding?: number;

  /**
   * position value
   */
  position?: number;

  /**
   * Inherited from INavProps
   * A collection of link groups to display in the navigation bar
   */
  groups: INavLinkGroup[] | null;
}

/**
 * {@docCategory Nav}
 */
export interface INavStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;

  /**
   * Style set for the link text container div element.
   */
  linkText: IStyle;

  /**
   * Style set for the link element extending the
   * root style set for ActionButton component.
   */
  link: IStyle;

  /**
   * Style set for the composite link container div element
   */
  compositeLink: IStyle;

  /**
   * Style set for the chevron button inside the composite
   * link and group elements.
   */
  chevronButton: IStyle;

  /**
   * Style set for the chevron icon inside the composite
   * link and group elements.
   */
  chevronIcon: IStyle;

  /**
   * Style set for the nav links ul element.
   */
  navItems: IStyle;

  /**
   * Style set for the nav links li element.
   */
  navItem: IStyle;

  /**
   * Style set for the group root div.
   */
  group: IStyle;

  /**
   * Style set for the group content div inside group.
   */
  groupContent: IStyle;
}

/**
 * {@docCategory Nav}
 */
export interface INavButtonProps extends IButtonProps {
  /**
   * (Optional) Link to be rendered.
   */
  link?: INavLink;
}
