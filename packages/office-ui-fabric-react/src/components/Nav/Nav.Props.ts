import * as React from 'react';

export interface INav {
  /**
   * The meta 'key' property of the currently selected NavItem of the Nav. Can return
   * undefined if the currently selected nav item has no populated key property. Be aware
   * that in order for Nav to properly understand which key is selected all NavItems in
   * all groups of the Nav must have populated key properties.
   */
  selectedKey: string | undefined;
}

export interface INavProps {
  /**
   * Optional callback to access the INav interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: INav) => void;

  /**
   * A collection of link groups to display in the navigation bar
   */
  groups: INavLinkGroup[] | null;

  /**
   * Optional class name to allow styling.
   */
  className?: string;

  /**
   * Used to customize how content inside the link tag is rendered
   * @defaultvalue Default link rendering
   */
  onRenderLink?: Function;

  /**
   * Function callback invoked when a link in the navigation is clicked
   */
  onLinkClick?: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => void;

  /**
   * Indicates whether the navigation component renders on top of other content in the UI
   */
  isOnTop?: boolean;

  /**
   * (Optional) The key of the nav item initially selected.
   */
  initialSelectedKey?: string;

  /**
   * (Optional) The key of the nav item selected by caller.
   */
  selectedKey?: string;

  /**
   * (Optional) The nav container aria label.
   */
  ariaLabel?: string;

  /**
   * (Optional) The nav container aria label.
   */
  expandButtonAriaLabel?: string;

  /**
   * Deprecated at v0.68.1 and will be removed at >= V1.0.0.
   * @deprecated
   **/
  expandedStateText?: string;

  /**
   * Deprecated at v0.68.1 and will be removed at >= V1.0.0.
   * @deprecated
   **/
  collapsedStateText?: string;
}

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
}

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
   * Meta info for the link server, if negative, client side added node.
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
   * button icon name if applied
   */
  icon?: string;

  /**
   * Classname to apply to the icon link.
   */
  iconClassName?: string;

  /**
   * Deprecated at v0.68.1 and will be removed at >= v1.0.0.
   * @deprecated
   */
  engagementName?: string;

  /**
   * Deprecated at v0.68.1 and will be removed at >= v1.0.0.
   * @deprecated
   */
  altText?: string;

  /**
   * The name to use for functional automation tests
   */
  automationId?: string;

  /**
   * Whether or not the link is in an expanded state
   */
  isExpanded?: boolean;

  /**
   * Aria label for nav link
   */
  ariaLabel?: string;

  /**
   * title for tooltip or description
   */
  title?: string;

  /**
   * Link <a> target.
   */
  target?: string;

  /**
   * Point to the parent node key.  This is used in EditNav when move node from sublink to
   *   parent link vs vers.
   */
  parentId?: string;

  /**
   * (Optional) By default, any link with onClick defined will render as a button.
   * Set this property to true to override that behavior. (Links without onClick defined
   * will render as anchors by default.)
   */
  forceAnchor?: boolean;

  /**
   * (Optional) Any additional properties to apply to the rendered links.
   */
  [propertyName: string]: any;
}
