import * as React from 'react';
import { IIconProps } from '../Icon/Icon.Props';
import { IMenuItemProps } from './MenuItem.Props';

export interface IMenuProps extends React.HTMLProps<HTMLElement> {

  /**
   * Collection of menu items.
   * @default []
   */
  items: IMenuItemProps[];

  /**
   * CSS class to apply to the context menu.
   * @default null
   */
  className?: string;

  /**
   * Whether this menu is a submenu of another menu or not.
   */
  isSubMenu?: boolean;

  /**
   * DOM id to tag the ContextualMenu with, for reference.
   * Should be used for 'aria-owns' and other such uses, rather than direct reference for programmatic purposes.
   */
  id?: string;

  onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IMenuItemProps) => void;

  ariaLabel?: string;

}