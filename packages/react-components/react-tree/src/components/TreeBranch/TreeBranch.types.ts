import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TreeBranchSlots = {
  root: Slot<'div'>;
};

export type TreeBranchProps = ComponentProps<TreeBranchSlots> & {};

/**
 * State used in rendering TreeBranch
 */
export type TreeBranchState = ComponentState<TreeBranchSlots>;
