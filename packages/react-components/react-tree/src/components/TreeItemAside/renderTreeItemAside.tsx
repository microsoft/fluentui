/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { ButtonContextProvider } from '@fluentui/react-button';
import type { TreeItemAsideState, TreeItemAsideSlots } from './TreeItemAside.types';

/**
 * Render the final JSX of TreeItemAside
 */
export const renderTreeItemAside_unstable = (state: TreeItemAsideState) => {
  const { slots, slotProps } = getSlotsNext<TreeItemAsideSlots>(state);

  if (!state.visible) {
    return null;
  }

  return (
    <slots.root {...slotProps.root}>
      <ButtonContextProvider value={state.buttonContextValue}>{slotProps.root.children}</ButtonContextProvider>
    </slots.root>
  );
};
