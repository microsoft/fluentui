/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type {
  TreeItemPersonaLayoutState,
  TreeItemPersonaLayoutSlots,
  TreeItemPersonaLayoutContextValues,
} from './TreeItemPersonaLayout.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of TreeItemPersonaLayout
 */
export const renderTreeItemPersonaLayout_unstable = (
  state: TreeItemPersonaLayoutState,
  contextValues: TreeItemPersonaLayoutContextValues,
) => {
  assertSlots<TreeItemPersonaLayoutSlots>(state);

  return (
    <state.root>
      {state.expandIcon && <state.expandIcon />}
      <AvatarContextProvider value={contextValues.avatar}>
        <state.media />
      </AvatarContextProvider>
      <state.content>
        <state.main />
        {state.description && <state.description />}
      </state.content>
    </state.root>
  );
};
