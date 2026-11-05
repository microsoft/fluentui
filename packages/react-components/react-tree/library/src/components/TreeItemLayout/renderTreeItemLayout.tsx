/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TreeItemLayoutBaseState, TreeItemLayoutState, TreeItemLayoutSlots } from './TreeItemLayout.types';
import { ButtonContextProvider } from '@fluentui/react-button';

/**
 * Render the final JSX of TreeItemLayout
 *
 * The button context is only provided when the state carries one, which is not the case for the
 * state produced by `useTreeItemLayoutBase_unstable`.
 */
export const renderTreeItemLayout_unstable = (state: TreeItemLayoutState | TreeItemLayoutBaseState): JSXElement => {
  assertSlots<TreeItemLayoutSlots>(state);

  const actionsAndAside = (
    <>
      {state.actions && <state.actions />}
      {state.aside && <state.aside />}
    </>
  );

  return (
    <state.root>
      {state.expandIcon && <state.expandIcon />}
      {state.selector && <state.selector />}
      {state.iconBefore && <state.iconBefore />}
      <state.main>{state.root.children}</state.main>
      {state.iconAfter && <state.iconAfter />}
      {'buttonContextValue' in state ? (
        <ButtonContextProvider value={state.buttonContextValue}>{actionsAndAside}</ButtonContextProvider>
      ) : (
        actionsAndAside
      )}
    </state.root>
  );
};
