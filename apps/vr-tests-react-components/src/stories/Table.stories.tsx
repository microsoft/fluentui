import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  MoreHorizontalRegular,
} from '@fluentui/react-icons';
import { Avatar } from '@fluentui/react-avatar';
import { PresenceBadgeStatus } from '@fluentui/react-badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableHeaderCell,
  TableCell,
  TableRow,
  TablePrimaryCell,
  TableSelectionCell,
  TableCellActions,
} from '@fluentui/react-table';
import { Button } from '@fluentui/react-button';
import { storiesOf } from '@storybook/react';
import Screener from 'screener-storybook/src/screener';

const items = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
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

storiesOf('Table - cell actions', module)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().hover('.row').snapshot('hover row').end()}>{story()}</Screener>
  ))
  .addStory(
    'default',
    () => (
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.file.label} className="row">
              <TableCell media={item.file.icon}>
                {item.file.label}
                <TableCellActions>
                  <Button icon={<EditRegular />} appearance="subtle" />
                  <Button icon={<MoreHorizontalRegular />} appearance="subtle" />
                </TableCellActions>
              </TableCell>
              <TableCell
                media={
                  <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                }
              >
                {item.author.label}
              </TableCell>
              <TableCell>{item.lastUpdated.label}</TableCell>
              <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  );

storiesOf('Table', module)
  .addStory(
    'default',
    () => (
      <Table>
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
              <TableCell media={item.file.icon}>{item.file.label}</TableCell>
              <TableCell
                media={
                  <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                }
              >
                {item.author.label}
              </TableCell>
              <TableCell>{item.lastUpdated.label}</TableCell>
              <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory('size - small', () => (
    <Table size="small">
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
            <TableCell media={item.file.icon}>{item.file.label}</TableCell>
            <TableCell
              media={
                <Avatar
                  name={item.author.label}
                  size={24}
                  badge={{ status: item.author.status as PresenceBadgeStatus }}
                />
              }
            >
              {item.author.label}
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ))
  .addStory('size - smaller', () => (
    <Table size="smaller">
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
            <TableCell media={item.file.icon}>{item.file.label}</TableCell>
            <TableCell
              media={
                <Avatar
                  name={item.author.label}
                  size={20}
                  badge={{ status: item.author.status as PresenceBadgeStatus }}
                />
              }
            >
              {item.author.label}
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ))
  .addStory('primary cell', () => (
    <Table>
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
            <TablePrimaryCell media={item.file.icon} main={item.file.label} secondary="Your organization" />
            <TableCell
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
            >
              {item.author.label}
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ))
  .addStory(
    'multiselect',
    () => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableSelectionCell />
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.file.label}>
              <TableSelectionCell />
              <TableCell media={item.file.icon}>{item.file.label}</TableCell>
              <TableCell
                media={
                  <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                }
              >
                {item.author.label}
              </TableCell>
              <TableCell>{item.lastUpdated.label}</TableCell>
              <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'multiselect (checked)',
    () => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableSelectionCell checked={true} />
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.file.label}>
              <TableSelectionCell checked={true} />
              <TableCell media={item.file.icon}>{item.file.label}</TableCell>
              <TableCell
                media={
                  <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                }
              >
                {item.author.label}
              </TableCell>
              <TableCell>{item.lastUpdated.label}</TableCell>
              <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'multiselect (mixed)',
    () => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableSelectionCell checked="mixed" />
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, i) => (
            <TableRow key={item.file.label}>
              <TableSelectionCell checked={!!(i % 2)} />
              <TableCell media={item.file.icon}>{item.file.label}</TableCell>
              <TableCell
                media={
                  <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                }
              >
                {item.author.label}
              </TableCell>
              <TableCell>{item.lastUpdated.label}</TableCell>
              <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'single select',
    () => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableSelectionCell type="radio" hidden />
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.file.label}>
              <TableSelectionCell type="radio" />
              <TableCell media={item.file.icon}>{item.file.label}</TableCell>
              <TableCell
                media={
                  <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                }
              >
                {item.author.label}
              </TableCell>
              <TableCell>{item.lastUpdated.label}</TableCell>
              <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'single select (checked)',
    () => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableSelectionCell type="radio" hidden />
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, i) => (
            <TableRow key={item.file.label}>
              <TableSelectionCell type="radio" checked={i === 1} />
              <TableCell media={item.file.icon}>{item.file.label}</TableCell>
              <TableCell
                media={
                  <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                }
              >
                {item.author.label}
              </TableCell>
              <TableCell>{item.lastUpdated.label}</TableCell>
              <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  );
