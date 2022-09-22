import * as React from 'react';
import { Table, TableHeader, TableHeaderCell, TableCell, TableBody, TableRow } from '../..';
import { FixedSizeList as List } from 'react-window';
import { useTable } from '../../hooks/useTable';
import { useColumnSizing } from '../../hooks/useColumnSizing';

const Row = ({ index, style }) => (
  <TableRow style={style}>
    <TableCell>First {index}</TableCell>
    <TableCell>Second</TableCell>
    <TableCell>Third</TableCell>
    <TableCell>Fourth</TableCell>
  </TableRow>
);

export const VirtualizationReactWindow = () => {
  const {
    columnSizing: { getTotalWidth },
    tableRef,
  } = useTable(
    {
      columns: [{ columnId: 'first' }, { columnId: 'second' }, { columnId: 'third' }, { columnId: 'fourth' }],
      items: [],
    },
    [useColumnSizing],
  );

  return (
    <Table ref={tableRef} noNativeElements>
      <TableHeader style={{ paddingRight: 14 }}>
        <TableRow>
          <TableHeaderCell>First</TableHeaderCell>
          <TableHeaderCell>Second</TableHeaderCell>
          <TableHeaderCell>Third</TableHeaderCell>
          <TableHeaderCell>Fourth</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <List height={600} itemCount={1000} itemSize={50} width={getTotalWidth()}>
          {Row}
        </List>
      </TableBody>
    </Table>
  );
};
