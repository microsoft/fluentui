import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';
import { useTableRowIdContext } from '../../contexts/rowIdContext';
import { useIsInTableHeader } from '../../contexts/tableHeaderContext';
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
  const isHeader = useIsInTableHeader();
  const rowId = useTableRowIdContext();
  const subtle = useDataGridContext_unstable(ctx => ctx.subtleSelection);
  const checked = useDataGridContext_unstable(ctx => {
    if (isHeader && ctx.selection.selectionMode === 'multiselect') {
      return ctx.selection.allRowsSelected ? true : ctx.selection.someRowsSelected ? 'mixed' : false;
    }

    return ctx.selection.isRowSelected(rowId);
  });

  const toggleAllRows = useDataGridContext_unstable(ctx => ctx.selection.toggleAllRows);
  const type = useDataGridContext_unstable(ctx =>
    ctx.selection.selectionMode === 'multiselect' ? 'checkbox' : 'radio',
  );

  const onClick = useEventCallback((e: React.MouseEvent<HTMLTableCellElement>) => {
    if (isHeader) {
      toggleAllRows(e);
    }

    props.onClick?.(e);
  });

  return useTableSelectionCell_unstable(
    {
      as: 'div',
      role: 'gridcell',
      checked,
      type,
      invisible: isHeader && type === 'radio',
      'aria-checked': isHeader && type !== 'radio' ? checked : undefined,
      'aria-selected': isHeader || checked === 'mixed' ? undefined : checked,
      subtle,
      ...props,
      onClick,
    },
    ref,
  );
};
