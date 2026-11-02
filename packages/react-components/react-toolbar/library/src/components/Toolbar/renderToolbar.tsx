/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToolbarBaseState, ToolbarSlots, ToolbarContextValues } from './Toolbar.types';
import { ToolbarContext } from './ToolbarContext';

/**
 * Render the final JSX of Toolbar
 */
export const renderToolbar_unstable = (state: ToolbarBaseState, contextValues: ToolbarContextValues): JSXElement => {
  assertSlots<ToolbarSlots>(state);

  return (
    <ToolbarContext.Provider value={contextValues.toolbar}>
      <state.root>{state.root.children}</state.root>
    </ToolbarContext.Provider>
  );
};
