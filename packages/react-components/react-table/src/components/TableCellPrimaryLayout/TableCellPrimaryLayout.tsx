import * as React from 'react';
import { useTableCellPrimaryLayout_unstable } from './useTableCellPrimaryLayout';
import { renderTableCellPrimaryLayout_unstable } from './renderTableCellPrimaryLayout';
import { useTableCellPrimaryLayoutStyles_unstable } from './useTableCellPrimaryLayoutStyles';
import type { TableCellPrimaryLayoutProps } from './TableCellPrimaryLayout.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TableCellPrimaryLayout component - TODO: add more docs
 */
export const TableCellPrimaryLayout: ForwardRefComponent<TableCellPrimaryLayoutProps> = React.forwardRef(
  (props, ref) => {
    const state = useTableCellPrimaryLayout_unstable(props, ref);

    useTableCellPrimaryLayoutStyles_unstable(state);
    return renderTableCellPrimaryLayout_unstable(state);
  },
);

TableCellPrimaryLayout.displayName = 'TableCellPrimaryLayout';
