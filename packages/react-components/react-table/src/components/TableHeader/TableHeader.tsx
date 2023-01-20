import * as React from 'react';
import { useTableHeader_unstable } from './useTableHeader';
import { renderTableHeader_unstable } from './renderTableHeader';
import { useTableHeaderStyles_unstable } from './useTableHeaderStyles';
import type { TableHeaderProps } from './TableHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TableHeader component
 */
export const TableHeader: ForwardRefComponent<TableHeaderProps> = React.forwardRef((props, ref) => {
  const state = useTableHeader_unstable(props, ref);

  useTableHeaderStyles_unstable(state);
  return renderTableHeader_unstable(state);
});

TableHeader.displayName = 'TableHeader';
