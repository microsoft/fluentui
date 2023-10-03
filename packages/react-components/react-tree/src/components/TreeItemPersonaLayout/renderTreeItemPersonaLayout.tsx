/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type {
  TreeItemPersonaLayoutState,
  TreeItemPersonaLayoutContextValues,
  TreeItemPersonaLayoutSlots,
} from './TreeItemPersonaLayout.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';
import { ButtonContextProvider } from '@fluentui/react-button';

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
      {state.selector && <state.selector />}
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
