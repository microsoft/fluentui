import * as React from 'react';
import { useBaseTreeItem_unstable } from './useBaseTreeItem';
import { renderBaseTreeItem_unstable } from './renderBaseTreeItem';
import { useBaseTreeItemStyles_unstable } from './useBaseTreeItemStyles';
import type { BaseTreeItemProps } from './BaseTreeItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * BaseTreeItem component - Represents a single node on the Tree
 */
export const BaseTreeItem: ForwardRefComponent<BaseTreeItemProps> = React.forwardRef((props, ref) => {
  const state = useBaseTreeItem_unstable(props, ref);

  useBaseTreeItemStyles_unstable(state);
  return renderBaseTreeItem_unstable(state);
});

BaseTreeItem.displayName = 'BaseTreeItem';
