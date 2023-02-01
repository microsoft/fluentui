import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonContextValue } from '@fluentui/react-button';
import type { TreeItemContextValue } from '../../contexts';

export type TreeItemSlots = {
  root: Slot<'div'>;
  content: NonNullable<Slot<'span'>>;
  subtree?: Slot<'span'>;
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
};

export type TreeItemContextValues = {
  treeItem: TreeItemContextValue;
  button: ButtonContextValue;
};

/**
 * TreeItem Props
 */
export type TreeItemProps = ComponentProps<Partial<TreeItemSlots>>;

/**
 * State used in rendering TreeItem
 */
export type TreeItemState = ComponentState<TreeItemSlots> & {
  open: boolean;
  isLeaf: boolean;
  /**
   * By design, a button included on the actions slot should be small
   */
  buttonSize: 'small';
  isActionsVisible: boolean;
};
