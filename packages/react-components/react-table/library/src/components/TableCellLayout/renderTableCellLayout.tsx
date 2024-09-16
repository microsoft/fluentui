/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { AvatarContextProvider } from '@fluentui/react-avatar';
import type { TableCellLayoutState, TableCellLayoutSlots, TableCellLayoutContextValues } from './TableCellLayout.types';

/**
 * Render the final JSX of TableCellLayout
 */
export const renderTableCellLayout_unstable = (
  state: TableCellLayoutState,
  contextValues: TableCellLayoutContextValues,
) => {
  assertSlots<TableCellLayoutSlots>(state);

  return (
    <state.root>
      {state.media && (
        <AvatarContextProvider value={contextValues.avatar}>
          <state.media />
        </AvatarContextProvider>
      )}

      {state.content && (
        <state.content>
          {state.main && <state.main>{state.root.children}</state.main>}
          {state.description && <state.description />}
        </state.content>
      )}
    </state.root>
  );
};
