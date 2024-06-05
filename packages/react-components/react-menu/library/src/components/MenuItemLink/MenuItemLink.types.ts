import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { MenuItemProps, MenuItemSlots } from '../MenuItem/MenuItem.types';

export type MenuItemLinkSlots = {
  root: Slot<'a'>;
} & Pick<MenuItemSlots, 'icon' | 'content' | 'secondaryContent' | 'checkmark'>;

/**
 * MenuItemLink Props
 */
export type MenuItemLinkProps = ComponentProps<MenuItemLinkSlots> & Pick<MenuItemProps, 'disabled'> & { href: string };

/**
 * State used in rendering MenuItemLink
 */
export type MenuItemLinkState = ComponentState<MenuItemLinkSlots>;
