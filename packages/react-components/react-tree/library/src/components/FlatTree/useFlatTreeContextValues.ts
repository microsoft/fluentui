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
    navigationMode,
    appearance,
    size,
    requestTreeResponse,
    forceUpdateRovingTabIndex,
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
    navigationMode,
    contextType,
    level,
    requestTreeResponse,
    forceUpdateRovingTabIndex,
  };

  return { tree };
};
