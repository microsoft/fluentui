import { ITheme, IStyle } from '../../Styling';
import { IRefObject, IRenderFunction } from '../../Utilities';
import { IButtonStyles } from 'office-ui-fabric-react/lib/components/Button';
import { IVerticalDividerClassNames } from 'office-ui-fabric-react/lib/Divider';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { ContextualMenuItemType, IContextualMenuProps, IContextualMenuSection } from './ContextualMenu.types';
import { IIconProps } from '../Icon/Icon.types';
import { IKeytipProps } from '../Keytip/Keytip.types';

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
  onClick?: (
    ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ) => boolean | void;

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
   * The ContextualMenu will provide default values for 'target', 'onDismiss', 'isSubMenu',
   *  'id', 'shouldFocusOnMount', 'directionalHint', 'className', and 'gapSpace', all of which
   *  can be overridden.
   */
  subMenuProps?: IContextualMenuProps;

  /**
   * Method to provide the classnames to style the individual items inside a menu. Default value is the getItemClassnames func
   * defined in ContextualMenu.classnames.
   * @default getItemClassNames
   * @deprecated Use `styles` prop of `IContextualMenuItemProps` to leverage mergeStyle API.
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
   * Method to provide the classnames to style the Vertical Divider of a split button inside a menu. Default value is the getVerticalDividerClassnames func defined in ContextualMenu.classnames
   * @default getSplitButtonVerticalDividerClassNames
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
   * @defaultvalue undefined
   * @deprecated in favor of mergeStyles API.
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
   * @deprecated Use `text` instead.
   */
  name?: string;
}

export interface IContextualMenuRenderItem {
  /**
   * Function to open this item's subMenu, if present.
   */
  openSubMenu: () => void;

  /**
   * Function to close this item's subMenu, if present.
   */
  dismissSubMenu: () => void;

  /**
   * Dismiss the menu this item belongs to.
   */
  dismissMenu: (dismissAll?: boolean) => void;
}

export interface IContextualMenuItemProps extends React.HTMLAttributes<IContextualMenuItemProps> {
  /**
   * Optional callback to access the IContextualMenuRenderItem interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IContextualMenuRenderItem>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IContextualMenuItemStyleProps, IContextualMenuItemStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the ContextualMenuItem
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * The item to display
   */
  item: IContextualMenuItem;

  /**
   * Classnames for different aspects of a menu item
   */
  classNames: IMenuItemClassNames;

  /**
   * Index of the item
   */
  index: number;

  /**
   * If this item has icons
   */
  hasIcons: boolean | undefined;

  /**
   * Click handler for the checkmark
   */
  onCheckmarkClick?: ((item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void);

  /**
   * This prop will get set by ContextualMenu and can be called to open this item's subMenu, if present.
   */
  openSubMenu?: (item: any, target: HTMLElement) => void;

  /**
   * This prop will get set by ContextualMenu and can be called to close this item's subMenu, if present.
   */
  dismissSubMenu?: () => void;

  /**
   * This prop will get set by ContextualMenu and can be called to close the menu this item belongs to.
   * If dismissAll is true, all menus will be closed.
   */
  dismissMenu?: (ev?: any, dismissAll?: boolean) => void;

  /**
   * This prop will get set by the wrapping component and will return the element that wraps this ContextualMenuItem.
   * Used for openSubMenu.
   */
  getSubmenuTarget?: () => HTMLElement | undefined;
}

export interface IContextualMenuItemStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the ContextualMenuItem.
   */
  className?: string;

  /**
   * Whether or not the menu item is disabled.
   */
  disabled: boolean;

  /**
   * Whether or not the menu item is expanded.
   */
  expanded: boolean;

  /**
   * Whether or not the menu item is checked.
   */
  checked: boolean;

  /**
   * Indicates if a menu item is an anchor link.
   */
  isAnchorLink: boolean;

  /**
   * Indicates if the icon used is of the known set of icons.
   */
  knownIcon: boolean;

  /**
   * The optional class name to apply to the item element.
   */
  itemClassName?: string;

  /**
   * The optional class name to apply to the divider element.
   */
  dividerClassName?: string;

  /**
   * The optional class name to apply to the icon element.
   */
  iconClassName?: string;

  /**
   * The optional class name to apply to the sub-menu if present.
   */
  subMenuClassName?: string;

  /**
   * Whether or not the primary section of a split menu item is disabled.
   */
  primaryDisabled?: boolean;
}

export interface IContextualMenuItemStyles extends IButtonStyles {
  /**
   * Styles for a menu item that is an anchor link.
   */
  item: IStyle;

  /**
   * Styles for a divider item of a ContextualMenu.
   */
  divider: IStyle;

  /**
   * Styles for the root element of a menu item.
   */
  root: IStyle;

  /**
   * Styles for the content inside the button/link of the menuItem.
   */
  linkContent: IStyle;

  /**
   * Styles for a menu item that is an anchor link.
   */
  anchorLink: IStyle;

  /**
   * Styles for the icon element of a menu item.
   */
  icon: IStyle;

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
   * Styles for the label of a menu item.
   */
  label: IStyle;

  /**
   * Styles for the secondary text of a menu item.
   */
  secondaryText: IStyle;

  /**
   * Styles for the container of a split menu item.
   */
  splitContainer: IStyle;

  /**
   * Styles for the primary portion of a split menu item.
   */
  splitPrimary: IStyle;

  /**
   * Styles for the menu portion of a split menu item.
   */
  splitMenu: IStyle;

  /**
   * Styles for a menu item that is a link.
   */
  linkContentMenu: IStyle;
}

/** @deprecated in favor of mergeStyles API. */
export interface IMenuItemClassNames {
  item: string;
  divider: string;
  root: string;
  linkContent: string;
  icon: string;
  checkmarkIcon: string;
  subMenuIcon: string;
  label: string;
  secondaryText: string;
  splitContainer: string;
  splitPrimary: string;
  splitMenu: string;
  linkContentMenu: string;
}
