import * as React from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from '@fluentui/react-table';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

const Default = () => {
  const items = React.useMemo(() => {
    const baseItems = [
      {
        file: { label: 'Meeting notes' },
        author: { label: 'Max Mustermann' },
        lastUpdated: { label: '7h ago', timestamp: 3 },
        lastUpdate: {
          label: 'You edited this',
        },
      },
      {
        file: { label: 'Thursday presentation' },
        author: { label: 'Erika Mustermann' },
        lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
        lastUpdate: {
          label: 'You recently opened this',
        },
      },
      {
        file: { label: 'Training recording' },
        author: { label: 'John Doe' },
        lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
        lastUpdate: {
          label: 'You recently opened this',
        },
      },
      {
        file: { label: 'Purchase order' },
        author: { label: 'Jane Doe' },
        lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
        lastUpdate: {
          label: 'You shared this in a Teams chat',
        },
      },
    ];

    return new Array(15).fill(0).map((_, i) => baseItems[i % baseItems.length]);
  }, []);

  return (
    <Table arial-label="Default table">
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>{item.author.label}</TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

Default.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);
export default Default;
