'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridRowProps } from './DataGridRow.types';
import { useDataGridRow } from './useDataGridRow';
import { renderDataGridRow } from './renderDataGridRow';

export const DataGridRow: ForwardRefComponent<DataGridRowProps> = React.forwardRef((props, ref) => {
  return renderDataGridRow(useDataGridRow(props, ref));
});
DataGridRow.displayName = 'DataGridRow';
