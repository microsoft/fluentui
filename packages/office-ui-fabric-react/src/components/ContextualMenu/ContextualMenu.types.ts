import * as React from 'react';
import { DirectionalHint } from '../../common/DirectionalHint';
import { IFocusZoneProps } from '../../FocusZone';
import { IIconProps } from '../Icon/Icon.types';
import { ICalloutProps, ICalloutContentStyleProps } from '../../Callout';
import { ITheme, IStyle } from '../../Styling';
import { IButtonStyles } from '../../Button';
import { IRefObject, IBaseProps, IPoint, IRectangle, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import { IContextualMenuClassNames, IMenuItemClassNames } from './ContextualMenu.classNames';
export { DirectionalHint } from '../../common/DirectionalHint';
import { IVerticalDividerClassNames } from '../Divider/VerticalDivider.types';
import { IContextualMenuItemProps, IContextualMenuRenderItem, IContextualMenuItemStyleProps } from './ContextualMenuItem.types';
import { IKeytipProps } from '../../Keytip';

export enum ContextualMenuItemType {
  Normal = 0,
  Divider = 1,
  Header = 2,
  Section = 3
}

export interface IContextualMenu {}

/**
 * React.Props is deprecated and we're removing it in 6.0. Usage of 'any' should go away with it.
 */
export interface IContextualMenuProps extends IBaseProps<IContextualMenu>, IWithResponsiveModeState {
  /**
   * Optional callback to access the IContextualMenu interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IContextualMenu>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IContextualMenuStyleProps, IContextualMenuStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the ContextualMenu
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * The target that the ContextualMenu should try to position itself based on.
   * It can be either an Element a querySelector string of a valid Element
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  target?: Element | string | MouseEvent | IPoint | null;

  /**
   * How the element should be positioned
   * @defaultvalue DirectionalHint.bottomAutoEdge
   */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used instead
   */
  directionalHintForRTL?: DirectionalHint;

  /**
   * The gap between the ContextualMenu and the target
   * @defaultvalue 0
   */
  gapSpace?: number;

  /**
   * The width of the beak.
   * @defaultvalue 16
   */
  beakWidth?: number;

  /**
   * If true the context menu will render as the same width as the target element
   * @defaultvalue false
   */
  useTargetWidth?: boolean;

  /**
   * If true the context menu will have a minimum width equal to the width of the target element
   * @defaultvalue false
   */
  useTargetAsMinWidth?: boolean;

  /**
   * The bounding rectangle for which the contextual menu can appear in.
   */
  bounds?: IRectangle;

  /**
   * If true then the beak is visible. If false it will not be shown.
   */
  isBeakVisible?: boolean;

  /**
   * If true the position returned will have the menu element cover the target.
   * If false then it will position next to the target;
   * @defaultvalue false
   */

  coverTarget?: boolean;

  /**
   * If true the positioning logic will prefer to flip edges rather than to nudge the rectangle to fit within bounds,
   * thus making sure the element aligns perfectly with target's alignment edge
   */
  alignTargetEdge?: boolean;

  /**
   * Collection of menu items.
   * @defaultvalue []
   */
  items: IContextualMenuItem[];

  /**
   * Aria Labelled by labelElementId
   * @defaultvalue null
   */
  labelElementId?: string;

  /**
   * Whether to focus on the menu when mounted.
   * @defaultvalue true
   */
  shouldFocusOnMount?: boolean;

  /**
   * Whether to focus on the contextual menu container (as opposed to the first menu item).
   * @defaultvalue null
   */
  shouldFocusOnContainer?: boolean;

  /**
   * Callback when the ContextualMenu tries to close. If dismissAll is true then all
   * submenus will be dismissed.
   */
  onDismiss?: (ev?: any, dismissAll?: boolean) => void;

  /**
   * Click handler which is invoked if onClick is not passed for individual contextual
   * menu item.
   * Returning true will dismiss the menu even if ev.preventDefault() was called.
   */
  onItemClick?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => boolean | void;

  /**
   * Whether this menu is a submenu of another menu or not.
   */
  isSubMenu?: boolean;

  /**
   * DOM id to tag the ContextualMenu with, for reference.
   * Should be used for 'aria-owns' and other such uses, rather than direct reference for programmatic purposes.
   */
  id?: string;

  /**
   * Aria label for accessibility for the ContextualMenu.
   * If none specified no aria label will be applied to the ContextualMenu.
   */
  ariaLabel?: string;

  /**
   * If true do not render on a new layer. If false render on a new layer.
   * @defaultvalue false
   */
  doNotLayer?: boolean;

  /**
   * If true the position will not change sides in an attempt to fit the ContextualMenu within bounds.
   * It will still attempt to align it to whatever bounds are given.
   * @defaultvalue false
   */
  directionalHintFixed?: boolean;

  /**
   * Callback for when the contextualmenu has been opened.
   */
  onMenuOpened?: (contextualMenu?: IContextualMenuProps) => void;

  /**
   * Callback for when the contextualmenu is being closed (removing from the DOM)
   */
  onMenuDismissed?: (contextualMenu?: IContextualMenuProps) => void;

  /**
   * Pass in custom callout props
   */
  calloutProps?: ICalloutProps;

  /**
   * Optional title to be displayed on top of the menu.
   */
  title?: string;

  /**
   * Method to provide the classnames to style the contextual menu. Default value is the getMenuClassnames func
   * defined in ContextualMenu.classnames.
   * Deprecated, use `styles` prop of `IContextualMenuProps` to leverage mergeStyles API.
   * @deprecated Use `styles` prop of `IContextualMenuProps` to leverage mergeStyles API.
   */
  getMenuClassNames?: (theme: ITheme, className?: string) => IContextualMenuClassNames;

  /** Method to call when trying to render a submenu. */
  onRenderSubMenu?: IRenderFunction<IContextualMenuProps>;

  /**
   * Method to override the render of the list of menu items.
   */
  onRenderMenuList?: IRenderFunction<IContextualMenuListProps>;

  /**
   * Delay (in milliseconds) to wait before expanding / dismissing a submenu on mouseEnter or mouseLeave
   */
  subMenuHoverDelay?: number;

  /**
   * Method to override the render of the individual menu items
   * @defaultvalue ContextualMenuItem
   */
  contextualMenuItemAs?: React.ComponentClass<IContextualMenuItemProps> | React.StatelessComponent<IContextualMenuItemProps>;

  /**
   * Props to pass down to the FocusZone.
   * NOTE: the default FocusZoneDirection will be used unless a direction
   * is specified in the focusZoneProps (even if other focusZoneProps are defined)
   * @defaultvalue \{direction: FocusZoneDirection.vertical\}
   */
  focusZoneProps?: IFocusZoneProps;

  /**
   * If specified, renders the ContextualMenu in a hidden state.
   * Use this flag, rather than rendering a ContextualMenu conditionally based on visibility,
   * to improve rendering performance when it becomes visible.
   * Note: When ContextualMenu is hidden its content will not be rendered. It will only render
   * once the ContextualMenu is visible.
   */
  hidden?: boolean;

  /**
   * If true, the contextual menu will not be updated until
   * focus enters the menu via other means. This will only result
   * in different behavior when shouldFocusOnMount = false
   * @defaultvalue null
   */
  delayUpdateFocusOnHover?: boolean;
}

export interface IContextualMenuListProps {
  items: IContextualMenuItem[];
  totalItemCount: number;
  hasCheckmarks: boolean;
  hasIcons: boolean;
}

export interface IContextualMenuItem {
  /**
   * Optional callback to access the IContextualMenuRenderItem interface. This will get passed down to ContextualMenuItem.
   */
  componentRef?: IRefObject<IContextualMenuRenderItem>;

  /**
   * Unique id to identify the item
   */
  key: string;

  /**
   * Text description for the menu item to display
   */
  text?: string;

  /**
   * Seconday description for the menu item to display
   */
  secondaryText?: string;

  itemType?: ContextualMenuItemType;

  /**
   * Props that go to the IconComponent
   */
  iconProps?: IIconProps;

  /**
   * Custom render function for the menu item icon
   */
  onRenderIcon?: IRenderFunction<IContextualMenuItemProps>;

  /**
   * Props that go to the IconComponent used for the chevron.
   */
  submenuIconProps?: IIconProps;

  /**
   * Whether the menu item is disabled
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * If the menu item is a split button, this prop disables purely the primary action of the button.
   * @defaultvalue false
   */
  primaryDisabled?: boolean;

  /**
   * [TODO] Not Yet Implemented
   */
  shortCut?: string;

  /**
   * Whether or not this menu item can be checked
   * @defaultvalue false
   */
  canCheck?: boolean;

  /**
   * Whether or not this menu item is currently checked.
   * @defaultvalue false
   */
  checked?: boolean;

  /**
   * Whether or not this menu item is a splitButton.
   * @defaultvalue false
   */
  split?: boolean;

  /**
   * Any custom data the developer wishes to associate with the menu item.
   */
  data?: any;

  /**
   * Callback issued when the menu item is invoked. If ev.preventDefault() is called in onClick, click will not close menu.
   * Returning true will dismiss the menu even if ev.preventDefault() was called.
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => boolean | void;

  /**
   * An optional URL to navigate to upon selection
   */
  href?: string;

  /**
   * An optional target when using href
   */
  target?: string;

  /**
   * An optional rel when using href. If target is _blank rel is defaulted to a value to prevent clickjacking.
   */
  rel?: string;

  /**
   * Properties to apply to a submenu to this item.
   *
   * The ContextualMenu will provide default values for `target`, `onDismiss`, `isSubMenu`,
   * `id`, `shouldFocusOnMount`, `directionalHint`, `className`, and `gapSpace`, all of which
   * can be overridden.
   */
  subMenuProps?: IContextualMenuProps;

  /**
   * Method to provide the classnames to style the individual items inside a menu.
   * Deprecated, use `styles` prop of `IContextualMenuItemProps` to leverage mergeStyles API.
   * @deprecated Use `styles` prop of `IContextualMenuItemProps` to leverage mergeStyles API.
   */
  getItemClassNames?: (
    theme: ITheme,
    disabled: boolean,
    expanded: boolean,
    checked: boolean,
    isAnchorLink: boolean,
    knownIcon: boolean,
    itemClassName?: string,
    dividerClassName?: string,
    iconClassName?: string,
    subMenuClassName?: string,
    primaryDisabled?: boolean
  ) => IMenuItemClassNames;

  /**
   * Optional IContextualMenuItemProps overrides to customize behaviors such as item styling via `styles`.
   */
  itemProps?: Partial<IContextualMenuItemProps>;

  /**
   * Method to provide the classnames to style the Vertical Divider of a split button inside a menu.
   * Default value is the getVerticalDividerClassnames func defined in ContextualMenu.classnames
   * @defaultvalue getSplitButtonVerticalDividerClassNames
   */
  getSplitButtonVerticalDividerClassNames?: (theme: ITheme) => IVerticalDividerClassNames;

  /**
   *  Properties to apply to render this item as a section.
   *  This prop is mutually exclusive with subMenuProps.
   */
  sectionProps?: IContextualMenuSection;

  /**
   * Additional css class to apply to the menu item
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Additional styles to apply to the menu item
   * Deprecated, use `styles` instead.
   * @defaultvalue undefined
   * @deprecated in favor of the `styles` prop to leverage mergeStyles API.
   */
  style?: React.CSSProperties;

  /**
   * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
   * If none is specified, the aria-label attribute will contain the item name
   */
  ariaLabel?: string;

  /**
   * Optional title for displaying text when hovering over an item.
   */
  title?: string;

  /**
   * Method to custom render this menu item.
   * For keyboard accessibility, the top-level rendered item should be a focusable element
   * (like an anchor or a button) or have the `data-is-focusable` property set to true.
   *
   * The function receives a function that can be called to dismiss the menu as a second argument.
   *  This can be used to make sure that a custom menu item click dismisses the menu.
   * @defaultvalue undefined
   */
  onRender?: (item: any, dismissMenu: (ev?: any, dismissAll?: boolean) => void) => React.ReactNode;

  /**
   * A function to be executed onMouseDown. This is executed before an onClick event and can
   * be used to interrupt native on click events as well. The click event should still handle
   * the commands. This should only be used in special cases when react and non-react are mixed.
   */
  onMouseDown?: (item: IContextualMenuItem, event: any) => void;

  /**
   * Optional override for the role attribute on the menu button. If one is not provided, it will
   * have a value of menuitem or menuitemcheckbox.
   */
  role?: string;

  /**
   * When rendering a custom component that is passed in, the component might also be a list of
   * elements. We want to keep track of the correct index our menu is using based off of
   * the length of the custom list. It is up to the user to increment the count for their list.
   */
  customOnRenderListLength?: number;

  /**
   * Keytip for this contextual menu item
   */
  keytipProps?: IKeytipProps;

  /**
   * Any additional properties to use when custom rendering menu items.
   */
  [propertyName: string]: any;

  /**
   * This prop is no longer used. All contextual menu items are now focusable when disabled.
   * @deprecated in 6.38.2 will be removed in 7.0.0
   */
  inactive?: boolean;

  /**
   * Text description for the menu item to display
   * Deprecated, use `text` instead.
   * @deprecated Use `text` instead.
   */
  name?: string;
}

/**
 * React.Props is deprecated and we're removing it in 6.0. Usage of 'any' should go away with it.
 */
export interface IContextualMenuSection extends React.ClassAttributes<any> {
  /**
   * The items to include inside the section.
   */
  items: IContextualMenuItem[];

  /**
   * The optional section title.
   */
  title?: string;

  /**
   * If set to true, the section will display a divider at the top of the section.
   */
  topDivider?: boolean;

  /**
   * If set to true, the section will display a divider at the bottom of the section.
   */
  bottomDivider?: boolean;
}

export interface IMenuItemStyles extends IButtonStyles {
  /**
   * Styles for a menu item that is an anchor link.
   */
  item: IStyle;

  /**
   * Styles for the content inside the button/link of the menuItem.
   */
  linkContent: IStyle;

  /**
   * Styles for a menu item that is an anchor link.
   */
  anchorLink: IStyle;

  /**
   * Default icon color style for known icons.
   */
  iconColor: IStyle;

  /**
   * Default style for checkmark icons.
   */
  checkmarkIcon: IStyle;

  /**
   * Styles for the submenu icon of a menu item.
   */
  subMenuIcon: IStyle;

  /**
   * Styles for a divider item of a ConextualMenu.
   */
  divider: IStyle;
}

export interface IContextualMenuStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  // Insert ContextualMenu style props below
}

export interface IContextualMenuStyles {
  /**
   * Style override for the contextual menu title.
   */
  title: IStyle;

  /**
   * Style for the container which parents all menu items.
   */
  container: IStyle;

  /**
   * Base styles for the root element of all ContextualMenus.
   */
  root: IStyle;

  /**
   * Styles for the header item of a ContextualMenu
   */
  header: IStyle;

  /**
   * Styles for the list that contains all menuItems.
   */
  list: IStyle;

  /**
   * SubComponent styles.
   */
  subComponentStyles: IContextualMenuSubComponentStyles;
}

export interface IContextualMenuSubComponentStyles {
  /** Refers to the callout that hosts the ContextualMenu options */
  callout: IStyleFunctionOrObject<ICalloutContentStyleProps, any>;

  /** Refers to the item in the list */
  menuItem: IStyleFunctionOrObject<IContextualMenuItemStyleProps, any>;
}
