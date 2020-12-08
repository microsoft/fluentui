import {
  Accordion,
  gridCellBehavior,
  gridHeaderCellBehavior,
  gridNestedBehavior,
  gridRowBehavior,
  Table,
} from '@fluentui/react-northstar';
import * as React from 'react';
import { AutoSizer, List as ReactVirtualizedList, WindowScroller, ListProps, ListRowRenderer } from 'react-virtualized';
import getItems from './itemsGenerator';

// Magic offset for native scrollbar in Edge on Mac
const scrollbarOffset = 10;

function VirtualizedTablesPrototype() {
  const [ref, setRef] = React.useState(null);

  const tables = [
    {
      key: 'table1',
      title: <div>Table one</div>,
      content: <VirtualizedTable scrollElementRef={ref} label={'table1'} />,
    },
    {
      key: 'table2',
      title: <div>Custom table title</div>,
      content: <VirtualizedTable scrollElementRef={ref} label={'table2'} />,
    },
  ];

  return (
    <div id="scrollParent" style={{ height: '700px', overflowY: 'auto' }} ref={setRef} tabIndex={-1} role="none">
      {ref && <Accordion panels={tables} />}
    </div>
  );
}

interface VirtualizedTableProps {
  scrollElementRef: HTMLDivElement;
  label: string;
}

const accessibilityListProperties: Partial<ListProps> = {
  'aria-label': '',
  'aria-readonly': undefined,
  containerRole: 'presentation',
  role: 'presentation',
  tabIndex: null,
};

const accessibilityWrapperProperties: React.HTMLAttributes<HTMLDivElement> = {
  'aria-label': '',
  'aria-readonly': undefined,
  role: 'presentation',
};

function VirtualizedTable(props: VirtualizedTableProps) {
  const { header, rows } = getItems(20, 50);
  const renderedItems = [header, ...rows];
  const itemsCount = renderedItems.length;

  const rowGetter = ({ index }) => {
    return renderedItems[index];
  };

  const rowRenderer: ListRowRenderer = ({ index, style }) => {
    const row = renderedItems[index];
    const header = row.key === 'header';
    return (
      <Table.Row style={style} key={row.key} accessibility={gridRowBehavior} aria-rowindex={index + 1} header={header}>
        <Table.Cell {...row.items[0]} accessibility={header ? gridHeaderCellBehavior : gridCellBehavior} />
        <Table.Cell {...row.items[1]} accessibility={header ? gridHeaderCellBehavior : gridCellBehavior} />
        <Table.Cell {...row.items[2]} accessibility={header ? gridHeaderCellBehavior : gridCellBehavior} />
        <Table.Cell {...row.items[3]} accessibility={header ? gridHeaderCellBehavior : gridCellBehavior} />
      </Table.Row>
    );
  };

  return (
    <WindowScroller scrollElement={props.scrollElementRef} key={`${props.scrollElementRef}`}>
      {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => {
            return height ? (
              <Table accessibility={gridNestedBehavior} aria-rowcount={itemsCount} aria-label={props.label}>
                <div ref={el => registerChild(el)} {...accessibilityWrapperProperties}>
                  <ReactVirtualizedList
                    autoHeight
                    disableHeader={true}
                    height={height}
                    rowCount={itemsCount}
                    width={width - scrollbarOffset}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    rowHeight={80}
                    isScrolling={isScrolling}
                    rowGetter={rowGetter}
                    rowRenderer={rowRenderer}
                    overscanRowCount={20}
                    {...accessibilityListProperties}
                  />
                </div>
              </Table>
            ) : null;
          }}
        </AutoSizer>
      )}
    </WindowScroller>
  );
}

export default VirtualizedTablesPrototype;
