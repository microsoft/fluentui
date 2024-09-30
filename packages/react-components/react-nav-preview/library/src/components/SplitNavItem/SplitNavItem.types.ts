import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavItemProps } from '../NavItem/NavItem.types';
import { ButtonProps, MenuButtonProps, ToggleButtonProps } from '@fluentui/react-button';
import { NavSize } from '../Nav/Nav.types';
import { NavSubItemProps } from '../NavSubItem/NavSubItem.types';

export type SplitNavItemSlots = {
  /**
   * Root of the component, wrapping the children.
   */
  root: Slot<'div'>;

  /**
   * Primary navigation item in SplitNavItem.
   * Should be used mutually exclusive with NavSubItem.
   */
  navItem?: Slot<NavItemProps>;

  /**
   * Navigation sub item in SplitNavItem.
   * A child (visually, but not in the DOM) of the navItem.
   * Should be used mutually exclusive with NavItem.
   */
  navSubItem?: Slot<NavSubItemProps>;

  /**
   * Basic button slot.
   */
  actionButton?: Slot<ButtonProps>;

  /**
   * Toggle button slot
   */
  toggleButton?: Slot<ToggleButtonProps>;

  /**
   * Menu button slot to stuff more things in when the other two aren't enough.
   */
  menuButton?: Slot<MenuButtonProps>;
};

/**
 * SplitNavItem Props
 */
export type SplitNavItemProps = ComponentProps<SplitNavItemSlots>;

/**
 * State used in rendering SplitNavItem
 */
export type SplitNavItemState = ComponentState<SplitNavItemSlots> & {
  /**
   * The size of the NavItem
   *
   * @default 'medium'
   */
  size: NavSize;
};
