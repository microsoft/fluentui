import * as React from 'react';
import { useDataGrid_unstable } from './useDataGrid.styles';
import {
  renderDataGrid_unstable,
  useDataGridStyles_unstable,
  useDataGridContextValues_unstable,
  TableSelectionCellWidth,
} from '@fluentui/react-table';
import type { DataGridProps } from '@fluentui/react-table';
import { ForwardRefComponent, useScrollbarWidth } from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-components';

export const DataGrid: ForwardRefComponent<DataGridProps> = React.forwardRef((props, ref) => {
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });

  let containerWidthOffset = props.containerWidthOffset;

  if (containerWidthOffset === undefined) {
    containerWidthOffset = props.selectionMode ? -TableSelectionCellWidth : 0;
    containerWidthOffset -= scrollbarWidth || 0;
  }

  const state = useDataGrid_unstable({ ...props, containerWidthOffset }, ref);

  useDataGridStyles_unstable(state);
  return renderDataGrid_unstable(state, useDataGridContextValues_unstable(state));
});

DataGrid.displayName = 'DataGrid';
