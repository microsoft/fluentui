/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type { FlatTreeContextValues, FlatTreeSlots, FlatTreeState } from './FlatTree.types';
import { TreeProvider } from '../../contexts/index';
import { assertSlots } from '@fluentui/react-utilities';

export const renderFlatTree_unstable = (state: FlatTreeState, contextValues: FlatTreeContextValues) => {
  assertSlots<FlatTreeSlots>(state);
  return (
    <TreeProvider value={contextValues.tree}>
      {state.open && <state.root>{state.root.children}</state.root>}
    </TreeProvider>
  );
};
