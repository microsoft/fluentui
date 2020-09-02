import {
  gridCellBehavior,
  gridHeaderCellBehavior,
  gridNestedBehavior,
  gridRowBehavior,
  Table,
} from '@fluentui/react-northstar';
import * as React from 'react';
import { AutoSizer, List as ReactVirtualizedList, ListRowRenderer, ListProps } from 'react-virtualized';
import getItems from './itemsGenerator';

const { rows } = getItems();
const rowGetter = ({ index }) => {
  return rows[index];
};

// Overrides ARIA attributes assigned by default, which break accessibility
const accessibilityListProperties: Partial<ListProps> = {
  'aria-label': '',
  'aria-readonly': undefined,
  containerRole: 'presentation',
  role: 'presentation',
};

const rowRenderer: ListRowRenderer = ({ index, style }) => {
  const row = rows[index];
  return (
    <Table.Row style={style} key={row.key} accessibility={gridRowBehavior} aria-rowindex={index + 1}>
      <Table.Cell {...row.items[0]} accessibility={gridCellBehavior} />
      <Table.Cell {...row.items[1]} accessibility={gridCellBehavior} />
      <Table.Cell {...row.items[2]} accessibility={gridCellBehavior} />
      <Table.Cell {...row.items[3]} accessibility={gridCellBehavior} />
    </Table.Row>
  );
};

const VirtualizedTablePrototype = () => (
  <AutoSizer disableHeight>
    {({ width }) => (
      <Table accessibility={gridNestedBehavior} aria-rowcount={rows.length}>
        <Table.Row header accessibility={gridRowBehavior} style={{ width }}>
          <Table.Cell content="id" accessibility={gridHeaderCellBehavior} />
          <Table.Cell content="Name" accessibility={gridHeaderCellBehavior} />
          <Table.Cell content="Picture" accessibility={gridHeaderCellBehavior} />
          <Table.Cell content="Age" accessibility={gridHeaderCellBehavior} />
        </Table.Row>

        <ReactVirtualizedList
          disableHeader
          height={400}
          rowCount={rows.length}
          width={width}
          rowHeight={80}
          rowGetter={rowGetter}
          rowRenderer={rowRenderer}
          overscanRowCount={5}
          {...accessibilityListProperties}
        />
      </Table>
    )}
  </AutoSizer>
);

export default VirtualizedTablePrototype;
