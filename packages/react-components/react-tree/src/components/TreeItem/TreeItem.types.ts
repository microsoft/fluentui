import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TreeItemContextValue } from '../../contexts/treeItemContext';

export type TreeItemSlots = {
  root: Slot<'div'>;
  /**
   * Expand icon slot,
   * by default renders a chevron icon to indicate opening and closing
   */
  expandIcon?: Slot<'span'>;
  /**
   * Actions slot that renders on the end of tree item
   * when the item is hovered/focused
   */
  actions?: Slot<'span'>;
  groupper: NonNullable<Slot<'span'>>;
};

export type TreeItemContextValues = {
  treeItem: TreeItemContextValue;
};

/**
 * TreeItem Props
 */
export type TreeItemProps = ComponentProps<Partial<TreeItemSlots>>;

/**
 * State used in rendering TreeItem
 */
export type TreeItemState = ComponentState<TreeItemSlots> &
  TreeItemContextValue & {
    open: boolean;
    isLeaf: boolean;
  };
