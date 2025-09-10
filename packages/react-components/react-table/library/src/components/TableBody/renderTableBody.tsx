/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TableBodyState, TableBodySlots } from './TableBody.types';

/**
 * Render the final JSX of TableBody
 */
export const renderTableBody_unstable = (state: TableBodyState): JSXElement => {
  assertSlots<TableBodySlots>(state);

  return <state.root />;
};
