import * as React from 'react';
import { IIconProps } from '../Icon/Icon.Props';

export interface IMenuItemProps extends React.HTMLProps<HTMLButtonElement> {
  /**
   * Unique id to identify the item
   */
  key?: string;

  /**
   * Text description for the menu item to display
   */
  name?: string;

  /**
   * Props that go to the IconComponent
   */
  iconProps?: IIconProps;

  /**
   * Whether the menu item is disabled
   * @defaultvalue false
   */
  disabled?: boolean;

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
   * Any custom data the developer wishes to associate with the menu item.
   */
  data?: any;

  /**
   * Callback issued when the menu item is invoked
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IMenuItemProps) => void;

  /**
   * An optional URL to navigate to upon selection
   */
  href?: string;

  /**
   * A collection of submenu items
   */
  items?: IMenuItemProps[];

  /**
   * Additional css class to apply to the menu item
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Optional title for displaying text when hovering over an item.
   */
  title?: string;

  /**
   * Method to custom render this menu item
   * @defaultvalue undefined
   */
  onRender?: (item: any) => React.ReactNode;

  index?: number;
  hasCheckmarks?: boolean;
  hasIcons?: boolean;

  submenuOpen?: boolean;

  /**
   * Any additional properties to use when custom rendering menu items.
   */
  [propertyName: string]: any;
}
