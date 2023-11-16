/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { ToolbarGroupState, ToolbarGroupSlots } from './ToolbarGroup.types';

/**
 * Render the final JSX of ToolbarGroup
 */
export const renderToolbarGroup_unstable = (state: ToolbarGroupState) => {
  assertSlots<ToolbarGroupSlots>(state);

  return <state.root>{state.root.children}</state.root>;
};
