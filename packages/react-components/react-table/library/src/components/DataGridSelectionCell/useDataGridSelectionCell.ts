'use client';

import type * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';
import { useTableRowIdContext } from '../../contexts/rowIdContext';
import { useIsInTableHeader } from '../../contexts/tableHeaderContext';
import {
  useTableSelectionCell_unstable,
  useTableSelectionCellBase_unstable,
} from '../TableSelectionCell/useTableSelectionCell';
import type {
  DataGridSelectionCellBaseProps,
  DataGridSelectionCellBaseState,
  DataGridSelectionCellProps,
  DataGridSelectionCellState,
} from './DataGridSelectionCell.types';

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
  const subtle = useDataGridContext_unstable(ctx => ctx.subtleSelection);

  return useTableSelectionCell_unstable({ subtle, ...useDataGridSelectionCellProps(props) }, ref);
};

/**
 * Base state hook for DataGridSelectionCell, free of Tabster and of the Fluent `Checkbox` and `Radio`.
 *
 * @param props - props from this instance of DataGridSelectionCell
 * @param ref - reference to root HTMLElement of DataGridSelectionCell
 */
export const useDataGridSelectionCellBase_unstable = (
  props: DataGridSelectionCellBaseProps,
  ref: React.Ref<HTMLElement>,
): DataGridSelectionCellBaseState => {
  return useTableSelectionCellBase_unstable(useDataGridSelectionCellProps(props), ref);
};

/**
 * Props of the underlying table selection cell, shared by the styled and the base DataGridSelectionCell hooks.
 */
function useDataGridSelectionCellProps<TProps extends DataGridSelectionCellBaseProps | DataGridSelectionCellProps>(
  props: TProps,
) {
  const isHeader = useIsInTableHeader();
  const rowId = useTableRowIdContext();
  const checked = useDataGridContext_unstable(ctx => {
    if (isHeader && ctx.selection.selectionMode === 'multiselect') {
      return ctx.selection.allRowsSelected ? true : ctx.selection.someRowsSelected ? 'mixed' : false;
    }

    return ctx.selection.isRowSelected(rowId);
  });

  const toggleAllRows = useDataGridContext_unstable(ctx => ctx.selection.toggleAllRows);
  const type = useDataGridContext_unstable(ctx =>
    ctx.selection.selectionMode === 'multiselect' ? ('checkbox' as const) : ('radio' as const),
  );

  const onClick = useEventCallback((e: React.MouseEvent<HTMLTableCellElement>) => {
    if (isHeader) {
      toggleAllRows(e);
    }

    props.onClick?.(e);
  });

  return {
    as: 'div' as const,
    role: 'gridcell',
    checked,
    type,
    invisible: isHeader && type === 'radio',
    'aria-selected': checked === 'mixed' ? undefined : checked,
    radioIndicator: isHeader ? null : undefined,
    ...props,
    onClick,
  };
}
