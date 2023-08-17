import { TreeContextValue } from '../../contexts';
import { TreeContextValues, TreeState } from './Tree.types';

export function useTreeContextValues_unstable(state: TreeState): TreeContextValues {
  const { openItems, checkedItems, selectionMode, level, appearance, size, requestTreeResponse } = state;
  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const tree: TreeContextValue = {
    size,
    level,
    openItems,
    appearance,
    checkedItems,
    selectionMode,
    requestTreeResponse,
  };

  return { tree };
}
