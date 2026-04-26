'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableBodyProps } from './TableBody.types';
import { useTableBody } from './useTableBody';
import { renderTableBody } from './renderTableBody';

export const TableBody: ForwardRefComponent<TableBodyProps> = React.forwardRef((props, ref) => {
  return renderTableBody(useTableBody(props, ref));
});
TableBody.displayName = 'TableBody';
