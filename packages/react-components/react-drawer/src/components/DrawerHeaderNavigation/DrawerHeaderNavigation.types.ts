import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerHeaderNavigationSlots = {
  root: Slot<'div'>;
};

/**
 * DrawerHeaderNavigation Props
 */
export type DrawerHeaderNavigationProps = ComponentProps<DrawerHeaderNavigationSlots> & {};

/**
 * State used in rendering DrawerHeaderNavigation
 */
export type DrawerHeaderNavigationState = ComponentState<DrawerHeaderNavigationSlots>;
