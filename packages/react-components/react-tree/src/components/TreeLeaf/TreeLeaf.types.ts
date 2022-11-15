import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TreeLeafSlots = {
  root: Slot<'div'>;
};

export type TreeLeafProps = ComponentProps<TreeLeafSlots> & {};

export type TreeLeafState = ComponentState<TreeLeafSlots>;
