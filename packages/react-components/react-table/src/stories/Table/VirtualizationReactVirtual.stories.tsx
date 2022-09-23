import * as React from 'react';
import { Table, TableHeader, TableHeaderCell, TableCell, TableBody, TableRow } from '../..';
import { useVirtualizer } from '@tanstack/react-virtual';

export const VirtualizationReactVirtual = () => {
  // The scrollable element for your list
  const parentRef = React.useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: 1000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <Table layoutType="flex">
      <TableHeader style={{ paddingRight: 16 }}>
        <TableRow>
          <TableHeaderCell>First</TableHeaderCell>
          <TableHeaderCell>Second</TableHeaderCell>
          <TableHeaderCell>Third</TableHeaderCell>
          <TableHeaderCell>Fourth</TableHeaderCell>
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
            {rowVirtualizer.getVirtualItems().map(virtualItem => (
              <TableRow
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <TableCell>First {virtualItem.key} </TableCell>
                <TableCell>Second</TableCell>
                <TableCell>Third</TableCell>
                <TableCell>Fourth</TableCell>
              </TableRow>
            ))}
          </div>
        </div>
      </TableBody>
    </Table>
  );
};
