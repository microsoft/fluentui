import * as React from 'react';
import { isInteractiveHTMLElement, useEventCallback, slot } from '@fluentui/react-utilities';
import { Space } from '@fluentui/keyboard-keys';
import type { DataGridRowProps, DataGridRowState } from './DataGridRow.types';
import { useTableRow_unstable } from '../TableRow/useTableRow';
import { dataGridContextDefaultValue, useDataGridContext_unstable } from '../../contexts/dataGridContext';
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
  const focusMode = useDataGridContext_unstable(ctx => ctx.focusMode);
  const compositeRowTabsterAttribute = useDataGridContext_unstable(ctx => ctx.compositeRowTabsterAttribute);

  const tabbable = focusMode === 'row_unstable' || focusMode === 'composite';
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
      tabIndex: tabbable && !isHeader ? 0 : undefined,
      ...(focusMode === 'composite' && !isHeader && compositeRowTabsterAttribute),
      ...props,
      onClick,
      onKeyDown,
      children: null,
      as: 'div',
    },
    ref,
  );

  return {
    ...baseState,
    components: {
      ...baseState.components,
      selectionCell: DataGridSelectionCell,
    },
    selectionCell: slot.optional(props.selectionCell, {
      renderByDefault: selectable,
      elementType: DataGridSelectionCell,
    }),
    renderCell: props.children,
    columnDefs,
    // This context value should not be used internally
    // It's intended to help power user render functions
    dataGridContextValue: useStableDataGridContextValue(),
  };
};

function useStableDataGridContextValue() {
  const ref = React.useRef(dataGridContextDefaultValue);

  // Heads up!
  // We will not re-render when the context value changes, but we will have the latest value of the context when we do
  // render for other reasons.
  //
  // This relies on a context selector that always returns the same value:
  // - we will not re-render when the context value changes
  // - we will store the context value in a ref
  useDataGridContext_unstable(ctx => {
    ref.current = ctx;
    return null;
  });

  return ref.current!;
}
