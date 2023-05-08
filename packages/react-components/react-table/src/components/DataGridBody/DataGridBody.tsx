import * as React from 'react';
import { useDataGridBody_unstable } from './useDataGridBody';
import { renderDataGridBody_unstable } from './renderDataGridBody';
import { useDataGridBodyStyles_unstable } from './useDataGridBodyStyles.styles';
import type { DataGridBodyProps } from './DataGridBody.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * DataGridBody component
 */
export const DataGridBody: ForwardRefComponent<DataGridBodyProps> &
  (<TItem>(props: DataGridBodyProps<TItem>) => JSX.Element) = React.forwardRef((props, ref) => {
  const state = useDataGridBody_unstable(props, ref);

  useDataGridBodyStyles_unstable(state);

  useCustomStyleHook_unstable('useDataGridBodyStyles_unstable')(state);

  return renderDataGridBody_unstable(state);
}) as ForwardRefComponent<DataGridBodyProps> & (<TItem>(props: DataGridBodyProps<TItem>) => JSX.Element);

DataGridBody.displayName = 'DataGridBody';
