import * as React from 'react';
import type { ComponentProps, ComponentState, ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import type { TreeItemContextValue } from '../../contexts';
import { treeItemLevelToken } from '../../utils/tokens';
import { CheckboxProps } from '@fluentui/react-checkbox';

export type TreeItemCSSProperties = React.CSSProperties & { [treeItemLevelToken]?: string | number };

export type TreeItemType = 'leaf' | 'branch';

export type TreeItemSlots = {
  root: Slot<ExtractSlotProps<Slot<'div'> & { style?: TreeItemCSSProperties }>>;
};

export type TreeItemValue = string | number;

export type TreeItemContextValues = { treeItem: TreeItemContextValue };

/**
 * TreeItem Props
 */
export type TreeItemProps = ComponentProps<Partial<TreeItemSlots>> & {
  itemType: TreeItemType;
  value?: TreeItemValue;
  /**
   * @default false
   */
  checked?: CheckboxProps['checked'];
  /**
   * @default false
   */
  defaultChecked?: CheckboxProps['defaultChecked'];
};

/**
 * State used in rendering TreeItem
 */
export type TreeItemState = ComponentState<TreeItemSlots> &
  TreeItemContextValue & {
    level: number;
    itemType: TreeItemType;
    checked?: CheckboxProps['checked'];
    defaultChecked?: CheckboxProps['defaultChecked'];
  };
