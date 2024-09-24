import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavItemProps } from '../NavItem/NavItem.types';
import { NavSize } from '../Nav/Nav.types';
import { Button, MenuButton } from '@fluentui/react-button';

export type SplitNavItemSlots = {
  /**
   * Root of the component, wrapping the children.
   */
  root: Slot<'div'>;

  // /**
  //  * Primary navigation item in SplitNavItem.
  //  */
  // primaryNavItem?: NonNullable<Slot<NavItemProps>>;

  /**
   * Secondary actions in SplitNavItem.
   */
  secondaryActionButton?: Slot<typeof Button>;

  // /**
  //  * Button that opens menu with secondary actions in SplitNavItem.
  //  */
  // menuButton?: Slot<typeof MenuButton>;
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
