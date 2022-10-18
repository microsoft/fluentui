import * as React from 'react';
import { useTable_unstable, useTableStyles_unstable, renderTable_unstable } from '@fluentui/react-table';
import type { TableProps } from '@fluentui/react-table';
import { useTableContextValues_unstable } from '../../components/Table/useTableContextValues';
import { TableBodyProps } from '../../components/TableBody/TableBody.types';
import { useTableBody_unstable } from '../../components/TableBody/useTableBody';
import { useTableBodyStyles_unstable } from '../../components/TableBody/useTableBodyStyles';
import { renderTableBody_unstable } from '../../components/TableBody/renderTableBody';
import { TableHeaderProps } from '../../components/TableHeader/TableHeader.types';
import { useTableHeader_unstable } from '../../components/TableHeader/useTableHeader';
import { useTableHeaderStyles_unstable } from '../../components/TableHeader/useTableHeaderStyles';
import { renderTableHeader_unstable } from '../../components/TableHeader/renderTableHeader';
import { TableRowProps } from '../../components/TableRow/TableRow.types';
import { useTableRow_unstable } from '../../components/TableRow/useTableRow';
import { useTableRowStyles_unstable } from '../../components/TableRow/useTableRowStyles';
import { renderTableRow_unstable } from '../../components/TableRow/renderTableRow';
import { TableCellProps } from '../../components/TableCell/TableCell.types';
import { useTableCell_unstable } from '../../components/TableCell/useTableCell';
import { useTableCellStyles_unstable } from '../../components/TableCell/useTableCellStyles';
import { renderTableCell_unstable } from '../../components/TableCell/renderTableCell';
import { TableSelectionCellProps } from '../../components/TableSelectionCell/TableSelectionCell.types';
import { useTableSelectionCell_unstable } from '../../components/TableSelectionCell/useTableSelectionCell';
import { useTableSelectionCellStyles_unstable } from '../../components/TableSelectionCell/useTableSelectionCellStyles';
import { renderTableSelectionCell_unstable } from '../../components/TableSelectionCell/renderTableSelectionCell';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import { PresenceBadgeStatus, Avatar, useMergedRefs } from '@fluentui/react-components';
import { TableCellLayoutProps } from '../../components/TableCellLayout/TableCellLayout.types';
import { useTableCellLayout_unstable } from '../../components/TableCellLayout/useTableCellLayout';
import { useTableCellLayoutStyles_unstable } from '../../components/TableCellLayout/useTableCellLayoutStyles';
import { renderTableCellLayout_unstable } from '../../components/TableCellLayout/renderTableCellLayout';
import { useSelection } from '../../hooks/useSelection';
import { useTable } from '../../hooks/useTable';
import { useTableCellLayoutContextValues_unstable } from '../../components/TableCellLayout/useTableCellLayoutContextValues';
import { TableHeaderCellProps } from '../../components/TableHeaderCell/TableHeaderCell.types';
import { useTableHeaderCellStyles_unstable } from '../../components/TableHeaderCell/useTableHeaderCellStyles';
import { renderTableHeaderCell_unstable } from '../../components/TableHeaderCell/renderTableHeaderCell';
import { useTableHeaderCell_unstable } from '../../components/TableHeaderCell/useTableHeaderCell';
import {
  ColumnDefinition,
  ColumnId,
  RowId,
  SortState,
  TableSortState,
  TableState,
  UseTableOptions,
} from '../../hooks/types';
import { useNavigationMode } from '../../navigationModes/useNavigationMode';
import { createContext } from '../../../../react-context-selector/src/createContext';
import { useContextSelector } from '../../../../react-context-selector/src/useContextSelector';
import { ContextSelector } from '../../../../react-context-selector/src/types';
import { useSort } from '../../hooks/useSort';

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

