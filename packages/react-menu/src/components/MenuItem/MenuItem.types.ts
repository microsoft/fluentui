import * as React from 'react';
import { ComponentProps, ShorthandProps, ObjectShorthandProps } from '@fluentui/react-utilities';

export interface MenuItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * A helper slot for alignment when a menu item is used with selectable menuitems
   * Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components
   */
  checkmark?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Icon slot that shows the indicator for a submenu
   */
  submenuIndicator?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible
   */
  content?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Secondary content rendered opposite the primary content (e.g Shortcut text)
   */
  secondaryContent?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

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

export interface MenuItemState extends MenuItemProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Icon slot when processed by internal state
   */
  icon?: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;

  /**
   * A helper slot for alignment when a menu item is used with selectable menuitems
   * Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components
   */
  checkmark: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Icon slot that shows the indicator for a submenu
   */
  submenuIndicator?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Slot for the component children, avoid in favour of children and classnames for customization
   */
  content: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Secondary content rendered opposite the primary content (e.g Shortcut text)
   */
  secondaryContent: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
}
