import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  ArrowUpRegular,
  ArrowDownRegular,
  MoreHorizontalRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  makeStyles,
  tokens,
  Field,
  SpinButton,
  useTableFeatures,
  useTableSelection,
  useTableCompositeNavigation,
  useTableSort,
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuPopover,
  TableCellActions,
  tableCellActionsClassNames,
  mergeClasses,
  MenuItemRadio,
  TableRowData,
  TableRowId,
  TableColumnId,
  TableSelectionCell,
  TableSelectionCellProps,
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
} from '@fluentui/react-components';

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

const generateTimestamp = (): number => {
  const randomHour = Math.floor(Math.random() * 72); // Up to 72 hours
  return Date.now() - randomHour * 3600000; // Return timestamp in milliseconds
};

// Helper function to generate random status
const generateStatus = (): 'available' | 'busy' | 'away' | 'offline' => {
  const statuses: ('available' | 'busy' | 'away' | 'offline')[] = ['available', 'busy', 'away', 'offline'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper function to generate random labels for file and author
const generateRandomLabel = (): string => {
  const randomNames = ['Max Mustermann', 'Erika Mustermann', 'John Doe', 'Jane Doe', 'Alice Smith', 'Bob Johnson'];
  const randomFileNames = [
    'Meeting notes',
    'Thursday presentation',
    'Training recording',
    'Purchase order',
    'Project plan',
    'Annual report',
  ];

  return Math.random() > 0.5
    ? randomNames[Math.floor(Math.random() * randomNames.length)]
    : randomFileNames[Math.floor(Math.random() * randomFileNames.length)];
};

// Main function to generate test data
const generateTestData = (numItems: number): Item[] => {
  const items: Item[] = [];
  for (let i = 0; i < numItems; i++) {
    const authorStatus = generateStatus();
    const lastUpdatedTimestamp = generateTimestamp();

    items.push({
      file: {
        label: generateRandomLabel(),
        // eslint-disable-next-line react/jsx-key
        icon: [<DocumentRegular />, <FolderRegular />, <VideoRegular />, <DocumentPdfRegular />][
          Math.floor(Math.random() * 4)
        ], // Random icon
      },
      author: {
        label: generateRandomLabel(),
        status: authorStatus,
      },
      lastUpdated: {
        label: `${Math.floor(Math.random() * 24)}h ago`, // Random label for simplicity
        timestamp: lastUpdatedTimestamp,
      },
      lastUpdate: {
        label: Math.random() > 0.5 ? 'You edited this' : 'You shared this in a Teams chat', // Random last update label
        icon: Math.random() > 0.5 ? <EditRegular /> : <PeopleRegular />, // Random icon
      },
    });
  }

  return items;
};

const items = generateTestData(30);

// const items: Item[] = [
//   {
//     file: { label: 'Meeting notes', icon: <DocumentRegular /> },
//     author: { label: 'Max Mustermann', status: 'available' },
//     lastUpdated: { label: '7h ago', timestamp: 1 },
//     lastUpdate: {
//       label: 'You edited this',
//       icon: <EditRegular />,
//     },
//   },
//   {
//     file: { label: 'Thursday presentation', icon: <FolderRegular /> },
//     author: { label: 'Erika Mustermann', status: 'busy' },
//     lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
//     lastUpdate: {
//       label: 'You recently opened this',
//       icon: <OpenRegular />,
//     },
//   },
//   {
//     file: { label: 'Training recording', icon: <VideoRegular /> },
//     author: { label: 'John Doe', status: 'away' },
//     lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
//     lastUpdate: {
//       label: 'You recently opened this',
//       icon: <OpenRegular />,
//     },
//   },
//   {
//     file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
//     author: { label: 'Jane Doe', status: 'offline' },
//     lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
//     lastUpdate: {
//       label: 'You shared this in a Teams chat',
//       icon: <PeopleRegular />,
//     },
//   },
// ];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return (
        <>
          <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
          <TableCellActions>
            <Button icon={<EditRegular />} appearance="subtle" aria-label="Edit" />
            <Button icon={<MoreHorizontalRegular />} appearance="subtle" aria-label="More actions" />
          </TableCellActions>
        </>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

const useStyles = makeStyles({
  headerCell: {
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeBase200,
  },

  resizableArea: {
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '20px 10px 10px 10px',
    position: 'relative',
    resize: 'horizontal',
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },

  grid: {
    gridArea: 'rows',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  row: {
    display: 'flex',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    ':hover': {
      [`& .${tableCellActionsClassNames.root}`]: {
        opacity: 1,
      },
    },
    ':focus-within': {
      [`& .${tableCellActionsClassNames.root}`]: {
        opacity: 1,
      },
    },
  },

  selectionIndicator: {
    paddingRight: '12px',
    paddingLeft: '8px',
    marginRight: '8px',
    paddingTop: '8px',
  },

  headerSelectionIndicator: {
    paddingRight: '12px',
    paddingLeft: '8px',
    marginRight: '8px',
  },

  cells: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '5px',
    paddingBottom: '5px',
    boxSizing: 'border-box',
    flexGrow: 1,
  },

  aside: {
    gridArea: 'aside',
  },

  header: {
    display: 'flex',
  },

  cellContent: {
    position: 'relative',
  },

  cell: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },

  cellBorder: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  resetButton: {
    resize: 'horizontal',
    boxSizing: 'content-box',
    backgroundColor: 'inherit',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',
    padding: '0',
    border: 'none',
    textAlign: 'unset',
  },

  sortButton: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  sortIcon: {
    fontSize: tokens.fontSizeBase500,
  },
});

export const Reflow = () => {
  const styles = useStyles();
  const [width, setWidth] = React.useState(801);
  const [reflowWidth, setReflowWidth] = React.useState(800);
  const [reflowing, setReflowing] = React.useState(false);

  const ref = React.useMemo(() => {
    let resizeObserver: ResizeObserver | null = null;
    return (node: HTMLDivElement) => {
      if (!node) {
        resizeObserver?.disconnect();
        return;
      }

      resizeObserver = new ResizeObserver(entries => {
        const [entry] = entries;

        if (entry.contentRect.width <= reflowWidth) {
          setReflowing(true);
        } else {
          setReflowing(false);
        }
      });

      resizeObserver.observe(node);
    };
  }, [reflowWidth]);

  return (
    <>
      <Field label="Width in pixels">
        <SpinButton
          value={width}
          onChange={(e, data) => (data.value ? setWidth(Number(data.value)) : setWidth(Number(data.displayValue)))}
        />
      </Field>
      <Field label="Reflow width in pixels">
        <SpinButton
          value={reflowWidth}
          onChange={(e, data) =>
            data.value ? setReflowWidth(Number(data.value)) : setReflowWidth(Number(data.displayValue))
          }
        />
      </Field>
      <br />
      <div className={styles.resizableArea} style={{ width }} ref={ref}>
        {reflowing ? <ReflowScenario /> : <StandardScenario />}
      </div>
    </>
  );
};

const StandardScenario = () => {
  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      selectionMode="multiselect"
      getRowId={item => item.file.label}
      focusMode="composite"
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow selectionCell={{ checkboxIndicator: { 'aria-label': 'Select all rows' } }}>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item> key={rowId} selectionCell={{ checkboxIndicator: { 'aria-label': 'Select row' } }}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};

const ReflowScenario = () => {
  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
    sort: { sortColumn, sortDirection, toggleColumnSort, sort },
  } = useTableFeatures<Item>(
    {
      columns,
      items,
    },
    [
      useTableSelection<Item>({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),

      useTableSort<Item>({
        defaultSortState: {
          sortColumn: 'file',
          sortDirection: 'ascending',
        },
      }),
    ],
  );

  const rows = getRows(row => {
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

  const sortedRows = sort(rows);

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows],
  );

  const { onTableKeyDown, tableRowTabsterAttribute, tableTabsterAttribute } = useTableCompositeNavigation();
  const styles = useStyles();

  return (
    <>
      <ReflowGrid onKeyDown={onTableKeyDown} {...tableTabsterAttribute}>
        <ReflowHeader
          allRowsSelected={allRowsSelected}
          someRowsSelected={someRowsSelected}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          toggleAllKeydown={toggleAllKeydown}
          toggleAllRows={toggleAllRows}
          toggleColumnSort={toggleColumnSort}
        />
        <ReflowBody>
          {sortedRows.map(row => (
            <>
              <ReflowRow
                isRowSelected={isRowSelected}
                tableRowTabsterAttribute={tableRowTabsterAttribute}
                row={row}
                key={row.rowId}
              >
                {columns.map((column, i) => (
                  <ReflowCell
                    key={column.columnId}
                    column={column}
                    row={row}
                    className={mergeClasses(styles.cell, i < columns.length - 1 && styles.cellBorder)}
                  />
                ))}
              </ReflowRow>
            </>
          ))}
        </ReflowBody>
      </ReflowGrid>
    </>
  );
};

const ReflowGrid: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  return <div {...props}>{props.children}</div>;
};

