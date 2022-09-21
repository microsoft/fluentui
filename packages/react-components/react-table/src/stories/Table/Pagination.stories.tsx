import * as React from 'react';
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell } from '../..';
import { useTable, ColumnDefinition, ColumnId, useSort, usePagination } from '../../hooks';

type Item = {
  first: number;
  second: number;
  third: number;
  fourth: number;
};

const columns: ColumnDefinition<Item>[] = [
  {
    columnId: 'first',
    compare: (a, b) => {
      return a.first - b.first;
    },
  },
  {
    columnId: 'second',
    compare: (a, b) => {
      return a.second - b.second;
    },
  },
  {
    columnId: 'third',
    compare: (a, b) => {
      return a.third - b.third;
    },
  },
  {
    columnId: 'fourth',
    compare: (a, b) => {
      return a.fourth - b.fourth;
    },
  },
];

const items: Item[] = new Array(1000).fill(0).map((_, i) => ({ first: i, second: i, third: i, fourth: i }));

export const Pagination = () => {
  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
    pagination: { getPageRows, nextPage, prevPage, pageCount, currentPage },
  } = useTable(
    {
      columns,
      items,
    },
    [
      tableState => useSort(tableState, { defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' } }),
      tableState => usePagination(tableState, { pageSize: 10 }),
    ],
  );

  const headerSortProps = (columnId: ColumnId) => ({
    onClick: () => {
      toggleColumnSort(columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const sortedRows = React.useMemo(() => {
    return sort(getRows());
  }, [sort, getRows]);

  return (
    <>
      <div>
        Page {currentPage + 1} of {pageCount}
      </div>
      <Table sortable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell {...headerSortProps('first')}>First</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('second')}>Second</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('third')}>Third</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('fourth')}>Fourth</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getPageRows(sortedRows).map(({ item }, i) => (
            <TableRow key={i}>
              <TableCell>{item.first}</TableCell>
              <TableCell>{item.second}</TableCell>
              <TableCell>{item.third}</TableCell>
              <TableCell>{item.fourth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <button onClick={prevPage}>Prev</button>
      <button onClick={nextPage}>Next</button>
    </>
  );
};
