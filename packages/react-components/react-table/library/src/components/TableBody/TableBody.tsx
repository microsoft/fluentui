import * as React from 'react';
import { useTableBody_unstable } from './useTableBody';
import { renderTableBody_unstable } from './renderTableBody';
import { useTableBodyStyles_unstable } from './useTableBodyStyles.styles';
import type { TableBodyProps } from './TableBody.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TableBody component
 */
export const TableBody: ForwardRefComponent<TableBodyProps> = React.forwardRef((props, ref) => {
  const state = useTableBody_unstable(props, ref);

  useTableBodyStyles_unstable(state);

  useCustomStyleHook_unstable('useTableBodyStyles_unstable')(state);

  return renderTableBody_unstable(state);
});

TableBody.displayName = 'TableBody';
