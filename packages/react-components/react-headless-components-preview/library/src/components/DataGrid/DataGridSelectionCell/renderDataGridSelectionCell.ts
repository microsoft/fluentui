import type { JSXElement } from '@fluentui/react-utilities';
import { renderDataGridSelectionCell_unstable } from '@fluentui/react-table';
import type { DataGridSelectionCellState } from './DataGridSelectionCell.types';

/**
 * Renders the final JSX of the DataGridSelectionCell component, given the state.
 */
export const renderDataGridSelectionCell = renderDataGridSelectionCell_unstable as (
  state: DataGridSelectionCellState,
) => JSXElement;