export const DataGridExample = () => {
  const [sortState, setSortState] = React.useState<SortState>({ sortColumn: 'file', sortDirection: 'ascending' });
  const [selected, setSelected] = React.useState<RowId[]>([]);

  // 2. virtualization by default (react-)
  // 3. port column resizing prototype here - what codechanges are required on consumer side ?
  // 4. columns render function - should treat selection cell as column ?
  // 5. prototype column reordering - headless table too
  // 6. How to do lazy loading with DetailsList?
  // 7. prototype lazy loading in DataGrid/useTable
  // 1. PRs DataGrid

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectedRows={selected}
      sortState={sortState}
      onSortChange={setSortState}
      onSelectionChange={setSelected}
    >
      <DataGridHeader>
        <DataGridRow>
          <DataGridSelectionCell />
          <DataGridHeaderCell columnId="file">File</DataGridHeaderCell>
          <DataGridHeaderCell columnId="author">Author</DataGridHeaderCell>
          <DataGridHeaderCell columnId="lastUpdated">Last updated</DataGridHeaderCell>
          <DataGridHeaderCell columnId="lastUpdate">Last update</DataGridHeaderCell>
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody>
        {(item: Item) => (
          <DataGridRow key={item.file.label}>
            <DataGridSelectionCell />
            <DataGridCell>
              <DataGridCellLayout media={item.file.icon}>{item.file.label}</DataGridCellLayout>
            </DataGridCell>
            <DataGridCell>
              <DataGridCellLayout media={<Avatar badge={{ status: item.author.status }} />}>
                {item.author.label}
              </DataGridCellLayout>
            </DataGridCell>
            <DataGridCell>{item.lastUpdated.label}</DataGridCell>
            <DataGridCell>
              <DataGridCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</DataGridCellLayout>
            </DataGridCell>
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};

const DataGrid: React.FC<DataGridProps> = props => {
  const tableState = useTable(
    {
      columns,
      items,
    },
    [
      useSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set(props.defaultSelectedRows),
        selectedItems: new Set(props.selectedRows),
        onSelectionChange: props.onSelectionChange,
      }),
      useSort({
        sortState: props.sortState,
        defaultSortState: props.defaultSortState,
        onSortChange: props.onSortChange,
      }),
    ],
  );
  // eslint-disable-next-line deprecation/deprecation
  const navigationRef = useNavigationMode('cell');
  const ref = React.useRef<HTMLDivElement>(null);
  let componentState = useTable_unstable(
    { ...props, noNativeElements: true, role: 'grid' },
    useMergedRefs(ref, navigationRef),
  );
  componentState = useTableStyles_unstable(componentState);
  const contextValues = useTableContextValues_unstable(componentState);

  const Provider = DataGridContext.Provider;

  return (
    <Provider value={{ items, state: tableState }}> {renderTable_unstable(componentState, contextValues)}</Provider>
  );
};

const DataGridBody: React.FC<DataGridBodyProps> = props => {
  const ref = React.useRef<HTMLDivElement>(null);
  const getRows = useDataGridContext(ctx => ctx.state.getRows);
  const sort = useDataGridContext(ctx => ctx.state.sort.sort);
  const rows = sort(getRows());
  const childItems = rows.map((row, i) => (
    <DataGridRowContext.Provider key={i} value={i}>
      {props.children(row.item)}
    </DataGridRowContext.Provider>
  ));
  let componentState = useTableBody_unstable({ ...props, children: childItems }, ref);
  componentState = useTableBodyStyles_unstable(componentState);

  return renderTableBody_unstable(componentState);
};

const DataGridHeader: React.FC<DataGridHeaderProps> = props => {
  const ref = React.useRef<HTMLDivElement>(null);
  let componentState = useTableHeader_unstable(props, ref);
  componentState = useTableHeaderStyles_unstable(componentState);

  return (
    <DataGridHeaderContext.Provider value={true}>
      {renderTableHeader_unstable(componentState)}
    </DataGridHeaderContext.Provider>
  );
};

const DataGridRow: React.FC<DataGridRowProps> = props => {
  const isInHeader = React.useContext(DataGridHeaderContext);
  const rowId = React.useContext(DataGridRowContext) ?? '';
  const checked = useDataGridContext(ctx => ctx.state.selection.isRowSelected(rowId));
  const toggleRow = useDataGridContext(ctx => ctx.state.selection.toggleRow);
  const ref = React.useRef<HTMLDivElement>(null);
  const onClick = () => toggleRow(rowId);
  const onKeyDown = (e: React.KeyboardEvent) => e.key === ' ' && toggleRow(rowId);
  const rowProps = !isInHeader
    ? {
        'aria-selected': checked,
        onClick,
        onKeyDown,
      }
    : {};

  let componentState = useTableRow_unstable({ ...props, ...rowProps }, ref);
  componentState = useTableRowStyles_unstable(componentState);

  return renderTableRow_unstable(componentState);
};

