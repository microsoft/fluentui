import { DrawerHeaderNavigationSlots, DrawerHeaderNavigationState } from '@fluentui/react-drawer';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type NavDrawerHeaderNavSlots = ComponentProps<DrawerHeaderNavigationSlots>;

/**
 * NavDrawerHeader Props
 */
export type NavDrawerHeaderNavProps = ComponentProps<DrawerHeaderNavigationSlots>;

/**
 * State used in rendering NavDrawerHeader
 */
export type NavDrawerHeaderNavState = ComponentState<Partial<DrawerHeaderNavigationSlots>> &
  DrawerHeaderNavigationState;
