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
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const DataGridHeaderCell: ForwardRefComponent<DataGridHeaderCellProps> = React.forwardRef((props, ref) => {
  const state = useDataGridHeaderCell_unstable(props, ref);

  useDataGridHeaderCellStyles_unstable(state);

  useCustomStyleHook_unstable('useDataGridHeaderCellStyles_unstable')(state);

  return renderDataGridHeaderCell_unstable(state);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<DataGridHeaderCellProps>;

DataGridHeaderCell.displayName = 'DataGridHeaderCell';
