import type { JSXElement } from '@fluentui/react-utilities';
import { renderTableSelectionCell_unstable } from '@fluentui/react-table';
import type { TableSelectionCellState } from './TableSelectionCell.types';

/**
 * Renders the final JSX of the TableSelectionCell component, given the state.
 */
export const renderTableSelectionCell = renderTableSelectionCell_unstable as (
  state: TableSelectionCellState,
) => JSXElement;
