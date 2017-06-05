import * as React from 'react';
import { IIconProps } from '../../Icon';
import { IContextualMenuProps } from './ContextualMenu.Props';

export enum ContextualMenuItemType {
  Normal = 0,
  Divider = 1,
  Header = 2
}

export interface IContextualMenuItem {
  /**
   * Unique id to identify the item
   */
  key: string;

  /**
   * Text description for the menu item to display
   */
  name?: string;

  itemType?: ContextualMenuItemType;

  /**
   * Props that go to the IconComponent
   */
  iconProps?: IIconProps;

  /**
   * The props for the icon shown when providing a menu dropdown.
   */
  menuIconProps?: IIconProps;

  /**
   * Props that go to the IconComponent used for the chevron.
   * @deprecated use menuIconProps
   */
  submenuIconProps?: IIconProps;

  /**
   * Deprecated at v0.69.0 and will no longer exist after 1.0 use IconProps instead.
   * @deprecated
   */
  icon?: string;

  /**
   * Whether the menu item is disabled
   * @defaultvalue false
   */
  disabled?: boolean;

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
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'checked' instead.
   * @deprecated
   */
  isChecked?: boolean;

  /**
   * Any custom data the developer wishes to associate with the menu item.
   */
  data?: any;

  /**
   * Callback issued when the menu item is invoked
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) => void;

  /**
   * An optional URL to navigate to upon selection
   */
  href?: string;

  /**
   * Deprecated at v.80.0 and will be removed by v 1.0. Use 'subMenuProps' instead.
   * @deprecated
   */
  items?: IContextualMenuItem[];

  /**
   * Properties to apply to a submenu to this item.
   * The ContextualMenu will provide default values for 'target', 'onDismiss', 'isSubMenu',
   *  'id', 'shouldFocusOnMount', 'directionalHint', 'className', and 'gapSpace', all of which
   *  can be overridden.
   */
  menuProps?: IContextualMenuProps;

  /**
   * @deprecated use menuProps
   */
  subMenuProps?: IContextualMenuProps;

  /**
   * Additional css class to apply to the menu item
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Additional styles to apply to the menu item
   * @defaultvalue undefined
   */
  style?: React.CSSProperties;

  /**
   * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
   * If none is specified, the arai-label attribute will contain the item name
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
   * @defaultvalue undefined
   */
  onRender?: (item: any) => React.ReactNode;

  /**
   * A function to be executed onMouseDown. This is executed before an onClick event and can
   * be used to interrupt native on click events as well. The click event should still handle
   * the commands. This should only be used in special cases when react and non-react are mixed.
   */
  onMouseDown?: (item: IContextualMenuItem, event: any) => void;

  /**
   * Any additional properties to use when custom rendering menu items.
   */
  [propertyName: string]: any;
}
