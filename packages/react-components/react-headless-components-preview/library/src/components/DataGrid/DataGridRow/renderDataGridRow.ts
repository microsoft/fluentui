import type { JSXElement } from '@fluentui/react-utilities';
import { renderDataGridRow_unstable } from '@fluentui/react-table';
import type { DataGridRowState } from './DataGridRow.types';

/**
 * Renders the final JSX of the DataGridRow component, given the state.
 */
export const renderDataGridRow = renderDataGridRow_unstable as (state: DataGridRowState) => JSXElement;
