import * as React from 'react';
import type { TreeContextValue } from '../../contexts';
import type { TreeContextValues, TreeState } from './Tree.types';

export function useTreeContextValues_unstable(state: TreeState): TreeContextValues {
  const { openTrees, requestOpenChange, level, treeRef, subtreeRef } = state;

  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const tree: TreeContextValue = React.useMemo(
    () => ({
      openTrees,
      requestOpenChange,
      level,
      treeRef,
      subtreeRef,
      isSubtree: true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openTrees, requestOpenChange, level],
  );

  return { tree };
}
