import * as React from 'react';
import { useDataGridVirtualizedBody_unstable } from './useDataGridVirtualizedBody';
import { renderDataGridVirtualizedBody_unstable } from './renderDataGridVirtualizedBody';
import { useDataGridVirtualizedBodyStyles_unstable } from './useDataGridVirtualizedBodyStyles';
import type { DataGridVirtualizedBodyProps } from './DataGridVirtualizedBody.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DataGridVirtualizedBody component - TODO: add more docs
 */
export const DataGridVirtualizedBody: ForwardRefComponent<DataGridVirtualizedBodyProps> = React.forwardRef(
  (props, ref) => {
    const state = useDataGridVirtualizedBody_unstable(props, ref);

    useDataGridVirtualizedBodyStyles_unstable(state);
    return renderDataGridVirtualizedBody_unstable(state);
  },
);

DataGridVirtualizedBody.displayName = 'DataGridVirtualizedBody';
