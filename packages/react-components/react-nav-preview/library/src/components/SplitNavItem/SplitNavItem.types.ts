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
  primaryNavItem?: NonNullable<Slot<NavItemProps>>;

  /**
   * Secondary actions in SplitNavItem.
   */
  secondaryActionButton?: Slot<ButtonProps>;

  /**
   * An optional toggle button slot
   */
  secondaryToggleButton?: Slot<ToggleButtonProps>;

  /**
   * Button that opens menu with secondary actions in SplitNavItem.
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
