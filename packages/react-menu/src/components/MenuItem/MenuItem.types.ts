import * as React from 'react';
import { ComponentPropsCompat, ShorthandPropsCompat, ObjectShorthandPropsCompat } from '@fluentui/react-utilities';

export interface MenuItemProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * A helper slot for alignment when a menu item is used with selectable menuitems
   * Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components
   */
  checkmark?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Icon slot that shows the indicator for a submenu
   */
  submenuIndicator?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible
   */
  content?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Secondary content rendered opposite the primary content (e.g Shortcut text)
   */
  secondaryContent?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

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
  icon?: ObjectShorthandPropsCompat<React.HTMLAttributes<HTMLSpanElement>>;

  /**
   * A helper slot for alignment when a menu item is used with selectable menuitems
   * Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components
   */
  checkmark: ObjectShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Icon slot that shows the indicator for a submenu
   */
  submenuIndicator?: ObjectShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Slot for the component children, avoid in favour of children and classnames for customization
   */
  content: ObjectShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Secondary content rendered opposite the primary content (e.g Shortcut text)
   */
  secondaryContent: ObjectShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
}
