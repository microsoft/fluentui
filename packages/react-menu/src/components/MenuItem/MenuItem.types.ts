import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type MenuItemSlots = {
  root: IntrinsicSlotProps<'div'>;

  /**
   * Icon slot rendered before children content
   */
  icon?: IntrinsicSlotProps<'span'>;

  /**
   * A helper slot for alignment when a menu item is used with selectable menuitems
   * Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components
   */
  checkmark?: IntrinsicSlotProps<'span'>;

  /**
   * Icon slot that shows the indicator for a submenu
   */
  submenuIndicator?: IntrinsicSlotProps<'span'>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible
   */
  content?: IntrinsicSlotProps<'span'>;

  /**
   * Secondary content rendered opposite the primary content (e.g Shortcut text)
   */
  secondaryContent?: IntrinsicSlotProps<'span'>;
};

type MenuItemCommons = {
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
};

export type MenuItemProps = ComponentProps<Partial<MenuItemSlots>> & MenuItemCommons;

export type MenuItemState = ComponentState<MenuItemSlots> & MenuItemCommons;
