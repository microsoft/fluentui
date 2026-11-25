'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TreeItemProps } from './TreeItem.types';
import { useTreeItem, useTreeItemContextValues } from './useTreeItem';
import { renderTreeItem } from './renderTreeItem';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Represents a single `treeitem` within a `Tree`.
 *
 * Must be rendered inside a `Tree`. A `branch` item renders its subtree as a nested `Tree`, and its
 * content is usually rendered with a `TreeItemLayout`.
 */
export const TreeItem: ForwardRefComponent<TreeItemProps> = /*#__PURE__*/ composeComponent(
  'TreeItem',
  useTreeItem,
  useTreeItemContextValues,
  renderTreeItem,
);
