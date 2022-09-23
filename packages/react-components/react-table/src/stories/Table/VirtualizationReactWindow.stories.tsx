import * as React from 'react';
import { Table, TableHeader, TableHeaderCell, TableCell, TableBody, TableRow } from '../..';
import { FixedSizeList as List } from 'react-window';
import { useTable } from '../../hooks/useTable';
import { useColumnSizing } from '../../hooks/useColumnSizing';
import { useSelection } from '../../hooks/useSelection';
import { useSort } from '../../hooks/useSort';
import { TableSelectionCell } from '../../components/TableSelectionCell/TableSelectionCell';
import { ColumnDefinition, ColumnId } from '../../hooks/types';

const columns: ColumnDefinition<{ index: number }>[] = [
  {
    columnId: 'first',
    compare: (a, b) => {
      return a.index - b.index;
    },
  },
  {
    columnId: 'second',
    compare: (a, b) => {
      return a.index - b.index;
    },
  },
  {
    columnId: 'third',
    compare: (a, b) => {
      return a.index - b.index;
    },
  },
  {
    columnId: 'fourth',
    compare: (a, b) => {
      return a.index - b.index;
    },
  },
];

const Row = ({ index, style, data }) => {
  const {
    selected,
    onClick,
    item: { index: userIndex },
  } = data[index];
  return (
    <TableRow style={style} onClick={onClick}>
      <TableSelectionCell checked={selected} />
      <TableCell>First {userIndex}</TableCell>
      <TableCell>Second {userIndex}</TableCell>
      <TableCell>Third {userIndex}</TableCell>
      <TableCell>Fourth {userIndex}</TableCell>
    </TableRow>
  );
};

const items = new Array(1000).fill(0).map((_, i) => ({ index: i }));

export const VirtualizationReactWindow = () => {
  const {
    columnSizing: { getTotalWidth },
    tableRef,
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTable(
    {
      columns,
      items,
    },
    [
      useColumnSizing,
      tableState => useSelection(tableState, { selectionMode: 'multiselect' }),
      tableState => useSort(tableState, { defaultSortState: { sortColumn: 'first', sortDirection: 'ascending' } }),
    ],
  );

  const rows = getRows(row => ({
    ...row,
    onClick: () => toggleRow(row.rowId),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        toggleRow(row.rowId);
      }
    },
    selected: isRowSelected(row.rowId),
  }));

  const headerSortProps = (columnId: ColumnId) => ({
    onClick: () => {
      toggleColumnSort(columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  return (
    <Table ref={tableRef} noNativeElements layoutType="flex">
      <TableHeader style={{ paddingRight: 14 }}>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
          />
          <TableHeaderCell {...headerSortProps('first')}>First</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('second')}>Second</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('third')}>Third</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('fourt')}>Fourth</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <List height={600} itemCount={1000} itemSize={50} width={getTotalWidth()} itemData={sort(rows)}>
          {Row}
        </List>
      </TableBody>
    </Table>
  );
};
