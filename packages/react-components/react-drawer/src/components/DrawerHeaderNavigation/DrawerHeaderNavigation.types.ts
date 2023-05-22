import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerHeaderNavigationSlots = {
  root: NonNullable<Slot<'nav'>>;
};

/**
 * DrawerHeaderNavigation Props
 */
export type DrawerHeaderNavigationProps = ComponentProps<Partial<DrawerHeaderNavigationSlots>>;

/**
 * State used in rendering DrawerHeaderNavigation
 */
export type DrawerHeaderNavigationState = ComponentState<DrawerHeaderNavigationSlots>;
