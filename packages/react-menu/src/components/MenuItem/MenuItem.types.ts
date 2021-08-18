import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type MenuItemSlots = {
  /**
   * Icon slot rendered before children content
   */
  icon?: React.HTMLAttributes<HTMLElement>;

  /**
   * A helper slot for alignment when a menu item is used with selectable menuitems
   * Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components
   */
  checkmark?: React.HTMLAttributes<HTMLElement>;

  /**
   * Icon slot that shows the indicator for a submenu
   */
  submenuIndicator?: React.HTMLAttributes<HTMLElement>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible
   */
  content: React.HTMLAttributes<HTMLElement>;

  /**
   * Secondary content rendered opposite the primary content (e.g Shortcut text)
   */
  secondaryContent?: React.HTMLAttributes<HTMLElement>;
};

interface MenuItemCommons {
  /**
   * If the menu item is a trigger for a submenu
   */
  hasSubmenu?: boolean;

  /**
   * Applies disabled styles to menu item but remains focusable
   */
  disabled?: boolean;

  /**
   * Clicking on the menu item will not dismiss an open menu
   */
  persistOnClick?: boolean;
}

export interface MenuItemProps
  extends ComponentProps<Partial<MenuItemSlots>>,
    React.HTMLAttributes<HTMLElement>,
    MenuItemCommons {}

export interface MenuItemState
  extends ComponentState<MenuItemSlots>,
    React.HTMLAttributes<HTMLElement>,
    MenuItemCommons {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
}
