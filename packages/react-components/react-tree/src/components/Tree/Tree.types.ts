import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TreeSlots = {
  root: Slot<'div'>;
};

export type TreeProps = ComponentProps<TreeSlots> & {};

/**
 * State used in rendering Tree
 */
export type TreeState = ComponentState<TreeSlots>;
