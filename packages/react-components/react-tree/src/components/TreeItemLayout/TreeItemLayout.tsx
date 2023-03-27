import * as React from 'react';
import { useTreeItemLayout_unstable } from './useTreeItemLayout';
import { renderTreeItemLayout_unstable } from './renderTreeItemLayout';
import { useTreeItemLayoutStyles_unstable } from './useTreeItemLayoutStyles';
import type { TreeItemLayoutProps } from './TreeItemLayout.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TreeItemLayout component - TODO: add more docs
 */
export const TreeItemLayout: ForwardRefComponent<TreeItemLayoutProps> = React.forwardRef((props, ref) => {
  const state = useTreeItemLayout_unstable(props, ref);

  useTreeItemLayoutStyles_unstable(state);
  return renderTreeItemLayout_unstable(state);
});

TreeItemLayout.displayName = 'TreeItemLayout';
