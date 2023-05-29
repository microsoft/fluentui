/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { TreeState, TreeSlots, TreeContextValues } from './Tree.types';
import { TreeProvider } from '../../contexts';

export const renderTree_unstable = (state: TreeState, contextValues: TreeContextValues) => {
  assertSlots<TreeSlots>(state);
  return (
    <TreeProvider value={contextValues.tree}>
      {state.open && <state.root>{state.root.children}</state.root>}
    </TreeProvider>
  );
};
