import { TreeContextValue } from '../../contexts';
import type { TreeContextValues, TreeState } from './Tree.types';

export function useTreeContextValues_unstable(state: TreeState): TreeContextValues {
  const { openItems, level, selection, appearance, size, requestTreeResponse } = state;
  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const tree: TreeContextValue = {
    appearance,
    selection,
    size,
    level,
    openItems,
    requestTreeResponse,
  };

  return { tree };
}
