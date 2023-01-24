import { TreeContextValue } from '../../contexts';
import type { TreeContextValues, TreeState } from './Tree.types';

export function useTreeContextValues_unstable(state: TreeState): TreeContextValues {
  const { openItems, level, appearance, size, requestOpenChange, focusFirstSubtreeItem, focusSubtreeOwnerItem } = state;
  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const tree: TreeContextValue = {
    appearance,
    size,
    level,
    openItems,
    requestOpenChange,
    focusFirstSubtreeItem,
    focusSubtreeOwnerItem,
  };

  return { tree };
}
