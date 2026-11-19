import * as React from 'react';
import { renderTreeItem_unstable } from '@fluentui/react-tree';
import type { JSXElement } from '@fluentui/react-utilities';

import type { TreeItemContextValues, TreeItemState } from './TreeItem.types';
import { TreeItemDisabledContext } from '../treeDisabledContext';

/**
 * Renders the final JSX of the TreeItem component, given the state and context values.
 */
export const renderTreeItem = (state: TreeItemState, contextValues: TreeItemContextValues): JSXElement =>
  React.createElement(
    TreeItemDisabledContext.Provider,
    { value: contextValues.treeItem.disabled },
    renderTreeItem_unstable(state, contextValues),
  );
