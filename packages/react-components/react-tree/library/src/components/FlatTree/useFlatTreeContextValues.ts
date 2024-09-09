import type { TreeContextValue } from '../../contexts';
import type { FlatTreeContextValues, FlatTreeState } from './FlatTree.types';

export const useFlatTreeContextValues_unstable = (state: FlatTreeState): FlatTreeContextValues => {
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
};
