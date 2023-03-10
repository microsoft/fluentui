import * as React from 'react';
import { useTableBody_unstable } from './useTableBody';
import { renderTableBody_unstable } from './renderTableBody';
import { useTableBodyStyles_unstable } from './useTableBodyStyles';
import type { TableBodyProps } from './TableBody.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * TableBody component
 */
export const TableBody: ForwardRefComponent<TableBodyProps> = React.forwardRef((props, ref) => {
  const state = useTableBody_unstable(props, ref);

  useTableBodyStyles_unstable(state);

  const { useTableBodyStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderTableBody_unstable(state);
});

TableBody.displayName = 'TableBody';
