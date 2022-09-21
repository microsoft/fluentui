import * as React from 'react';
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell } from '../..';
import { useTable, ColumnDefinition, useColumnSizing } from '../../hooks';

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

const items: Item[] = new Array(10).fill(0).map((_, i) => ({ first: i, second: i, third: i, fourth: i }));

export const ColumnResize = () => {
  const {
    getRows,
    columnSizing: { getColumnWidth, setColumnWidth, getOnMouseDown },
    tableRef,
  } = useTable(
    {
      columns,
      items,
    },
    [useColumnSizing],
  );

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', width: 200 }}>
        {columns.map(column => {
          return (
            <>
              <label htmlFor="column.columnId">{column.columnId}</label>
              <input
                onChange={e => setColumnWidth(column.columnId, Number(e.target.value))}
                id={column.columnId as string}
                type="number"
                value={getColumnWidth(column.columnId)}
              />
            </>
          );
        })}
      </div>
      <Table ref={tableRef}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell style={{ width: getColumnWidth('first') }}>
              First
              <Resizer onMouseDown={getOnMouseDown('first')} />
            </TableHeaderCell>
            <TableHeaderCell style={{ width: getColumnWidth('second') }} onMouseDown={getOnMouseDown('second')}>
              Second
              <Resizer onMouseDown={getOnMouseDown('second')} />
            </TableHeaderCell>
            <TableHeaderCell style={{ width: getColumnWidth('third') }} onMouseDown={getOnMouseDown('third')}>
              Third
              <Resizer onMouseDown={getOnMouseDown('third')} />
            </TableHeaderCell>
            <TableHeaderCell style={{ width: getColumnWidth('fourth') }} onMouseDown={getOnMouseDown('fourth')}>
              Fourth
              <Resizer onMouseDown={getOnMouseDown('fourth')} />
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getRows().map(({ item }, i) => (
            <TableRow key={i}>
              <TableCell>{item.first}</TableCell>
              <TableCell>{item.second}</TableCell>
              <TableCell>{item.third}</TableCell>
              <TableCell>{item.fourth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const Resizer: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <div
      {...props}
      style={{
        borderRight: '2px solid red',
        height: 44,
        cursor: 'w-resize',
        paddingLeft: 4,
        paddingRight: 4,
        position: 'absolute',
        right: -8,
      }}
    />
  );
};
