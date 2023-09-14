import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerHeaderSlots = {
  /**
   * The root of the DrawerHeader.
   */
  root: Slot<'header'>;
};

/**
 * DrawerHeader Props
 */
export type DrawerHeaderProps = ComponentProps<DrawerHeaderSlots>;

/**
 * State used in rendering DrawerHeader
 */
export type DrawerHeaderState = ComponentState<DrawerHeaderSlots>;
