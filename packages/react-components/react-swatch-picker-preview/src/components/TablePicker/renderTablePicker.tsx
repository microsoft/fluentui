/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TablePickerState, TablePickerSlots } from './TablePicker.types';

/**
 * Render the final JSX of TablePicker
 */
export const renderTablePicker_unstable = (state: TablePickerState) => {
  assertSlots<TablePickerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <state.root>
      <state.tbody>{state.root.children}</state.tbody>
    </state.root>
  );
};
