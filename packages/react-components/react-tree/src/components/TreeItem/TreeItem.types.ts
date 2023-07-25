import type { ComponentProps, ComponentState, ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import type { TreeItemContextValue } from '../../contexts';
import { treeItemLevelToken } from '../../utils/tokens';
import * as React from 'react';
import { TreeItemSlotsContextValue } from '../../contexts/treeItemSlotsContext';

export type TreeItemCSSProperties = React.CSSProperties & { [treeItemLevelToken]?: string | number };

export type TreeItemType = 'leaf' | 'branch';

export type TreeItemSlots = {
  root: Slot<ExtractSlotProps<Slot<'div'> & { style?: TreeItemCSSProperties }>>;
  /**
   * Expand icon slot,
   * by default renders a chevron icon to indicate opening and closing
   */
  expandIcon?: Slot<'div'>;
  aside?: Slot<'div'>;
  /**
   * actionable elements are normally buttons, menus, or other focusable elements.
   * Those elements are only visibly available if the given tree item is currently active.
   */
  actions?: Slot<
    ExtractSlotProps<
      Slot<'div'> & {
        /**
         * Forces visibility of the aside/action content
         */
        visible?: boolean;
      }
    >
  >;
};

export type TreeItemInternalSlot = Pick<TreeItemSlots, 'root'>;

export type TreeItemValue = string | number;

export type TreeItemContextValues = {
  treeItem: TreeItemContextValue;
  treeItemSlots: TreeItemSlotsContextValue;
};

/**
 * TreeItem Props
 */
export type TreeItemProps = ComponentProps<Partial<TreeItemSlots>> & {
  itemType: TreeItemType;
  value?: TreeItemValue;
};

/**
 * State used in rendering TreeItem
 */
export type TreeItemState = ComponentState<TreeItemInternalSlot> &
  TreeItemContextValue &
  TreeItemSlotsContextValue & {
    level: number;
    itemType: TreeItemType;
  };
