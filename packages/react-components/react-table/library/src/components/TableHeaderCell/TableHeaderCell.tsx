import * as React from 'react';
import { useTableHeaderCell_unstable } from './useTableHeaderCell';
import { renderTableHeaderCell_unstable } from './renderTableHeaderCell';
import { useTableHeaderCellStyles_unstable } from './useTableHeaderCellStyles.styles';
import type { TableHeaderCellProps } from './TableHeaderCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TableHeaderCell component
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const TableHeaderCell: ForwardRefComponent<TableHeaderCellProps> = React.forwardRef((props, ref) => {
  const state = useTableHeaderCell_unstable(props, ref);

  useTableHeaderCellStyles_unstable(state);

  useCustomStyleHook_unstable('useTableHeaderCellStyles_unstable')(state);

  return renderTableHeaderCell_unstable(state);
});

TableHeaderCell.displayName = 'TableHeaderCell';
