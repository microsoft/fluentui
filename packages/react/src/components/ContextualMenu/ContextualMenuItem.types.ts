import * as React from 'react';
import type { IContextualMenuItem } from './ContextualMenu.types';
import type { IMenuItemClassNames } from './ContextualMenu.classNames';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import type { IButtonStyles } from '../../Button';

/**
 * {@docCategory ContextualMenu}
 */
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

/**
 * {@docCategory ContextualMenu}
 */
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
  // eslint-disable-next-line deprecation/deprecation
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
  onCheckmarkClick?: (item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void;

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

/**
 * {@docCategory ContextualMenu}
 */
export interface IContextualMenuItemStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
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

/**
 * {@docCategory ContextualMenu}
 */
export interface IContextualMenuItemStyles extends IButtonStyles {
  /**
   * Style for the root element.
   */
  root?: IStyle;

  /**
   * Styles for a menu item that is an anchor link.
   */
  item?: IStyle;

  /**
   * Styles for a divider item of a ContextualMenu.
   */
  divider?: IStyle;

  /**
   * Styles for the content inside the button/link of the menuItem.
   */
  linkContent?: IStyle;

  /**
   * Styles for a menu item that is an anchor link.
   */
  anchorLink?: IStyle;

  /**
   * Styles for the icon element of a menu item.
   */
  icon?: IStyle;

  /**
   * Default icon color style for known icons.
   */
  iconColor?: IStyle;

  /**
   * Default style for checkmark icons.
   */
  checkmarkIcon?: IStyle;

  /**
   * Styles for the submenu icon of a menu item.
   */
  subMenuIcon?: IStyle;

  /**
   * Styles for the label of a menu item.
   */
  label?: IStyle;

  /**
   * Styles for the secondary text of a menu item.
   */
  secondaryText?: IStyle;

  /**
   * Styles for the container of a split menu item.
   */
  splitContainer?: IStyle;

  /**
   * Styles for the primary portion of a split menu item.
   */
  splitPrimary?: IStyle;

  /**
   * Styles for the menu portion of a split menu item.
   */
  splitMenu?: IStyle;

  /**
   * Styles for a menu item that is a link.
   */
  linkContentMenu?: IStyle;

  /**
   * Styles for hidden screen reader text.
   */
  screenReaderText?: IStyle;
}

export interface IContextualMenuItemRenderFunctions {
  /**
   * Rendering function for check mark icon
   */
  renderCheckMarkIcon: (props: IContextualMenuItemProps, customClassNames?: string[]) => React.ReactNode;

  /**
   * Rendering function for item icon
   */
  renderItemIcon: (props: IContextualMenuItemProps, customClassNames?: string[]) => React.ReactNode;

  /**
   * Rendering function for item label
   */
  renderItemName: (props: IContextualMenuItemProps, customClassNames?: string[]) => React.ReactNode;

  /**
   * Rendering function for secondary text label
   */
  renderSecondaryText: (props: IContextualMenuItemProps, customClassNames?: string[]) => React.ReactNode;

  /**
   * Rendering function for submenu icon
   */
  renderSubMenuIcon: (props: IContextualMenuItemProps, customClassNames?: string[]) => React.ReactNode;
}
