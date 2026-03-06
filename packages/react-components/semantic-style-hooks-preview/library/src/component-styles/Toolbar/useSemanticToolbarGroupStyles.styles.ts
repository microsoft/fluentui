import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import { toolbarGroupClassNames, type ToolbarGroupState } from '@fluentui/react-toolbar';

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useSemanticToolbarGroupStyles = (_state: unknown): ToolbarGroupState => {
  'use no memo';

  const state = _state as ToolbarGroupState;

  state.root.className = mergeClasses(
    state.root.className,
    toolbarGroupClassNames.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
