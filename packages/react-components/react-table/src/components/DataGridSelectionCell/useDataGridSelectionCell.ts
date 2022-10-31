import * as React from 'react';
import { useTableSelectionCell_unstable } from '../TableSelectionCell/useTableSelectionCell';
import type { DataGridSelectionCellProps, DataGridSelectionCellState } from './DataGridSelectionCell.types';

/**
 * Create the state required to render DataGridSelectionCell.
 *
 * The returned state can be modified with hooks such as useDataGridSelectionCellStyles_unstable,
 * before being passed to renderDataGridSelectionCell_unstable.
 *
 * @param props - props from this instance of DataGridSelectionCell
 * @param ref - reference to root HTMLElement of DataGridSelectionCell
 */
export const useDataGridSelectionCell_unstable = (
  props: DataGridSelectionCellProps,
  ref: React.Ref<HTMLElement>,
): DataGridSelectionCellState => {
  return useTableSelectionCell_unstable({ ...props, as: 'div' }, ref);
};
