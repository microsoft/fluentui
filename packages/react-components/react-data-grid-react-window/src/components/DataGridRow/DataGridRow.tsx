import * as React from 'react';
import { useDataGridRowStyles_unstable, renderDataGridRow_unstable } from '@fluentui/react-table';
import { useDataGridRow_unstable } from './useDataGridRow';
import type { DataGridRowProps } from '@fluentui/react-table';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DataGridRow component
 */
export const DataGridRow: ForwardRefComponent<DataGridRowProps> &
  (<TItem>(props: DataGridRowProps<TItem>) => JSX.Element) = React.forwardRef((props, ref) => {
  const state = useDataGridRow_unstable(props, ref);

  useDataGridRowStyles_unstable(state);
  return renderDataGridRow_unstable(state);
}) as ForwardRefComponent<DataGridRowProps> & (<TItem>(props: DataGridRowProps<TItem>) => JSX.Element);

DataGridRow.displayName = 'DataGridRow';
