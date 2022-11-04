import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import { PresenceBadgeStatus, Avatar } from '@fluentui/react-components';
import { Virtualizer, VirtualizerFlow } from '@fluentui/react-components/unstable';
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell } from '../..';
import { useTable, ColumnDefinition, ColumnId, useSort } from '../../src/hooks';
import { TableCellLayout } from '../../src/components/TableCellLayout/TableCellLayout';

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 3 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const repeatCount = 1000;
const generateContent = (): Item[] => {
  const contentList: Item[] = [];
  for (let i = 0; i < repeatCount; i++) {
    items.forEach((item, index) => {
      const newItem: Item = {
        file: { ...item.file },
        author: { ...item.author },
        lastUpdated: { ...item.lastUpdated },
        lastUpdate: { ...item.lastUpdate },
      };
      // Update labels to make unique
      newItem.author.label = `${newItem.author.label}-${i}-${index}`;
      newItem.file.label = `${newItem.file.label}-${i}-${index}`;
      newItem.lastUpdate.label = `${newItem.lastUpdate.label}-${i}-${index}`;
      newItem.lastUpdated.label = `${newItem.lastUpdated.label}-${i}-${index}`;
      contentList.push(newItem);
    });
  }
  return contentList;
};

const fullItemList: Item[] = generateContent();

const columns: ColumnDefinition<Item>[] = [
  {
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
  },
  {
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  },
  {
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  },
  {
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
  },
];

export const Virtualized = () => {
  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTable(
    {
      columns,
      items: fullItemList,
    },
    [useSort({ defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' } })],
  );

  const headerSortProps = (columnId: ColumnId) => ({
    onClick: () => {
      toggleColumnSort(columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  /* Use this for now to test vertical/horizontal/reversed basic layout */
  // return (
  //   <div
  //     style={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       overflowAnchor: 'none',
  //       overflow: 'auto',
  //       width: '500px',
  //     }}
  //   >
  //     <Virtualizer isReversed flow={VirtualizerFlow.Vertical} virtualizerLength={100} itemSize={100}>
  //       {fullItemList.map((item, index) => (
  //         <div style={{ display: 'flex', minHeight: '100px', width: '100%' }}>{item.file.label}</div>
  //       ))}
  //     </Virtualizer>
  //   </div>
  // );

  return (
    <Table sortable>
      <TableHeader>
        <TableRow>
          <TableHeaderCell {...headerSortProps('file')}>File</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('author')}>Author</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdated')}>Last updated</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdate')}>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <Virtualizer
          flow={VirtualizerFlow.Vertical}
          virtualizerLength={100}
          itemSize={44}
          sizeOfChild={(node, index) => {
            // An example of simple dynamic sizing
            return index % 2 == 0 ? 88 : 44;
          }}
        >
          {rows.map(({ item }, index) => (
            <TableRow key={item.file.label} style={{ height: index % 2 == 0 ? '88px' : '44px' }}>
              <TableCell>
                <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout
                  media={
                    <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                  }
                >
                  {item.author.label}
                </TableCellLayout>
              </TableCell>
              <TableCell>{item.lastUpdated.label}</TableCell>
              <TableCell>
                <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </Virtualizer>
      </TableBody>
    </Table>
  );
};
