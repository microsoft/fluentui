import * as React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import { PresenceBadgeStatus, Avatar, useArrowNavigationGroup } from '@fluentui/react-components';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  TableSelectionCell,
  createColumn,
  useTableFeatures,
  useTableSelection,
  RowState as RowStateBase,
} from '@fluentui/react-components/unstable';

type Item = {
  file: {
    label: string;
    icon: JSX.Element;
  };
  author: {
    label: string;
    status: PresenceBadgeStatus;
  };
  lastUpdated: {
    label: string;
    timestamp: number;
  };
  lastUpdate: {
    label: string;
    icon: JSX.Element;
  };
};

interface RowState extends RowStateBase<Item> {
  onClick: (e: React.MouseEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  selected: boolean;
  appearance: 'brand' | 'none';
}

interface ReactWindowRenderFnProps extends ListChildComponentProps {
  data: RowState[];
}

export const Virtualization = () => {
  const columns = React.useMemo(
    () => [
      createColumn<Item>({
        columnId: 'file',
      }),
      createColumn<Item>({
        columnId: 'author',
      }),
      createColumn<Item>({
        columnId: 'lastUpdated',
      }),
      createColumn<Item>({
        columnId: 'lastUpdate',
      }),
    ],
    [],
  );

  const items = React.useMemo(() => {
    const baseItems: Item[] = [
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

    return new Array(1500).fill(0).map((_, i) => baseItems[i % baseItems.length]);
  }, []);

  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),
    ],
  );

  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  const rows: RowState[] = getRows(row => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ('brand' as const) : ('none' as const),
    };
  });

  return (
    <Table noNativeElements {...keyboardNavAttr}>
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            tabIndex={0}
            checkboxIndicator={{ tabIndex: -1 }}
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
          />
          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
          {/** Scrollbar alignment for the header */}
          <div role="presentation" style={{ width: 16 }} />
        </TableRow>
      </TableHeader>
      <TableBody>
        <List height={400} itemCount={items.length} itemSize={45} width="100%" itemData={rows}>
          {({ index, style, data }: ReactWindowRenderFnProps) => {
            const { item, selected, appearance, onClick, onKeyDown } = data[index];
            return (
              <TableRow
                style={style}
                key={item.file.label}
                onKeyDown={onKeyDown}
                onClick={onClick}
                appearance={appearance}
              >
                <TableSelectionCell tabIndex={0} checkboxIndicator={{ tabIndex: -1 }} checked={selected} />
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
          }}
        </List>
      </TableBody>
    </Table>
  );
};

Virtualization.parameters = {
  docs: {
    description: {
      story: [
        '> Semantic `<table>` elements have are subject to strict layouting by the browser and are not suited',
        'to virtualization in general. Use the `noNativeElements` prop to use a flexbox based layout that will',
        'make virtualization a lot easier.',
        '',
        'The `Table` primitive components are unopinionated with respect to virtualization. They should be compatible',
        'with any virtualization library. Hoisting business logic to a state management',
        'hook like `useTableFeaturesFeautres',
        'means that features can persist between the mounting/unmounting that happens during virtualization.',
        'The below example uses the [react-window](https://www.npmjs.com/package/react-window) library.',
      ].join('\n'),
    },
  },
};
