/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TreeBaseState, TreeContextValues, TreeSlots, TreeState } from '../Tree/Tree.types';
import { TreeProvider } from '../TreeProvider';

/**
 * Render the final JSX of Tree.
 *
 * Without a collapse motion, as produced by `useTreeBase_unstable`, a closed subtree is not rendered.
 */
export const renderTree_unstable = (state: TreeState | TreeBaseState, contextValues: TreeContextValues): JSXElement => {
  assertSlots<TreeSlots>(state);
  return (
    <TreeProvider value={contextValues.tree}>
      {state.collapseMotion ? (
        <state.collapseMotion>
          <state.root />
        </state.collapseMotion>
      ) : state.open ? (
        <state.root />
      ) : null}
    </TreeProvider>
  );
};
