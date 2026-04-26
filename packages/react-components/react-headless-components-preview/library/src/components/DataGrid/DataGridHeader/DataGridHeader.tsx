'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridHeaderProps } from './DataGridHeader.types';
import { useDataGridHeader } from './useDataGridHeader';
import { renderDataGridHeader } from './renderDataGridHeader';

export const DataGridHeader: ForwardRefComponent<DataGridHeaderProps> = React.forwardRef((props, ref) => {
  return renderDataGridHeader(useDataGridHeader(props, ref));
});
DataGridHeader.displayName = 'DataGridHeader';
