import * as React from 'react';
import { Table, TableHeader, TableHeaderCell, TableCell, TableBody, TableRow } from '../..';
import { useTable } from '../../hooks/useTable';
import { useColumnSizing } from '../../hooks/useColumnSizing';
import 'content-visibility';

export const VirtualizationContentVisibility = () => {
  const { tableRef } = useTable(
    {
      columns: [{ columnId: 'first' }, { columnId: 'second' }, { columnId: 'third' }, { columnId: 'fourth' }],
      items: [],
    },
    [useColumnSizing],
  );

  return (
    <Table ref={tableRef} noNativeElements>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>First</TableHeaderCell>
          <TableHeaderCell>Second</TableHeaderCell>
          <TableHeaderCell>Third</TableHeaderCell>
          <TableHeaderCell>Fourth</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <content-visibility>
          {new Array(200).fill(0).map((_, i) => (
            <TableRow key={i}>
              <TableCell>First {i} </TableCell>
              <TableCell>Second</TableCell>
              <TableCell>Third</TableCell>
              <TableCell>Fourth</TableCell>
            </TableRow>
          ))}
        </content-visibility>
      </TableBody>
    </Table>
  );
};
