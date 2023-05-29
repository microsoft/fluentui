/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import { ButtonContextProvider } from '@fluentui/react-button';
import type { TreeItemAsideState, TreeItemAsideSlots } from './TreeItemAside.types';

/**
 * Render the final JSX of TreeItemAside
 */
export const renderTreeItemAside_unstable = (state: TreeItemAsideState) => {
  assertSlots<TreeItemAsideSlots>(state);

  if (!state.visible) {
    return null;
  }

  return (
    <state.root>
      <ButtonContextProvider value={state.buttonContextValue}>{state.root.children}</ButtonContextProvider>
    </state.root>
  );
};
