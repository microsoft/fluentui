import * as React from 'react';
import { useTableCellLayout_unstable } from './useTableCellLayout';
import { renderTableCellLayout_unstable } from './renderTableCellLayout';
import { useTableCellLayoutStyles_unstable } from './useTableCellLayoutStyles.styles';
import { useTableCellLayoutContextValues_unstable } from './useTableCellLayoutContextValues';
import type { TableCellLayoutProps } from './TableCellLayout.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TableCellLayout component
 */
export const TableCellLayout: ForwardRefComponent<TableCellLayoutProps> = React.forwardRef((props, ref) => {
  const state = useTableCellLayout_unstable(props, ref);

  useTableCellLayoutStyles_unstable(state);

  useCustomStyleHook_unstable('useTableCellLayoutStyles_unstable')(state);

  return renderTableCellLayout_unstable(state, useTableCellLayoutContextValues_unstable(state));
});

TableCellLayout.displayName = 'TableCellLayout';
