import * as React from 'react';
import { TreeContextValue } from '../../contexts';
import { TreeContextValues, TreeState } from './Tree.types';

export function useTreeContextValues_unstable(state: TreeState): TreeContextValues {
  'use no memo';

  if (state.contextType === 'root') {
    const {
      openItems,
      level,
      contextType,
      treeType,
      checkedItems,
      selectionMode,
      appearance,
      size,
      requestTreeResponse,
    } = state;
    /**
     * This context is created with "@fluentui/react-context-selector",
     * there is no sense to memoize it
     */
    const tree: TreeContextValue = {
      treeType,
      size,
      openItems,
      appearance,
      checkedItems,
      selectionMode,
      contextType,
      level,
      requestTreeResponse,
    };

    return { tree };
  }
  return {
    // contextType is statically determined by the context
    // eslint-disable-next-line react-hooks/rules-of-hooks
    tree: React.useMemo(() => ({ level: state.level, contextType: 'subtree' }), [state.level]),
  };
}
