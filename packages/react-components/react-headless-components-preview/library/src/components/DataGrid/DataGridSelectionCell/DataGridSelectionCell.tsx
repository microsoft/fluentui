'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridSelectionCellProps } from './DataGridSelectionCell.types';
import { useDataGridSelectionCell } from './useDataGridSelectionCell';
import { renderDataGridSelectionCell } from './renderDataGridSelectionCell';

export const DataGridSelectionCell: ForwardRefComponent<DataGridSelectionCellProps> = React.forwardRef((props, ref) => {
  return renderDataGridSelectionCell(useDataGridSelectionCell(props, ref));
});
DataGridSelectionCell.displayName = 'DataGridSelectionCell';
