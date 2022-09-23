import * as React from 'react';
import { Table, TableHeader, TableHeaderCell, TableCell, TableBody, TableRow } from '../..';
import { List } from '@resembli/react-virtualized-window';

const sampleData = Array.from({ length: 10000 }, (_, i) => i);

const Row = ({ data, style }) => {
  return (
    <TableRow
      style={{
        ...style, // Important you spread the style object
      }}
    >
      <TableCell>First {data}</TableCell>
      <TableCell>Second</TableCell>
      <TableCell>Third</TableCell>
      <TableCell>Fourth</TableCell>
    </TableRow>
  );
};

export const VirtualizationResembli = () => {
  return (
    <Table layoutType="flex">
      <TableHeader style={{ paddingRight: 14 }}>
        <TableRow>
          <TableHeaderCell>First</TableHeaderCell>
          <TableHeaderCell>Second</TableHeaderCell>
          <TableHeaderCell>Third</TableHeaderCell>
          <TableHeaderCell>Fourth</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody style={{ height: 500 }}>
        <List defaultSize={50} data={sampleData}>
          {Row}
        </List>
      </TableBody>
    </Table>
  );
};
