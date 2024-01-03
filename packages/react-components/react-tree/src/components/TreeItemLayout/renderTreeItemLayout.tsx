/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { TreeItemLayoutState, TreeItemLayoutSlots } from './TreeItemLayout.types';
import { ButtonContextProvider } from '@fluentui/react-button';

/**
 * Render the final JSX of TreeItemLayout
 */
export const renderTreeItemLayout_unstable = (state: TreeItemLayoutState) => {
  assertSlots<TreeItemLayoutSlots>(state);

  return (
    <state.root>
      {state.expandIcon && <state.expandIcon />}
      {state.selector && <state.selector />}
      {state.iconBefore && <state.iconBefore />}
      <state.main>{state.root.children}</state.main>
      {state.iconAfter && <state.iconAfter />}
      <ButtonContextProvider value={state.buttonContextValue}>
        {state.actions && <state.actions />}
        {state.aside && <state.aside />}
      </ButtonContextProvider>
    </state.root>
  );
};
