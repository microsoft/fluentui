/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TableSwatchState, TableSwatchSlots } from './TableSwatch.types';

/**
 * Render the final JSX of TableSwatch
 */
export const renderTableSwatch_unstable = (state: TableSwatchState) => {
  assertSlots<TableSwatchSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root>{state.button && <state.button />}</state.root>;
};
