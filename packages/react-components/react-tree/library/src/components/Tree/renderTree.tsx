/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TreeContextValues, TreeSlots, TreeState } from '../Tree/Tree.types';
import { TreeProvider } from '../TreeProvider';

export const renderTree_unstable = (state: TreeState, contextValues: TreeContextValues): JSXElement => {
  assertSlots<TreeSlots>(state);
  return (
    <TreeProvider value={contextValues.tree}>
      {state.collapseMotion ? (
        <state.collapseMotion>
          <state.root />
        </state.collapseMotion>
      ) : (
        <state.root />
      )}
    </TreeProvider>
  );
};
