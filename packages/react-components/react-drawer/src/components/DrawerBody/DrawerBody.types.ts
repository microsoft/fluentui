import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerBodySlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * DrawerBody Props
 */
export type DrawerBodyProps = ComponentProps<Partial<DrawerBodySlots>>;

/**
 * State used in rendering DrawerBody
 */
export type DrawerBodyState = ComponentState<DrawerBodySlots>;
