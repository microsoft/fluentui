'use client';

import * as React from 'react';
import type { TreeContextValue } from '../../contexts';
import type { TreeBaseState, TreeContextValues, TreeState } from './Tree.types';

export function useTreeContextValues_unstable(state: TreeState | TreeBaseState): TreeContextValues {
  if (state.contextType === 'root') {
    const {
      openItems,
      level,
      contextType,
      treeType,
      checkedItems,
      selectionMode,
      navigationMode,
      requestTreeResponse,
      forceUpdateRovingTabIndex,
    } = state;
    // Base state carries no design props, the context falls back to the default design values.
    const appearance = 'appearance' in state ? state.appearance : 'subtle';
    const size = 'size' in state ? state.size : 'medium';
    // contextType is statically determined by the context
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const tree = React.useMemo<TreeContextValue>(
      () => ({
        treeType,
        size,
        openItems,
        appearance,
        checkedItems,
        selectionMode,
        navigationMode,
        contextType,
        level,
        requestTreeResponse,
        forceUpdateRovingTabIndex,
      }),
      [
        treeType,
        size,
        openItems,
        appearance,
        checkedItems,
        selectionMode,
        navigationMode,
        contextType,
        level,
        requestTreeResponse,
        forceUpdateRovingTabIndex,
      ],
    );

    return { tree };
  }
  return {
    // contextType is statically determined by the context
    // eslint-disable-next-line react-hooks/rules-of-hooks
    tree: React.useMemo(() => ({ level: state.level, contextType: 'subtree' }), [state.level]),
  };
}
