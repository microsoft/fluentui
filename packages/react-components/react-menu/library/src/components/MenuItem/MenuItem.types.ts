import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MenuItemSlots = {
  root: Slot<'div'>;

  /**
   * Icon slot rendered before children content
   */
  icon?: Slot<'span'>;

  /**
   * A helper slot for alignment when a menu item is used with selectable menuitems
   * Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components
   */
  checkmark?: Slot<'span'>;

  /**
   * Icon slot that shows the indicator for a submenu
   */
  submenuIndicator?: Slot<'span'>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible
   */
  content?: Slot<'span'>;

  /**
   * Secondary content rendered opposite the primary content (e.g Shortcut text)
   */
  secondaryContent?: Slot<'span'>;
};

export type MenuItemProps = Omit<ComponentProps<Partial<MenuItemSlots>>, 'content'> &
  Pick<Partial<MenuItemSlots>, 'content'> & {
    /**
     * If the menu item is a trigger for a submenu
     *
     * @default false
     */
    hasSubmenu?: boolean;

    /**
     * Clicking on the menu item will not dismiss an open menu
     *
     * @default false
     */
    persistOnClick?: boolean;

    disabled?: boolean;
    /**
     * @deprecated this property does nothing.
     * disabled focusable is by default by simply using `disabled` property
     */
    disabledFocusable?: boolean;
  };

export type MenuItemState = ComponentState<MenuItemSlots> &
  Required<Pick<MenuItemProps, 'disabled' | 'hasSubmenu' | 'persistOnClick'>>;
