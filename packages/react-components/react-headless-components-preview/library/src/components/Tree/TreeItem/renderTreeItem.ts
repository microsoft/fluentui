import { renderTreeItem_unstable } from '@fluentui/react-tree';
import type { JSXElement } from '@fluentui/react-utilities';

import type { TreeItemContextValues, TreeItemState } from './TreeItem.types';

/**
 * Renders the final JSX of the TreeItem component, given the state and context values.
 */
export const renderTreeItem: (state: TreeItemState, contextValues: TreeItemContextValues) => JSXElement =
  renderTreeItem_unstable;
