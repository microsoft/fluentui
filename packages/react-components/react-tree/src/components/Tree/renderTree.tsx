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
      {/* original show/hide without transition */}
      {/* {state.open && <state.root>{state.root.children}</state.root>} */}

      {/* Wrap child content in a Collapse transition which manages show/hide */}
      <Collapse visible={state.open}>
        {/* TODO: fix re-render bug when using override */}
        {/* <Collapse visible={state.open} override={{ all: { duration: 2000 } }}> */}
        <state.root>{state.root.children}</state.root>
      </Collapse>
    </TreeProvider>
  );
};
