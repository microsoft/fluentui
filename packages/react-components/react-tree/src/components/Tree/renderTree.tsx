/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TreeState, TreeSlots, TreeContextValues } from './Tree.types';
import { TreeProvider } from '../../contexts';

export const renderTree_unstable = (state: TreeState, contextValues: TreeContextValues) => {
  const { slots, slotProps } = getSlotsNext<TreeSlots>(state);
  return (
    <TreeProvider value={contextValues.tree}>
      {state.open && <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root>}
    </TreeProvider>
  );
};
