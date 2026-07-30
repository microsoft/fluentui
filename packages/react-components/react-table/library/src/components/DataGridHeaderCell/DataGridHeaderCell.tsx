'use client';

import * as React from 'react';
import { useDataGridHeaderCell_unstable } from './useDataGridHeaderCell';
import { renderDataGridHeaderCell_unstable } from './renderDataGridHeaderCell';
import { useDataGridHeaderCellStyles_unstable } from './useDataGridHeaderCellStyles.styles';
import type { DataGridHeaderCellProps } from './DataGridHeaderCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * DataGridHeaderCell component
 */
export const DataGridHeaderCell: ForwardRefComponent<DataGridHeaderCellProps> = React.forwardRef((props, ref) => {
  let state = useDataGridHeaderCell_unstable(props, ref);

  state = useDataGridHeaderCellStyles_unstable(state);

  state = useCustomStyleHook_unstable('useDataGridHeaderCellStyles_unstable')(state);

  return renderDataGridHeaderCell_unstable(state);
});

DataGridHeaderCell.displayName = 'DataGridHeaderCell';
