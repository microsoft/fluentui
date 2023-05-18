import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerBodySlots = {
  root: Slot<'div'>;
};

/**
 * DrawerBody Props
 */
export type DrawerBodyProps = ComponentProps<DrawerBodySlots>;

/**
 * State used in rendering DrawerBody
 */
export type DrawerBodyState = ComponentState<DrawerBodySlots>;
