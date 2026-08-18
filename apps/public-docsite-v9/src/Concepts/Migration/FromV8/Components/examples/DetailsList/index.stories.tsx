import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Badge,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSelectionCell,
  Text,
  createTableColumn,
  makeStyles,
  tokens,
  useTableColumnSizing_unstable,
  useTableCompositeNavigation,
  useTableFeatures,
  useTableSelection,
  useTableSort,
} from '@fluentui/react-components';
import type {
  BadgeProps,
  DataGridProps,
  TableColumnDefinition,
  TableColumnSizingOptions,
  TableRowId,
} from '@fluentui/react-components';

import { DetailsList, CheckboxVisibility, DetailsListLayoutMode } from '@fluentui/react/lib/DetailsList';
import type { IColumn } from '@fluentui/react/lib/DetailsList';
import { Selection, SelectionMode } from '@fluentui/react/lib/Selection';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/DetailsList Migration',
  parameters: { docs: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type MigrationRow = {
  key: string;
  fileName: string;
  owner: string;
  status: {
    color: BadgeProps['color'];
    label: string;
  };
  updated: {
    label: string;
    sortValue: number;
  };
  notes: string;
};

type SortableColumnKey = 'fileName' | 'owner' | 'updated';

type ControlledSortState = Parameters<NonNullable<DataGridProps['onSortChange']>>[1];

const rows: MigrationRow[] = [
  {
    key: 'proposal',
    fileName: 'Launch proposal',
    owner: 'Adele Vance',
    status: { color: 'warning', label: 'Needs review' },
    updated: { label: 'Today, 9:15 AM', sortValue: 3 },
    notes: 'Waiting on privacy sign-off.',
  },
  {
    key: 'brief',
    fileName: 'Release brief',
    owner: 'Isaac Levin',
    status: { color: 'success', label: 'Approved' },
    updated: { label: 'Yesterday, 2:30 PM', sortValue: 2 },
    notes: 'Ready to publish to internal teams.',
  },
  {
    key: 'retro',
    fileName: 'Sprint retro',
    owner: 'Megan Bowen',
    status: { color: 'informative', label: 'Draft' },
    updated: { label: 'Mon, 10:00 AM', sortValue: 1 },
    notes: 'Collect action items before Friday.',
  },
];

const columnLabels: Record<string, string> = {
  fileName: 'File',
  owner: 'Owner',
  status: 'Status',
  updated: 'Last updated',
  notes: 'Notes',
};

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalL,
  },
  section: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  summary: {
    color: tokens.colorNeutralForeground3,
  },
  headerContainer: {
    display: 'grid',
    rowGap: tokens.spacingVerticalXXS,
  },
  headerHint: {
    color: tokens.colorNeutralForeground3,
  },
});

const renderStatusBadge = (item: MigrationRow) => (
  <Badge appearance="tint" color={item.status.color}>
    {item.status.label}
  </Badge>
);

const compareRows: Record<SortableColumnKey, (left: MigrationRow, right: MigrationRow) => number> = {
  fileName: (left, right) => left.fileName.localeCompare(right.fileName),
  owner: (left, right) => left.owner.localeCompare(right.owner),
  updated: (left, right) => left.updated.sortValue - right.updated.sortValue,
};

const createV8Columns = (
  sortState?: { columnKey: SortableColumnKey; descending: boolean },
  onColumnClick?: (event?: React.MouseEvent<HTMLElement>, column?: IColumn) => void,
): IColumn[] => [
  {
    key: 'fileName',
    name: 'File',
    fieldName: 'fileName',
    minWidth: 180,
    maxWidth: 240,
    isResizable: true,
    isSorted: sortState?.columnKey === 'fileName',
    isSortedDescending: sortState?.columnKey === 'fileName' ? sortState.descending : undefined,
    onColumnClick,
  },
  {
    key: 'owner',
    name: 'Owner',
    fieldName: 'owner',
    minWidth: 160,
    maxWidth: 220,
    isResizable: true,
    isSorted: sortState?.columnKey === 'owner',
    isSortedDescending: sortState?.columnKey === 'owner' ? sortState.descending : undefined,
    onColumnClick,
  },
  {
    key: 'status',
    name: 'Status',
    fieldName: 'status',
    minWidth: 150,
    maxWidth: 190,
    isResizable: true,
  },
  {
    key: 'updated',
    name: 'Last updated',
    fieldName: 'updated',
    minWidth: 170,
    maxWidth: 210,
    isResizable: true,
    isSorted: sortState?.columnKey === 'updated',
    isSortedDescending: sortState?.columnKey === 'updated' ? sortState.descending : undefined,
    onColumnClick,
  },
  {
    key: 'notes',
    name: 'Notes',
    fieldName: 'notes',
    minWidth: 220,
    maxWidth: 320,
    isResizable: true,
  },
];

