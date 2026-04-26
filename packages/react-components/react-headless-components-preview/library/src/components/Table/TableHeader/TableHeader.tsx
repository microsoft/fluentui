'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableHeaderProps } from './TableHeader.types';
import { useTableHeader } from './useTableHeader';
import { renderTableHeader } from './renderTableHeader';

export const TableHeader: ForwardRefComponent<TableHeaderProps> = React.forwardRef((props, ref) => {
  return renderTableHeader(useTableHeader(props, ref));
});
TableHeader.displayName = 'TableHeader';
