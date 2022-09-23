import * as React from 'react';
import { Table, TableHeader, TableHeaderCell, TableCell, TableBody, TableRow, TableSelectionCell } from '../..';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useTable } from '../../hooks/useTable';
import { useSelection } from '../../hooks/useSelection';
import { useSort } from '../../hooks/useSort';
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

const items = new Array(1000).fill(0).map((_, i) => ({ index: i }));

export const VirtualizationReactVirtual = () => {
  // The scrollable element for your list
  const parentRef = React.useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: 1000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTable(
    {
      columns,
      items,
    },
    [
      tableState => useSelection(tableState, { selectionMode: 'multiselect' }),
      tableState => useSort(tableState, { defaultSortState: { sortColumn: 'first', sortDirection: 'ascending' } }),
    ],
  );

  let rows = getRows(row => ({
    ...row,
    onClick: () => toggleRow(row.rowId),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        toggleRow(row.rowId);
      }
    },
    selected: isRowSelected(row.rowId),
  }));

  rows = sort(rows);

  const headerSortProps = (columnId: ColumnId) => ({
    onClick: () => {
      toggleColumnSort(columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  return (
    <Table layoutType="flex">
      <TableHeader style={{ paddingRight: 16 }}>
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
        {/* The scrollable element for your list */}
        <div
          ref={parentRef}
          style={{
            height: `400px`,
            overflow: 'auto', // Make it scroll!
          }}
        >
          {/* The large inner element to hold all of the items */}
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {/* Only the visible items in the virtualizer, manually positioned to be in view */}
            {rowVirtualizer.getVirtualItems().map(virtualItem => {
              const {
                selected,
                onClick,
                item: { index: userIndex },
              } = rows[virtualItem.index];

              const style = {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              };

              return (
                <TableRow style={style} onClick={onClick} key={virtualItem.key}>
                  <TableSelectionCell checked={selected} />
                  <TableCell>First {userIndex}</TableCell>
                  <TableCell>Second {userIndex}</TableCell>
                  <TableCell>Third {userIndex}</TableCell>
                  <TableCell>Fourth {userIndex}</TableCell>
                </TableRow>
              );
            })}
          </div>
        </div>
      </TableBody>
    </Table>
  );
};
