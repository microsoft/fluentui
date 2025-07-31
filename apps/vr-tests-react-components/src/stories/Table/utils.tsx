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
  TableCellLayout,
  TableSelectionCell,
  TableCellActions,
  TableProps,
  TableRowProps,
  useTableColumnSizing_unstable,
  useTableFeatures,
  TableColumnDefinition,
  createTableColumn,
} from '@fluentui/react-table';
import { Button } from '@fluentui/react-button';
import type { JSXElement } from '@fluentui/react-utilities';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
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

const columnsDef: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    renderHeaderCell: () => <>File</>,
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => <>Author</>,
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => <>Last updated</>,
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => <>Last update</>,
  }),
];

interface SharedVrTestArgs {
  noNativeElements: TableProps['noNativeElements'];
  selectedRowAppearance?: TableRowProps['appearance'];
}

export const CellActionsDefault: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table noNativeElements={noNativeElements}>
    <TableHeader>
      <TableRow>
        {columns.map(column => (
          <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map((item, i) => (
        <TableRow key={item.file.label} className={`row-${i}`}>
          <TableCell>
            <TableCellLayout media={item.file.icon}>
              {item.file.label}
              <TableCellActions>
                <Button icon={<EditRegular />} appearance="subtle" />
                <Button icon={<MoreHorizontalRegular />} appearance="subtle" />
              </TableCellActions>
            </TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
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
    </TableBody>
  </Table>
);

export const CellActionsAlwaysVisible: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table noNativeElements={noNativeElements}>
    <TableHeader>
      <TableRow>
        {columns.map(column => (
          <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map((item, i) => (
        <TableRow key={item.file.label} className={`row-${i}`}>
          <TableCell>
            <TableCellLayout media={item.file.icon}>
              {item.file.label}
              <TableCellActions visible>
                <Button icon={<EditRegular />} appearance="subtle" />
                <Button icon={<MoreHorizontalRegular />} appearance="subtle" />
              </TableCellActions>
            </TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
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
    </TableBody>
  </Table>
);

export const CellActionsInHeaderCell: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table noNativeElements={noNativeElements}>
    <TableHeader>
      <TableRow>
        {columns.map(column => (
          <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map((item, i) => (
        <TableRow key={item.file.label} className={`row-${i}`}>
          <TableHeaderCell>
            <TableCellLayout media={item.file.icon}>
              {item.file.label}
              <TableCellActions>
                <Button icon={<EditRegular />} appearance="subtle" />
                <Button icon={<MoreHorizontalRegular />} appearance="subtle" />
              </TableCellActions>
            </TableCellLayout>
          </TableHeaderCell>
          <TableCell>
            <TableCellLayout
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
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
    </TableBody>
  </Table>
);

export const SizeMedium: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table noNativeElements={noNativeElements}>
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
            <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
            >
              {item.author.label}
            </TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout>{item.lastUpdated.label}</TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const SizeSmall: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table size="small" noNativeElements={noNativeElements}>
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
            <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout
              media={
                <Avatar
                  name={item.author.label}
                  size={24}
                  badge={{ status: item.author.status as PresenceBadgeStatus }}
                />
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
    </TableBody>
  </Table>
);

export const SizeExtraSmall: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table size="extra-small" noNativeElements={noNativeElements}>
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
            <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout
              media={
                <Avatar
                  name={item.author.label}
                  size={20}
                  badge={{ status: item.author.status as PresenceBadgeStatus }}
                />
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
    </TableBody>
  </Table>
);

export const PrimaryCell: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table noNativeElements={noNativeElements}>
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
            <TableCellLayout media={item.file.icon} description="Your organization" appearance="primary">
              {item.file.label}
            </TableCellLayout>
          </TableCell>
          <TableCellLayout
            media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
          >
            {item.author.label}
          </TableCellLayout>
          <TableCell>{item.lastUpdated.label}</TableCell>
          <TableCell>
            <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const Multiselect: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table noNativeElements={noNativeElements}>
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
          <TableCell>
            <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
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
    </TableBody>
  </Table>
);

export const MultiselectChecked: React.FC<SharedVrTestArgs> = ({ noNativeElements, selectedRowAppearance }) => (
  <Table noNativeElements={noNativeElements}>
    <TableHeader>
      <TableRow>
        <TableSelectionCell checked={true} />
        {columns.map(column => (
          <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map(item => {
        return (
          <TableRow key={item.file.label} appearance={selectedRowAppearance}>
            <TableSelectionCell checked />
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
        );
      })}
    </TableBody>
  </Table>
);

export const MultiselectMixed: React.FC<SharedVrTestArgs> = ({ noNativeElements, selectedRowAppearance }) => (
  <Table noNativeElements={noNativeElements}>
    <TableHeader>
      <TableRow>
        <TableSelectionCell checked="mixed" />
        {columns.map(column => (
          <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map((item, i) => {
        const checked = !!(i % 2);
        return (
          <TableRow key={item.file.label} appearance={checked ? selectedRowAppearance : 'none'}>
            <TableSelectionCell checked={checked} />
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
        );
      })}
    </TableBody>
  </Table>
);

export const SingleSelect: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table noNativeElements={noNativeElements}>
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
          <TableCell>
            <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
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
    </TableBody>
  </Table>
);

export const SingleSelectChecked: React.FC<SharedVrTestArgs> = ({ noNativeElements, selectedRowAppearance }) => (
  <Table noNativeElements={noNativeElements}>
    <TableHeader>
      <TableRow>
        <TableSelectionCell type="radio" hidden />
        {columns.map(column => (
          <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map((item, i) => {
        const checked = i === 1;
        return (
          <TableRow key={item.file.label} appearance={checked ? selectedRowAppearance : undefined}>
            <TableSelectionCell type="radio" checked={checked} />
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
        );
      })}
    </TableBody>
  </Table>
);

export const SortableHeaders: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table noNativeElements={noNativeElements} sortable>
    <TableHeader>
      <TableRow>
        {columns.map(column => (
          <TableHeaderCell className="columnheader" key={column.columnKey} sortDirection={'ascending'}>
            {column.label}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map(item => (
        <TableRow key={item.file.label}>
          <TableCell>
            <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
            >
              {item.author.label}
            </TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout>{item.lastUpdated.label}</TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const SubtleSelection: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table noNativeElements={noNativeElements}>
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
          <TableSelectionCell subtle type="radio" checked={i === 1} className={i === 1 ? 'selected' : 'not-selected'} />
          <TableCell>
            <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
          </TableCell>

          <TableCell>
            <TableCellLayout
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
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
    </TableBody>
  </Table>
);

export const SubtleSelectionEmpty: React.FC<SharedVrTestArgs> = ({ noNativeElements }) => (
  <Table noNativeElements={noNativeElements}>
    <TableHeader>
      <TableRow>
        <TableSelectionCell type="checkbox" hidden />
        {columns.map(column => (
          <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map((item, i) => (
        <TableRow key={item.file.label}>
          <TableSelectionCell subtle type="checkbox" className="not-selected" />
          <TableCell>
            <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
          </TableCell>

          <TableCell>
            <TableCellLayout
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
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
    </TableBody>
  </Table>
);

export const Truncate: React.FC<SharedVrTestArgs & { truncate?: boolean }> = ({ noNativeElements, truncate }) => (
  <Table noNativeElements={noNativeElements} style={{ width: '400px' }}>
    <TableHeader>
      <TableRow>
        {columns.map(column => (
          <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map((item, i) => (
        <TableRow key={item.file.label} className={`row-${i}`}>
          <TableCell>
            <TableCellLayout truncate={truncate} media={item.file.icon}>
              {item.file.label}
              <TableCellActions>
                <Button icon={<EditRegular />} appearance="subtle" />
                <Button icon={<MoreHorizontalRegular />} appearance="subtle" />
              </TableCellActions>
            </TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout
              truncate={truncate}
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
            >
              {item.author.label}
            </TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout truncate={truncate}>{item.lastUpdated.label}</TableCellLayout>
          </TableCell>
          <TableCell>
            <TableCellLayout truncate={truncate} media={item.lastUpdate.icon}>
              {item.lastUpdate.label}
            </TableCellLayout>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const ResizableColumns: React.FC<SharedVrTestArgs & { scrollToEnd?: boolean }> = ({
  noNativeElements,
  scrollToEnd,
}) => {
  const [columnSizingOptions] = React.useState({
    file: {
      idealWidth: 300,
      minWidth: 300,
    },
  });

  const { columnSizing_unstable: columnSizing, tableRef } = useTableFeatures(
    {
      columns: columnsDef,
      items,
    },
    [
      useTableColumnSizing_unstable({
        columnSizingOptions,
      }),
    ],
  );
  return (
    <div style={{ width: '500px', overflow: 'auto', border: '1px dashed black' }}>
      <Table noNativeElements={noNativeElements} ref={tableRef} {...columnSizing.getTableProps()}>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey} {...columnSizing.getTableHeaderCellProps(column.columnKey)}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, i) => (
            <TableRow key={item.file.label} className={`row-${i}`}>
              <TableCell {...columnSizing.getTableCellProps('file')}>
                <TableCellLayout truncate media={item.file.icon}>
                  {item.file.label}
                  <TableCellActions>
                    <Button icon={<EditRegular />} appearance="subtle" />
                    <Button icon={<MoreHorizontalRegular />} appearance="subtle" />
                  </TableCellActions>
                </TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing.getTableCellProps('author')}>
                <TableCellLayout
                  truncate
                  media={
                    <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                  }
                >
                  {item.author.label}
                </TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing.getTableCellProps('lastUpdated')}>
                <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing.getTableCellProps('lastUpdate')}>
                <TableCellLayout truncate media={item.lastUpdate.icon}>
                  {item.lastUpdate.label}
                </TableCellLayout>
              </TableCell>
              <div
                ref={el => {
                  if (el && scrollToEnd) {
                    el.scrollIntoView();
                  }
                }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
