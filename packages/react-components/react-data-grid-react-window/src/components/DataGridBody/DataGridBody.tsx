import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-components';
import { useDataGridBodyStyles_unstable } from './useDataGridBodyStyles';
import { useDataGridBody_unstable } from './useDataGridBody';
import { renderDataGridBody_unstable } from './renderDataGridBody';
import type { DataGridBodyProps } from './DataGridBody.types';

/**
 * DataGridBody component
 */
export const DataGridBody: ForwardRefComponent<DataGridBodyProps> = React.forwardRef((props, ref) => {
  const state = useDataGridBody_unstable(props, ref);

  useDataGridBodyStyles_unstable(state);
  return renderDataGridBody_unstable(state);
});

DataGridBody.displayName = 'DataGridBody';