const ReflowBody: React.FC = props => {
  const styles = useStyles();
  return <div className={styles.grid}>{props.children}</div>;
};

const ReflowSelectionCell: React.FC<TableSelectionCellProps> = props => {
  return <TableSelectionCell {...props} />;
};

const ReflowHeaderSortButton = React.forwardRef<
  HTMLButtonElement,
  {
    sortColumn: TableColumnId | undefined;
    sortDirection: 'ascending' | 'descending' | undefined;
  }
>((props, ref) => {
  const { sortColumn, sortDirection, ...rest } = props;
  const styles = useStyles();
  return (
    <button ref={ref} className={mergeClasses(styles.resetButton, styles.sortButton)} {...rest}>
      Sorted by {columns.find(x => x.columnId === sortColumn)?.renderHeaderCell()}
      <span className={styles.sortIcon}>
        {sortDirection === 'ascending' ? <ArrowUpRegular /> : <ArrowDownRegular />}
      </span>
    </button>
  );
});

const ReflowHeader: React.FC<{
  toggleAllRows: () => void;
  toggleAllKeydown: () => void;
  someRowsSelected: boolean;
  allRowsSelected: boolean;
  sortColumn: TableColumnId | undefined;
  sortDirection: 'ascending' | 'descending' | undefined;
  toggleColumnSort: (e: React.MouseEvent, columnId: TableColumnId) => void;
}> = props => {
  const styles = useStyles();
  const {
    toggleAllRows,
    toggleAllKeydown,
    someRowsSelected,
    allRowsSelected,
    sortColumn,
    sortDirection,
    toggleColumnSort,
  } = props;
  return (
    <div className={styles.header}>
      <ReflowSelectionCell
        checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
        onClick={toggleAllRows}
        onKeyDown={toggleAllKeydown}
        className={styles.headerSelectionIndicator}
      />
      <Menu defaultCheckedValues={{ sort: [sortColumn?.toString() ?? ''] }}>
        <MenuTrigger>
          <ReflowHeaderSortButton sortColumn={sortColumn} sortDirection={sortDirection} />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {columns.map(column => (
              <MenuItemRadio
                name="sort"
                value={column.columnId.toString()}
                key={column.columnId}
                onClick={e => toggleColumnSort(e, column.columnId)}
              >
                {column.renderHeaderCell()}
              </MenuItemRadio>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

const ReflowRow: React.FC<{
  row: TableRowData<Item> & { onClick: React.MouseEventHandler };
  tableRowTabsterAttribute: { 'data-tabster': string | undefined };
  children: React.ReactNode;
  isRowSelected: (rowId: TableRowId) => boolean;
}> = props => {
  const styles = useStyles();
  const { children, row, tableRowTabsterAttribute, isRowSelected } = props;
  return (
    <div className={styles.row} {...tableRowTabsterAttribute} tabIndex={0}>
      <ReflowSelectionCell
        checked={isRowSelected(row.rowId)}
        onClick={row.onClick}
        className={styles.selectionIndicator}
      />
      <div className={styles.cells}>{children}</div>
    </div>
  );
};

const ReflowCell: React.FC<{
  className: string;
  column: TableColumnDefinition<Item>;
  row: TableRowData<Item>;
}> = props => {
  const styles = useStyles();
  const { className, column, row } = props;

  return (
    <div tabIndex={0} className={className}>
      <div className={styles.headerCell}>{column.renderHeaderCell(row.item)}</div>
      <div className={styles.cellContent}>{column.renderCell(row.item)}</div>
    </div>
  );
};
