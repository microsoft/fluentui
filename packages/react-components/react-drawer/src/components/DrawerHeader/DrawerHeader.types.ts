import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerHeaderSlots = {
  root: Slot<'header'>;
};

/**
 * DrawerHeader Props
 */
export type DrawerHeaderProps = ComponentProps<DrawerHeaderSlots> & {};

/**
 * State used in rendering DrawerHeader
 */
export type DrawerHeaderState = ComponentState<DrawerHeaderSlots>;
