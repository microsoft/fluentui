/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { TreeContextValues, TreeSlots, TreeState } from '../Tree/Tree.types';
import { TreeProvider } from '../TreeProvider';
import { Collapse } from '@fluentui/react-motions-preview';

export const renderTree_unstable = (state: TreeState, contextValues: TreeContextValues) => {
  assertSlots<TreeSlots>(state);

  return (
    <TreeProvider value={contextValues.tree}>
      {/* Wrap child content in a Collapse transition which manages show/hide */}
      <Collapse visible={state.open}>
        <state.root>{state.root.children}</state.root>
      </Collapse>
    </TreeProvider>
  );
};
