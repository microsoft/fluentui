import * as React from 'react';
import { renderTree_unstable } from '@fluentui/react-tree';
import type { JSXElement } from '@fluentui/react-utilities';

import type { TreeContextValues, TreeState } from './Tree.types';
import { SubtreeDisabledContext, TreeDisabledContext, TreeItemDisabledContext } from './treeDisabledContext';

/**
 * Renders the final JSX of the Tree component, given the state and context values.
 *
 * A closed subtree is not rendered.
 */
export const renderTree = (state: TreeState, contextValues: TreeContextValues): JSXElement => {
  const tree = React.createElement(
    SubtreeDisabledContext.Provider,
    { value: contextValues.tree.disabled },
    React.createElement(
      TreeItemDisabledContext.Provider,
      { value: contextValues.tree.disabled },
      renderTree_unstable(state, contextValues),
    ),
  );
  return state.contextType === 'subtree'
    ? tree
    : React.createElement(TreeDisabledContext.Provider, { value: contextValues.tree.disabled }, tree);
};
