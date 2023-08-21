/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import { TreeProvider } from '../../contexts';
import type { TreeContextValues, TreeSlots, TreeState } from '../Tree/Tree.types';

export const renderTree_unstable = (state: TreeState, contextValues: TreeContextValues) => {
  assertSlots<TreeSlots>(state);
  return (
    <TreeProvider value={contextValues.tree}>
      {state.open && <state.root>{state.root.children}</state.root>}
    </TreeProvider>
  );
};
