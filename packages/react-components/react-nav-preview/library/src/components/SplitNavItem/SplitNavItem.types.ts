import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavItem } from '../NavItem/NavItem';
import { NavItemProps, NavItemState } from '../NavItem/NavItem.types';

export type SplitNavItemSlots = {
  root: NonNullable<Slot<'div'>>;

  navItem?: Slot<typeof NavItem>;

  actionItems?: Slot<'div'>;
};

/**
 * SplitNavItem Props
 */
export type SplitNavItemProps = ComponentProps<SplitNavItemSlots> & Omit<NavItemProps, 'root' | 'as'>;

/**
 * State used in rendering SplitNavItem
 */
export type SplitNavItemState = ComponentState<SplitNavItemSlots> & Omit<NavItemState, 'components' | 'root'>;
