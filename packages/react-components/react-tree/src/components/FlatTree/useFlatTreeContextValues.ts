import { TreeContextValue } from '../../contexts/index';
import type { FlatTreeContextValues, FlatTreeState } from './FlatTree.types';

export const useFlatTreeContextValues_unstable = (state: FlatTreeState): FlatTreeContextValues => {
  const {
    openItems,
    level,
    treeType,
    checkedItems,
    selectionMode,
    appearance,
    size,
    requestTreeResponse,
    contextType: type,
  } = state;
  /**
   * This context is created with "@fluentui/react-context-selector",
   * there is no sense to memoize it
   */
  const tree: TreeContextValue = {
    contextType: type,
    level,
    treeType,
    size,
    openItems,
    appearance,
    checkedItems,
    selectionMode,
    requestTreeResponse,
  };

  return { tree };
};
