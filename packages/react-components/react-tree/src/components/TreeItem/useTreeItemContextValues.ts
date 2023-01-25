import * as React from 'react';
import type { TreeItemContextValue } from '../../contexts';
import type { TreeItemContextValues, TreeItemState } from './TreeItem.types';
import type { ButtonContextValue } from '@fluentui/react-button';

export function useTreeItemContextValues_unstable(state: TreeItemState): TreeItemContextValues {
  const { isActionsVisible, buttonSize } = state;

  const treeItem = React.useMemo<TreeItemContextValue>(() => ({ isActionsVisible }), [isActionsVisible]);
  const button = React.useMemo<ButtonContextValue>(() => ({ size: buttonSize }), [buttonSize]);

  return { treeItem, button };
}
