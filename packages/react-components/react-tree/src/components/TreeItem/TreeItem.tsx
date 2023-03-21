import * as React from 'react';
import { useTreeItem_unstable } from './useTreeItem';
import { renderTreeItem_unstable } from './renderTreeItem';
import { useTreeItemStyles_unstable } from './useTreeItemStyles';
import type { TreeItemProps } from './TreeItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTreeItemContextValues_unstable } from './useTreeItemContextValues';

/**
 * The `TreeItem` component represents a single item in a tree.
 * It can contain child items in the form of another Tree component or standalone TreeItem.
 * The content and layout of a TreeItem can be defined using the `TreeItemLayout` or `TreeItemPersonaLayout` component,
 * which should be used as a direct child of TreeItem.
 *
 * When a TreeItem has child items, an expand/collapse control is displayed,
 * allowing the user to show or hide the children.
 * This provides a convenient way to navigate hierarchical data, such as a file system or a category tree.
 */
export const TreeItem: ForwardRefComponent<TreeItemProps> = React.forwardRef((props, ref) => {
  const state = useTreeItem_unstable(props, ref);

  useTreeItemStyles_unstable(state);
  const contextValues = useTreeItemContextValues_unstable(state);
  return renderTreeItem_unstable(state, contextValues);
});

TreeItem.displayName = 'TreeItem';
