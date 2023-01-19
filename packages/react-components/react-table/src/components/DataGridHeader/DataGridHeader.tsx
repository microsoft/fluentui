import * as React from 'react';
import { useDataGridHeader_unstable } from './useDataGridHeader';
import { renderDataGridHeader_unstable } from './renderDataGridHeader';
import { useDataGridHeaderStyles_unstable } from './useDataGridHeaderStyles';
import type { DataGridHeaderProps } from './DataGridHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DataGridHeader component
 */
export const DataGridHeader: ForwardRefComponent<DataGridHeaderProps> = React.forwardRef((props, ref) => {
  const state = useDataGridHeader_unstable(props, ref);

  useDataGridHeaderStyles_unstable(state);
  return renderDataGridHeader_unstable(state);
});

DataGridHeader.displayName = 'DataGridHeader';
