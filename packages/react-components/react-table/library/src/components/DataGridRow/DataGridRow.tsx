import * as React from 'react';
import { useDataGridRow_unstable } from './useDataGridRow';
import { renderDataGridRow_unstable } from './renderDataGridRow';
import { useDataGridRowStyles_unstable } from './useDataGridRowStyles.styles';
import type { DataGridRowProps } from './DataGridRow.types';
import type { ForwardRefComponent, JSXElement } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * DataGridRow component
 */
export const DataGridRow: ForwardRefComponent<DataGridRowProps> &
  (<TItem>(props: DataGridRowProps<TItem>) => JSXElement) = React.forwardRef<HTMLElement, DataGridRowProps>(
  (props, ref) => {
    const state = useDataGridRow_unstable(props, ref);

    useDataGridRowStyles_unstable(state);

    useCustomStyleHook_unstable('useDataGridRowStyles_unstable')(state);

    return renderDataGridRow_unstable(state);
  },
) as ForwardRefComponent<DataGridRowProps> & (<TItem>(props: DataGridRowProps<TItem>) => JSXElement);

DataGridRow.displayName = 'DataGridRow';
