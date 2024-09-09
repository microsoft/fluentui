import * as React from 'react';
import type { ArrowLeft, ArrowRight, Enter } from '@fluentui/keyboard-keys';
import type { ComponentProps, ComponentState, ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import type { TreeItemContextValue } from '../../contexts';
import type { treeItemLevelToken } from '../../utils/tokens';

export type TreeItemCSSProperties = React.CSSProperties & { [treeItemLevelToken]?: string | number };

export type TreeItemType = 'leaf' | 'branch';

export type TreeItemSlots = {
  root: Slot<ExtractSlotProps<Slot<'div'> & { style?: TreeItemCSSProperties }>>;
};

export type TreeItemValue = string | number;

export type TreeItemContextValues = {
  treeItem: TreeItemContextValue;
};

export type TreeItemOpenChangeData = {
  open: boolean;
  value: TreeItemValue;
  target: HTMLElement;
} & (
  | { event: React.MouseEvent<HTMLElement>; type: 'ExpandIconClick' }
  | { event: React.MouseEvent<HTMLElement>; type: 'Click' }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof Enter }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof ArrowRight }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof ArrowLeft }
);

export type TreeItemOpenChangeEvent = TreeItemOpenChangeData['event'];

/**
 * TreeItem Props
 */
export type TreeItemProps = ComponentProps<Partial<TreeItemSlots>> & {
  /**
   * A tree item can be a leaf or a branch
   */
  itemType: TreeItemType;
  /**
   * A tree item should have a well defined value, in case one is not provided by the user by this prop
   * one will be inferred internally.
   */
  value?: TreeItemValue;
  /**
   * Whether the tree item is in an open state
   *
   * This overrides the open value provided by the root tree,
   * and ensure control of the visibility of the tree item per tree item.
   *
   * NOTE: controlling the open state of a tree item will not affect the open state of its children
   */
  open?: boolean;
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onOpenChange?: (e: TreeItemOpenChangeEvent, data: TreeItemOpenChangeData) => void;
  /**
   * This property is inferred through context on a nested tree, and required for a flat tree.
   */
  parentValue?: TreeItemValue;
};

/**
 * State used in rendering TreeItem
 */
export type TreeItemState = ComponentState<TreeItemSlots> &
  TreeItemContextValue & {
    level: number;
    itemType: TreeItemType;
  };
