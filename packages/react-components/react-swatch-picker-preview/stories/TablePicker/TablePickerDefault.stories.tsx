import * as React from 'react';
import { TablePicker, TablePickerProps, TableSwatch } from '@fluentui/react-swatch-picker-preview';

export const Default = (props: Partial<TablePickerProps>) => (
  <TablePicker {...props}>
    <tr>
      <TableSwatch aria-label="white" value="#fff" />
      <TableSwatch aria-label="black" value="#000" />
      <TableSwatch aria-label="color 1" value="#f00" />
    </tr>
    <tr>
      <TableSwatch aria-label="color 2" value="#0f0" />
      <TableSwatch aria-label="color 3" value="#00f" />
      <TableSwatch aria-label="color 4" value="#ff0" />
    </tr>
    <tr>
      <TableSwatch aria-label="color 5" value="#0ff" />
      <TableSwatch aria-label="color 6" value="#f0f" />
    </tr>
  </TablePicker>
);
