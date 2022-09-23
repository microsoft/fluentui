import * as React from 'react';
import { Table, TableHeader, TableHeaderCell, TableCell, TableBody, TableRow } from '../..';
import { RecyclerListView, LayoutProvider, DataProvider } from 'recyclerlistview/web';
import { useTable } from '../../hooks/useTable';

const layoutProvider = new LayoutProvider(
  () => 0,
  (_, dimensions) => {
    dimensions.width = window.innerWidth;
    dimensions.height = 45;
  },
);

const dataProvider = new DataProvider((r1, r2) => r1 !== r2);

export const VirtualizationRecyclerListView = () => {
  const { tableRef } = useTable(
    {
      columns: [{ columnId: 'first' }, { columnId: 'second' }, { columnId: 'third' }, { columnId: 'fourth' }],
      items: [],
    },
    [],
  );

  const items = new Array(10000).fill(0).map((_, i) => i);

  return (
    <Table ref={tableRef} noNativeElements layoutType="flex">
      <TableHeader style={{ paddingRight: 14 }}>
        <TableRow>
          <TableHeaderCell>First</TableHeaderCell>
          <TableHeaderCell>Second</TableHeaderCell>
          <TableHeaderCell>Third</TableHeaderCell>
          <TableHeaderCell>Fourth</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <RecyclerListView
          style={{ height: 500 }}
          dataProvider={dataProvider.cloneWithRows(items)}
          layoutProvider={layoutProvider}
          rowRenderer={() => {
            return (
              <TableRow>
                <TableCell>First</TableCell>
                <TableCell>Second</TableCell>
                <TableCell>Third</TableCell>
                <TableCell>Fourth</TableCell>
              </TableRow>
            );
          }}
        />
      </TableBody>
    </Table>
  );
};
