import * as React from 'react';
import { isInteractiveHTMLElement, useEventCallback, resolveShorthand } from '@fluentui/react-utilities';
import { Space } from '@fluentui/keyboard-keys';
import type { DataGridRowProps, DataGridRowState } from './DataGridRow.types';
import { useTableRow_unstable } from '../TableRow/useTableRow';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';
import { DataGridSelectionCell } from '../DataGridSelectionCell/DataGridSelectionCell';
import { useTableRowIdContext } from '../../contexts/rowIdContext';
import { useIsInTableHeader } from '../../contexts/tableHeaderContext';

/**
 * Create the state required to render DataGridRow.
 *
 * The returned state can be modified with hooks such as useDataGridRowStyles_unstable,
 * before being passed to renderDataGridRow_unstable.
 *
 * @param props - props from this instance of DataGridRow
 * @param ref - reference to root HTMLElement of DataGridRow
 */
export const useDataGridRow_unstable = (props: DataGridRowProps, ref: React.Ref<HTMLElement>): DataGridRowState => {
  const rowId = useTableRowIdContext();
  const isHeader = useIsInTableHeader();
  const columnDefs = useDataGridContext_unstable(ctx => ctx.columns);
  const selectable = useDataGridContext_unstable(ctx => ctx.selectableRows);
  const selected = useDataGridContext_unstable(ctx => ctx.selection.isRowSelected(rowId));
  const tabbable = useDataGridContext_unstable(ctx => ctx.focusMode === 'row_unstable');
  const appearance = useDataGridContext_unstable(ctx => {
    if (!isHeader && selectable && ctx.selection.isRowSelected(rowId)) {
      return ctx.selectionAppearance;
    }

    return 'none';
  });
  const toggleRow = useDataGridContext_unstable(ctx => ctx.selection.toggleRow);

  const onClick = useEventCallback((e: React.MouseEvent<HTMLTableRowElement>) => {
    if (selectable && !isHeader) {
      toggleRow(e, rowId);
    }

    props.onClick?.(e);
  });

  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (selectable && !isHeader && e.key === Space && !isInteractiveHTMLElement(e.target as HTMLElement)) {
      // stop scrolling
      e.preventDefault();
      toggleRow(e, rowId);
    }

    props.onKeyDown?.(e);
  });

  const baseState = useTableRow_unstable(
    {
      appearance,
      'aria-selected': selectable ? selected : undefined,
      ...props,
      onClick,
      onKeyDown,
      children: null,
      as: 'div',
      tabIndex: tabbable && !isHeader ? 0 : undefined,
    },
    ref,
  );

  return {
    ...baseState,
    components: {
      ...baseState.components,
      selectionCell: DataGridSelectionCell,
    },
    selectionCell: resolveShorthand(props.selectionCell, { required: selectable }),
    renderCell: props.children,
    columnDefs,
  };
};
