import * as React from 'react';

import { InfoButton } from '@fluentui/react-components/unstable';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
} from '@fluentui/react-components';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';

import { Scenario } from './utils';

type FileCell = {
  label: string;
  format: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  time: string;
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
    file: { label: 'Meeting notes', icon: <DocumentRegular />, format: 'Microsoft Word (DOCX)' },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', time: '10:25 AM, 4/23/2023', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular />, format: 'Microsoft PowerPoint (PPTX)' },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', time: '1:45 PM, 4/22/2023', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular />, format: 'MPEG4 Video (MP4)' },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', time: '1:45 PM, 4/22/2023', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular />, format: 'Adobe PDF' },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', time: '9:30 AM, 4/19/2023', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const FilesListingInfoButtons: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Files listing info buttons">
      <h1 id="filesListingTable-heading">Files listing</h1>

      <Table aria-labelledby="filesListingTable-heading">
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.file.label}>
              <TableCell>
                <TableCellLayout media={item.file.icon}>
                  {item.file.label}{' '}
                  <span aria-owns={`file${index}-popup`}>
                    <InfoButton
                      info={{
                        id: `file${index}-popup`,
                        children: (
                          <>
                            File format is {item.file.format}. <a href="#">Learn more</a> about this file format.
                          </>
                        ),
                      }}
                      aria-label="Show file format"
                    />
                  </span>
                  ,
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout
                  media={
                    <Avatar
                      aria-label={item.author.label}
                      name={item.author.label}
                      badge={{
                        status: item.author.status as PresenceBadgeStatus,
                      }}
                    />
                  }
                >
                  {item.author.label}
                </TableCellLayout>
              </TableCell>
              <TableCell>
                {item.lastUpdated.label}{' '}
                <span aria-owns={`lastUpdated${index}-popup`}>
                  <InfoButton
                    info={{
                      id: `lastUpdated${index}-popup`,
                      children: `Last updated at ${item.lastUpdated.time} PST.`,
                    }}
                    aria-label="Show full date and time"
                  />
                </span>
              </TableCell>
              <TableCell>
                <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scenario>
  );
};
