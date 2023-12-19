/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { TreeContextValues, TreeSlots, TreeState } from '../Tree/Tree.types';
import { TreeProvider } from '../TreeProvider';
// import { Collapse } from '../../Collapse-WAAPI';
import { createPresence } from '@fluentui/react-motions-preview';

const Collapse = createPresence(element => {
  const duration = 500;

  return {
    enter: {
      duration,
      keyframes: [
        { opacity: 0, maxHeight: 0, overflow: 'hidden' },
        { opacity: 1, maxHeight: `${element.scrollHeight}px`, offset: 0.99 },
        { opacity: 1, maxHeight: 'unset', overflow: 'hidden' },
      ],
    },
    exit: {
      duration,
      keyframes: [
        { opacity: 1, maxHeight: `${element.scrollHeight}px`, overflow: 'hidden' },
        { opacity: 0, maxHeight: 0, overflow: 'hidden' },
      ],
    },
  };
});

export const renderTree_unstable = (state: TreeState, contextValues: TreeContextValues) => {
  assertSlots<TreeSlots>(state);

  return (
    <TreeProvider value={contextValues.tree}>
      {/* original show/hide without transition */}
      {/* {state.open && <state.root>{state.root.children}</state.root>} */}

      {/* Wrap child content in a Collapse transition which manages show/hide */}
      <Collapse visible={state.open}>
        <state.root>{state.root.children}</state.root>
      </Collapse>
    </TreeProvider>
  );
};
