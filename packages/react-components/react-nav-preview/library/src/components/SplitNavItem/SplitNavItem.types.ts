import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavItemProps } from '../NavItem/NavItem.types';
import { ButtonProps, MenuButtonProps, ToggleButtonProps } from '@fluentui/react-button';
import { NavSize } from '../Nav/Nav.types';

export type SplitNavItemSlots = {
  /**
   * Root of the component, wrapping the children.
   */
  root: Slot<'div'>;

  /**
   * Primary navigation item in SplitNavItem.
   */
  navItem?: NonNullable<Slot<NavItemProps>>;

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
