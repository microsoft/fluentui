import * as React from 'react';
import { useDataGridRow_unstable } from './useDataGridRow';
import { renderDataGridRow_unstable } from './renderDataGridRow';
import { useDataGridRowStyles_unstable } from './useDataGridRowStyles';
import type { DataGridRowProps } from './DataGridRow.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DataGridRow component - TODO: add more docs
 */
export const DataGridRow: ForwardRefComponent<DataGridRowProps> = React.forwardRef((props, ref) => {
  const state = useDataGridRow_unstable(props, ref);

  useDataGridRowStyles_unstable(state);
  return renderDataGridRow_unstable(state);
});

DataGridRow.displayName = 'DataGridRow';
