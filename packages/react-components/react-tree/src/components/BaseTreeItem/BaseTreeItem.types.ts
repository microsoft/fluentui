import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type BaseTreeItemSlots = {
  root: Slot<'div'>;
};

/**
 * BaseTreeItem Props
 */
export type BaseTreeItemProps = ComponentProps<BaseTreeItemSlots>;

/**
 * State used in rendering BaseTreeItem
 */
export type BaseTreeItemState = ComponentState<BaseTreeItemSlots> & {
  open: boolean;
  isLeaf: boolean;
};
