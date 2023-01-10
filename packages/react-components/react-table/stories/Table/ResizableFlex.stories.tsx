import {
  ColumnDefinition,
  ColumnId,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createColumn,
  useColumnSizing_unstable,
  useTableFeatures,
} from '@fluentui/react-components/unstable';
import * as React from 'react';

type Item = {
  first: number;
  second: number;
  third: number;
  fourth: number;
};

const columns: ColumnDefinition<Item>[] = [
  createColumn<Item>({
    columnId: 'first',
    compare: (a, b) => {
      return a.first - b.first;
    },
  }),
  createColumn<Item>({
    columnId: 'second',
    compare: (a, b) => {
      return a.second - b.second;
    },
  }),
  createColumn<Item>({
    columnId: 'third',
    compare: (a, b) => {
      return a.third - b.third;
    },
  }),
  createColumn<Item>({
    columnId: 'fourth',
    compare: (a, b) => {
      return a.fourth - b.fourth;
    },
  }),
];

const items: Item[] = new Array(10).fill(0).map((_, i) => ({ first: i, second: i, third: i, fourth: i }));

const CustomHandle: React.FC<{ onMouseDown: React.MouseEventHandler }> = ({ onMouseDown }) => {
  return (
    <div
      onMouseDown={onMouseDown}
      style={{ position: 'absolute', right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center' }}
    >
      🦑
    </div>
  );
};

export const ResizableFlex = () => {
  const { getRows, columnSizing, tableRef } = useTableFeatures(
    {
      columns,
      items,
    },
    [useColumnSizing_unstable()],
  );

  return (
    <>
      <Table ref={tableRef} columnSizingState={columnSizing} noNativeElements>
        <TableHeader>
          <TableRow>
            <TableHeaderCell
              {...columnSizing.getColumnProps('first')}
              resizeHandle={<CustomHandle onMouseDown={columnSizing.getOnMouseDown('first')} />}
            >
              Octopus' column
            </TableHeaderCell>

            <TableHeaderCell {...columnSizing.getColumnProps('second')}>Second</TableHeaderCell>
            <TableHeaderCell {...columnSizing.getColumnProps('third')}>Third</TableHeaderCell>
            <TableHeaderCell {...columnSizing.getColumnProps('fourth')}>Fourth</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getRows().map(({ item }, i) => (
            <TableRow key={i}>
              <TableCell {...columnSizing.getColumnProps('first')}>{item.first}</TableCell>
              <TableCell {...columnSizing.getColumnProps('second')}>{item.second}</TableCell>
              <TableCell {...columnSizing.getColumnProps('third')}>{item.third}</TableCell>
              <TableCell {...columnSizing.getColumnProps('fourth')}>{item.fourth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
