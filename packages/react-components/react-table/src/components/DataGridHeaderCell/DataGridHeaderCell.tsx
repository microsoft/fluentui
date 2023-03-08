import * as React from 'react';
import { useDataGridHeaderCell_unstable } from './useDataGridHeaderCell';
import { renderDataGridHeaderCell_unstable } from './renderDataGridHeaderCell';
import { useDataGridHeaderCellStyles_unstable } from './useDataGridHeaderCellStyles';
import type { DataGridHeaderCellProps } from './DataGridHeaderCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * DataGridHeaderCell component
 */
export const DataGridHeaderCell: ForwardRefComponent<DataGridHeaderCellProps> = React.forwardRef((props, ref) => {
  const state = useDataGridHeaderCell_unstable(props, ref);

  useDataGridHeaderCellStyles_unstable(state);

  const { useDataGridHeaderCellStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderDataGridHeaderCell_unstable(state);
});

DataGridHeaderCell.displayName = 'DataGridHeaderCell';