const dataGridColumns: TableColumnDefinition<MigrationRow>[] = [
  createTableColumn<MigrationRow>({
    columnId: 'fileName',
    compare: compareRows.fileName,
    renderHeaderCell: () => columnLabels.fileName,
    renderCell: item => <TableCellLayout truncate>{item.fileName}</TableCellLayout>,
  }),
  createTableColumn<MigrationRow>({
    columnId: 'owner',
    compare: compareRows.owner,
    renderHeaderCell: () => columnLabels.owner,
    renderCell: item => item.owner,
  }),
  createTableColumn<MigrationRow>({
    columnId: 'status',
    renderHeaderCell: () => columnLabels.status,
    renderCell: item => renderStatusBadge(item),
  }),
  createTableColumn<MigrationRow>({
    columnId: 'updated',
    compare: compareRows.updated,
    renderHeaderCell: () => columnLabels.updated,
    renderCell: item => item.updated.label,
  }),
  createTableColumn<MigrationRow>({
    columnId: 'notes',
    renderHeaderCell: () => columnLabels.notes,
    renderCell: item => item.notes,
  }),
];

const V8BasicExample = () => {
  return <DetailsList items={rows} columns={createV8Columns()} setKey="basic" />;
};

const V9BasicExample = () => {
  return (
    <Table aria-label="Semantic document table">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>{columnLabels.fileName}</TableHeaderCell>
          <TableHeaderCell>{columnLabels.owner}</TableHeaderCell>
          <TableHeaderCell>{columnLabels.status}</TableHeaderCell>
          <TableHeaderCell>{columnLabels.updated}</TableHeaderCell>
          <TableHeaderCell>{columnLabels.notes}</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(item => (
          <TableRow key={item.key}>
            <TableCell>
              <TableCellLayout truncate>{item.fileName}</TableCellLayout>
            </TableCell>
            <TableCell>{item.owner}</TableCell>
            <TableCell>{renderStatusBadge(item)}</TableCell>
            <TableCell>{item.updated.label}</TableCell>
            <TableCell>{item.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const V9DataGridAlternativeExample = () => {
  return (
    <DataGrid items={rows} columns={dataGridColumns} focusMode="composite" aria-label="Integrated grid behaviors">
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<MigrationRow>>
        {({ item, rowId }) => (
          <DataGridRow<MigrationRow> key={rowId}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};

const V8SelectionExample = () => {
  const styles = useStyles();
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const selection = React.useMemo(() => {
    const nextSelection = new Selection({
      onSelectionChanged: () => {
        setSelectedKeys((nextSelection.getSelection() as MigrationRow[]).map(item => item.key));
      },
    });

    return nextSelection;
  }, []);

  React.useEffect(() => {
    selection.setItems(rows, true);
    selection.setIndexSelected(1, true, false);
  }, [selection]);

  return (
    <div className={styles.section}>
      <DetailsList
        items={rows}
        columns={createV8Columns()}
        getKey={item => item.key}
        selection={selection}
        selectionMode={SelectionMode.multiple}
        setKey="selection"
      />
      <Text className={styles.summary}>Selection.getSelection(): {selectedKeys.join(', ') || 'none'}</Text>
    </div>
  );
};

const V9DataGridSelectionExample = () => {
  const styles = useStyles();
  const [selectedItems, setSelectedItems] = React.useState<Set<TableRowId>>(() => new Set<TableRowId>(['brief']));

  const onSelectionChange: DataGridProps['onSelectionChange'] = (_event, data) => {
    setSelectedItems(data.selectedItems);
  };

  return (
    <div className={styles.section}>
      <DataGrid
        items={rows}
        columns={dataGridColumns}
        getRowId={item => item.key}
        selectionMode="multiselect"
        selectedItems={selectedItems}
        onSelectionChange={onSelectionChange}
        aria-label="Controlled DataGrid selection"
      >
        <DataGridHeader>
          <DataGridRow selectionCell={{ checkboxIndicator: { 'aria-label': 'Select all rows' } }}>
            {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<MigrationRow>>
          {({ item, rowId }) => (
            <DataGridRow<MigrationRow>
              key={rowId}
              selectionCell={{ checkboxIndicator: { 'aria-label': `Select ${item.fileName}` } }}
            >
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
      <Text className={styles.summary}>selectedItems: {Array.from(selectedItems).join(', ') || 'none'}</Text>
    </div>
  );
};

const V8SortingExample = () => {
  const [sortState, setSortState] = React.useState<{ columnKey: SortableColumnKey; descending: boolean }>({
    columnKey: 'updated',
    descending: true,
  });

  const onColumnClick = React.useCallback((_: React.MouseEvent<HTMLElement> | undefined, column?: IColumn) => {
    if (!column) {
      return;
    }

    const columnKey = column.key as SortableColumnKey;
    setSortState(currentState => ({
      columnKey,
      descending: currentState.columnKey === columnKey ? !currentState.descending : false,
    }));
  }, []);

  const sortedRows = React.useMemo(() => {
    const nextRows = [...rows].sort(compareRows[sortState.columnKey]);
    return sortState.descending ? nextRows.reverse() : nextRows;
  }, [sortState]);

  return (
    <DetailsList
      items={sortedRows}
      columns={createV8Columns(sortState, onColumnClick)}
      getKey={item => item.key}
      setKey="sorting"
    />
  );
};

const V9DataGridSortingExample = () => {
  const [sortState, setSortState] = React.useState<ControlledSortState>({
    sortColumn: 'updated',
    sortDirection: 'descending',
  });

  const onSortChange: DataGridProps['onSortChange'] = (_event, nextSortState) => {
    setSortState(nextSortState);
  };

  return (
    <DataGrid
      items={rows}
      columns={dataGridColumns}
      sortable
      sortState={sortState}
      onSortChange={onSortChange}
      getRowId={item => item.key}
      aria-label="Controlled DataGrid sorting"
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<MigrationRow>>
        {({ item, rowId }) => (
          <DataGridRow<MigrationRow> key={rowId}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};

const V8CustomCellExample = () => {
  const styles = useStyles();

  return (
    <DetailsList
      items={rows}
      columns={createV8Columns()}
      onRenderItemColumn={(item, _index, column) => {
        if (!item || !column) {
          return null;
        }

        if (column.key === 'status') {
          return renderStatusBadge(item as MigrationRow);
        }

        if (column.key === 'notes') {
          return <Text className={styles.summary}>{(item as MigrationRow).notes}</Text>;
        }

        return (item as Record<string, React.ReactNode>)[column.fieldName ?? column.key] as React.ReactNode;
      }}
      onRenderDetailsHeader={(headerProps, defaultRender) => {
        if (!headerProps || !defaultRender) {
          return null;
        }

        return (
          <div className={styles.headerContainer}>
            {defaultRender(headerProps)}
            <Text className={styles.headerHint}>Custom v8 render callbacks own the extra header and cell UI.</Text>
          </div>
        );
      }}
      setKey="custom-cell"
    />
  );
};

const V9RenderCellExample = () => {
  const styles = useStyles();
  const customColumns: TableColumnDefinition<MigrationRow>[] = [
    createTableColumn<MigrationRow>({
      columnId: 'fileName',
      renderHeaderCell: () => 'Document',
      renderCell: item => <TableCellLayout truncate>{item.fileName}</TableCellLayout>,
    }),
    createTableColumn<MigrationRow>({
      columnId: 'status',
      renderHeaderCell: () => 'Workflow status',
      renderCell: item => renderStatusBadge(item),
    }),
    createTableColumn<MigrationRow>({
      columnId: 'notes',
      renderHeaderCell: () => 'Migration note',
      renderCell: item => <Text className={styles.summary}>{item.notes}</Text>,
    }),
  ];

  return (
    <DataGrid
      items={rows}
      columns={customColumns}
      getRowId={item => item.key}
      aria-label="Cell composition with renderCell"
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<MigrationRow>>
        {({ item, rowId }) => (
          <DataGridRow<MigrationRow> key={rowId}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};

const V8LayoutAndColumnSizingExample = () => {
  return (
    <DetailsList
      items={rows}
      columns={createV8Columns()}
      compact
      checkboxVisibility={CheckboxVisibility.hidden}
      layoutMode={DetailsListLayoutMode.justified}
      setKey="layout"
    />
  );
};

const V9TableFeatureHooksExample = () => {
  const styles = useStyles();
  const [selectedItems, setSelectedItems] = React.useState<Set<TableRowId>>(() => new Set<TableRowId>(['proposal']));
  const [sortState, setSortState] = React.useState<ControlledSortState>({
    sortColumn: 'updated',
    sortDirection: 'descending',
  });
  const columnSizingOptions = React.useMemo<TableColumnSizingOptions>(
    () => ({
      fileName: { idealWidth: 220, minWidth: 180 },
      owner: { idealWidth: 160, minWidth: 140 },
      status: { idealWidth: 140, minWidth: 120 },
      updated: { idealWidth: 170, minWidth: 150 },
      notes: { idealWidth: 260, minWidth: 220 },
    }),
    [],
  );
  const { tableRowTabsterAttribute, tableTabsterAttribute, onTableKeyDown } = useTableCompositeNavigation();
  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
    selection: { allRowsSelected, someRowsSelected, isRowSelected, toggleAllRows, toggleRow },
    columnSizing_unstable: columnSizing,
    tableRef,
  } = useTableFeatures(
    {
      columns: dataGridColumns,
      items: rows,
      getRowId: item => item.key,
    },
    [
      useTableSort({ sortState, onSortChange: (_event, nextSortState) => setSortState(nextSortState) }),
      useTableSelection({
        selectionMode: 'multiselect',
        selectedItems,
        onSelectionChange: (_event, data) => setSelectedItems(data.selectedItems),
      }),
      useTableColumnSizing_unstable({ columnSizingOptions }),
    ],
  );

  const tableRows = sort(
    getRows(row => {
      const selected = isRowSelected(row.rowId);
      const appearance: 'brand' | 'none' = selected ? 'brand' : 'none';

      return {
        ...row,
        appearance,
        onClick: (event: React.MouseEvent) => toggleRow(event, row.rowId),
        onKeyDown: (event: React.KeyboardEvent) => {
          if (event.key === ' ') {
            event.preventDefault();
            toggleRow(event, row.rowId);
          }
        },
        selected,
      };
    }),
  );

  const onToggleAllKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === ' ') {
        event.preventDefault();
        toggleAllRows(event);
      }
    },
    [toggleAllRows],
  );

  return (
    <div className={styles.section}>
      <Text className={styles.summary}>
        `useTableFeatures` composes sorting, selection, column sizing, and `useTableCompositeNavigation` row or cell
        focus without a one-to-one `DetailsList` prop.
      </Text>
      <Table
        ref={tableRef}
        role="grid"
        noNativeElements
        sortable
        aria-label="Composed Fluent UI v9 table features"
        onKeyDown={onTableKeyDown}
        {...tableTabsterAttribute}
        {...columnSizing.getTableProps()}
      >
        <TableHeader>
          <TableRow>
            <TableSelectionCell
              checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
              onClick={toggleAllRows}
              onKeyDown={onToggleAllKeyDown}
              checkboxIndicator={{ 'aria-label': 'Select all rows' }}
            />
            {dataGridColumns.map(column => (
              <TableHeaderCell
                key={column.columnId}
                tabIndex={0}
                sortDirection={getSortDirection(column.columnId)}
                onClick={event => toggleColumnSort(event, column.columnId)}
                {...columnSizing.getTableHeaderCellProps(column.columnId)}
              >
                {column.renderHeaderCell?.() ?? columnLabels[column.columnId]}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRows.map(({ item, rowId, selected, appearance, onClick, onKeyDown }) => (
            <TableRow
              key={rowId}
              tabIndex={0}
              aria-selected={selected}
              appearance={appearance}
              onClick={onClick}
              onKeyDown={onKeyDown}
              {...tableRowTabsterAttribute}
            >
              <TableSelectionCell checked={selected} checkboxIndicator={{ 'aria-label': `Select ${item.fileName}` }} />
              {dataGridColumns.map(column => (
                <TableCell
                  key={column.columnId}
                  role="gridcell"
                  tabIndex={0}
                  {...columnSizing.getTableCellProps(column.columnId)}
                >
                  {column.renderCell?.(item) ?? null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Text className={styles.summary}>selectedItems: {Array.from(selectedItems).join(', ') || 'none'}</Text>
    </div>
  );
};

export const V8Basic: Story = {
  render: () => <V8BasicExample />,
};

export const V9Basic: Story = {
  render: () => <V9BasicExample />,
};

export const V9DataGridAlternative: Story = {
  render: () => <V9DataGridAlternativeExample />,
};

export const V8Selection: Story = {
  render: () => <V8SelectionExample />,
};

export const V9DataGridSelection: Story = {
  render: () => <V9DataGridSelectionExample />,
};

export const V8Sorting: Story = {
  render: () => <V8SortingExample />,
};

export const V9DataGridSorting: Story = {
  render: () => <V9DataGridSortingExample />,
};

export const V8CustomCell: Story = {
  render: () => <V8CustomCellExample />,
};

export const V9RenderCell: Story = {
  render: () => <V9RenderCellExample />,
};

export const V8LayoutAndColumnSizing: Story = {
  render: () => <V8LayoutAndColumnSizingExample />,
};

export const V9TableFeatureHooks: Story = {
  render: () => <V9TableFeatureHooksExample />,
};
