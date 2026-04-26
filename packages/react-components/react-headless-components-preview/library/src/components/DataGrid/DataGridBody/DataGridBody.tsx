'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridBodyProps } from './DataGridBody.types';
import { useDataGridBody } from './useDataGridBody';
import { renderDataGridBody } from './renderDataGridBody';

export const DataGridBody: ForwardRefComponent<DataGridBodyProps> = React.forwardRef((props, ref) => {
  return renderDataGridBody(useDataGridBody(props, ref));
});
DataGridBody.displayName = 'DataGridBody';
