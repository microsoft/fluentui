import * as React from 'react';
import { useDataGridRow_unstable } from './useDataGridRow';
import { renderDataGridRow_unstable } from './renderDataGridRow';
import { useDataGridRowStyles_unstable } from './useDataGridRowStyles';
import type { DataGridRowProps } from './DataGridRow.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * DataGridRow component
 */
export const DataGridRow: ForwardRefComponent<DataGridRowProps> &
  (<TItem>(props: DataGridRowProps<TItem>) => JSX.Element) = React.forwardRef((props, ref) => {
  const state = useDataGridRow_unstable(props, ref);

  useDataGridRowStyles_unstable(state);

  const { useDataGridRowStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderDataGridRow_unstable(state);
}) as ForwardRefComponent<DataGridRowProps> & (<TItem>(props: DataGridRowProps<TItem>) => JSX.Element);

DataGridRow.displayName = 'DataGridRow';
