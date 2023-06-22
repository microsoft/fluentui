import * as React from 'react';
import { DataGridProps, DataGridState, TABLE_SELECTION_CELL_WIDTH } from '@fluentui/react-table';
import { useDataGrid_unstable as useBaseState } from '@fluentui/react-table';
import { useFluent, useScrollbarWidth } from '@fluentui/react-components';

/**
 * Create the state required to render DataGrid.
 *
 * The returned state can be modified with hooks such as useDataGridStyles_unstable,
 * before being passed to renderDataGrid_unstable.
 *
 * @param props - props from this instance of DataGrid
 * @param ref - reference to root HTMLElement of DataGrid
 */
export const useDataGrid_unstable = (props: DataGridProps, ref: React.Ref<HTMLElement>): DataGridState => {
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });

  let containerWidthOffset = props.containerWidthOffset;

  if (containerWidthOffset === undefined) {
    containerWidthOffset = props.selectionMode ? -TABLE_SELECTION_CELL_WIDTH : 0;
    containerWidthOffset -= scrollbarWidth || 0;
  }

  return useBaseState({ ...props, 'aria-rowcount': props.items.length, containerWidthOffset }, ref);
};
