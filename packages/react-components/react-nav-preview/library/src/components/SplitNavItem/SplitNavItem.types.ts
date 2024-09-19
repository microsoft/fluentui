import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavItem } from '../NavItem/NavItem';
import { NavItemProps, NavItemState } from '../NavItem/NavItem.types';
import { NavSize } from '../Nav/Nav.types';
import { Button, MenuButton } from '@fluentui/react-button';

export type SplitNavItemSlots = {
  /**
   * Root of the component, wrapping the children.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Button that opens menu with secondary actions in SplitNavItem.
   */
  menuButton: Slot<typeof MenuButton>;

  /**
   * Primary navigation item in SplitNavItem.
   */
  primaryNavItem?: Slot<typeof NavItem>;

  /**
   * Secondary actions in SplitNavItem.
   */
  secondaryActionButton?: Slot<typeof Button>;
};

/**
 * SplitNavItem Props
 */
export type SplitNavItemProps = ComponentProps<SplitNavItemSlots> & Omit<NavItemProps, 'root' | 'as'>;

/**
 * State used in rendering SplitNavItem
 */
export type SplitNavItemState = ComponentState<SplitNavItemSlots> &
  Omit<NavItemState, 'root' | 'components'> & {
    /**
     * If this navCategoryItem is selected
     */
    selected: boolean;

    /**
     * The size of the NavItem
     *
     * @default 'medium'
     */
    size: NavSize;
  };