const DataGridCell: React.FC<DataGridCellProps> = props => {
  const ref = React.useRef<HTMLDivElement>(null);
  let componentState = useTableCell_unstable({ ...props, role: 'gridcell', tabIndex: 0 }, ref);
  componentState = useTableCellStyles_unstable(componentState);

  return renderTableCell_unstable(componentState);
};

const DataGridHeaderCell: React.FC<DataGridHeaderCellProps> = props => {
  const sortDirection = useDataGridContext(ctx => ctx.state.sort.getSortDirection(props.columnId));
  const toggleColumnSort = useDataGridContext(ctx => ctx.state.sort.toggleColumnSort);
  const ref = React.useRef<HTMLDivElement>(null);
  const onClick = () => toggleColumnSort(props.columnId);

  let componentState = useTableHeaderCell_unstable({ ...props, sortDirection, onClick }, ref);
  componentState = useTableHeaderCellStyles_unstable(componentState);

  return renderTableHeaderCell_unstable(componentState);
};

const DataGridSelectionCell: React.FC<DataGridSelectionCellProps> = props => {
  const isInHeader = React.useContext(DataGridHeaderContext);
  const rowId = React.useContext(DataGridRowContext) ?? '';
  const checked = useDataGridContext(ctx => {
    if (isInHeader) {
      return ctx.state.selection.allRowsSelected ? true : 'mixed';
    }

    return ctx.state.selection.isRowSelected(rowId);
  });
  const ref = React.useRef<HTMLDivElement>(null);
  let componentState = useTableSelectionCell_unstable(
    { ...props, tabIndex: 0, checked, checkboxIndicator: { tabIndex: -1 } },
    ref,
  );
  componentState = useTableSelectionCellStyles_unstable(componentState);

  return renderTableSelectionCell_unstable(componentState);
};

const DataGridCellLayout: React.FC<DataGridCellLayoutProps> = props => {
  const ref = React.useRef<HTMLDivElement>(null);
  let componentState = useTableCellLayout_unstable(props, ref);
  componentState = useTableCellLayoutStyles_unstable(componentState);

  return renderTableCellLayout_unstable(componentState, useTableCellLayoutContextValues_unstable(componentState));
};

const DataGridContext = createContext<DataGridContextValue | undefined>(undefined);
export const useDataGridContext = <T,>(selector: ContextSelector<DataGridContextValue, T>) =>
  useContextSelector(DataGridContext, (ctx = dataGridContextDefaultValue) => selector(ctx));

// @ts-expect-error - prototype
const dataGridContextDefaultValue: DataGridContextValue = { items: [], state: {} };

interface DataGridContextValue {
  items: unknown[];
  state: TableState<unknown>;
}

const DataGridRowContext = React.createContext<RowId | undefined>(undefined);

const DataGridHeaderContext = React.createContext<boolean | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataGridProps = TableProps & {
  items: any[];
  columns: ColumnDefinition<any>[];
  sortState?: SortState;
  defaultSortState?: SortState;
  onSelectionChange?: UseTableOptions['onSelectionChange'];
  onSortChange?: UseTableOptions['onSortChange'];
  selectedRows?: RowId[];
  defaultSelectedRows?: RowId[];
};
type DataGridCellLayoutProps = TableCellLayoutProps & {};
type DataGridSelectionCellProps = TableSelectionCellProps & {};
type DataGridHeaderCellProps = TableHeaderCellProps & { columnId: ColumnId };
type DataGridCellProps = TableCellProps & {};
type DataGridRowProps = TableRowProps & {};
type DataGridHeaderProps = TableHeaderProps & {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataGridBodyProps = Omit<TableBodyProps, 'children'> & { children: (item: any) => React.ReactNode };
