import {
  TableColumnDefinition,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useColumnSizing_unstable,
  useTableFeatures,
} from '@fluentui/react-components/unstable';
import * as React from 'react';

type Item = number;

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'first',
    compare: (a, b) => {
      return a - b;
    },
  }),
  createTableColumn<Item>({
    columnId: 'second',
    compare: (a, b) => {
      return a - b;
    },
  }),
  createTableColumn<Item>({
    columnId: 'third',
    compare: (a, b) => {
      return a - b;
    },
  }),
  createTableColumn<Item>({
    columnId: 'fourth',
    compare: (a, b) => {
      return a - b;
    },
  }),
];

const items: Item[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
      <Table ref={tableRef} noNativeElements>
        <TableHeader>
          <TableRow>
            <TableHeaderCell
              {...columnSizing.getColumnProps('first')}
              aside={<CustomHandle onMouseDown={columnSizing.getOnMouseDown('first')} />}
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
              <TableCell {...columnSizing.getColumnProps('first')}>{item}</TableCell>
              <TableCell {...columnSizing.getColumnProps('second')}>{item}</TableCell>
              <TableCell {...columnSizing.getColumnProps('third')}>{item}</TableCell>
              <TableCell {...columnSizing.getColumnProps('fourth')}>{item}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
