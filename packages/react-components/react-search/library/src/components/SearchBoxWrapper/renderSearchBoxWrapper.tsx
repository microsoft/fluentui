/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { SearchBoxWrapperState } from './SearchBoxWrapper.types';

/**
 * Render the final JSX of TreeItemPersonaLayout
 */
export const renderTreeItemPersonaLayout_unstable = (
  state: SearchBoxWrapperState,
  contextValues: TreeItemPersonaLayoutContextValues,
): JSXElement => {
  assertSlots<TreeItemPersonaLayoutSlots>(state);

  return (
    <state.root>
      <AvatarContextProvider value={contextValues.avatar}>
        <state.media />
      </AvatarContextProvider>
      <state.main />
      {state.description && <state.description />}
      <ButtonContextProvider value={state.buttonContextValue}>
        {state.actions && <state.actions />}
        {state.aside && <state.aside />}
      </ButtonContextProvider>
    </state.root>
  );
};
