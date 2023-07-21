import * as React from 'react';
import { useTreeItemLayout_unstable } from './useTreeItemLayout';
import { renderTreeItemLayout_unstable } from './renderTreeItemLayout';
import { useTreeItemLayoutStyles_unstable } from './useTreeItemLayoutStyles.styles';
import type { TreeItemLayoutProps } from './TreeItemLayout.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The `TreeItemLayout` component is used as a child of `TreeItem` to define the content and layout of a tree item.
 * It provides a consistent visual structure for tree items in a `Tree` component.
 * This component should only be used as a direct child of `TreeItem`.
 */
export const TreeItemLayout: ForwardRefComponent<TreeItemLayoutProps> = React.forwardRef((props, ref) => {
  const state = useTreeItemLayout_unstable(props, ref);

  useTreeItemLayoutStyles_unstable(state);
  return renderTreeItemLayout_unstable(state);
});

TreeItemLayout.displayName = 'TreeItemLayout';
