import * as React from 'react';
import { useTable_unstable, useTableStyles_unstable, renderTable_unstable } from '@fluentui/react-table';
import type { TableProps } from '@fluentui/react-table';
import { useTableContextValues_unstable } from '../../components/Table/useTableContextValues';
import { TableBodyProps, TableBodySlots } from '../../components/TableBody/TableBody.types';
import { useTableBody_unstable } from '../../components/TableBody/useTableBody';
import { useTableBodyStyles_unstable } from '../../components/TableBody/useTableBodyStyles';
import { renderTableBody_unstable } from '../../components/TableBody/renderTableBody';
import { TableHeaderProps } from '../../components/TableHeader/TableHeader.types';
import { useTableHeader_unstable } from '../../components/TableHeader/useTableHeader';
import { useTableHeaderStyles_unstable } from '../../components/TableHeader/useTableHeaderStyles';
import { renderTableHeader_unstable } from '../../components/TableHeader/renderTableHeader';
import { TableRowProps, TableRowSlots } from '../../components/TableRow/TableRow.types';
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
import { PresenceBadgeStatus, Avatar, useMergedRefs, getSlots } from '@fluentui/react-components';
import { TableCellLayoutProps } from '../../components/TableCellLayout/TableCellLayout.types';
import { useTableCellLayout_unstable } from '../../components/TableCellLayout/useTableCellLayout';
import { useTableCellLayoutStyles_unstable } from '../../components/TableCellLayout/useTableCellLayoutStyles';
import { renderTableCellLayout_unstable } from '../../components/TableCellLayout/renderTableCellLayout';
import { useSelection } from '../../hooks/useSelection';
import { useTable } from '../../hooks/useTable';
import { useTableCellLayoutContextValues_unstable } from '../../components/TableCellLayout/useTableCellLayoutContextValues';
import { TableHeaderCellProps, TableHeaderCellSlots } from '../../components/TableHeaderCell/TableHeaderCell.types';
import { useTableHeaderCellStyles_unstable } from '../../components/TableHeaderCell/useTableHeaderCellStyles';
import { useTableHeaderCell_unstable } from '../../components/TableHeaderCell/useTableHeaderCell';
import {
  ColumnDefinition,
  ColumnId,
  RowId,
  RowState,
  SortState,
  TableState,
  UseSelectionOptions,
  UseSortOptions,
} from '../../hooks/types';
import { useNavigationMode } from '../../navigationModes/useNavigationMode';
import { createContext } from '../../../../react-context-selector/src/createContext';
import { useContextSelector } from '../../../../react-context-selector/src/useContextSelector';
import { ContextSelector } from '../../../../react-context-selector/src/types';
import { useSort } from '../../hooks/useSort';
import { useColumnSizing } from '../../hooks/useColumnSizing';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useColumnOrdering } from '../../hooks/useColumnOrdering';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

// 2. virtualization by default (react-)
// 3. port column resizing prototype here - what codechanges are required on consumer side ?
// 4. columns render function - should treat selection cell as column ?
// 5. prototype column reordering - headless table too
// 6. How to do lazy loading with DetailsList?
// 7. prototype lazy loading in DataGrid/useTable
// 1. PRs DataGrid

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

const rawItems: Item[] = [
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

const items: Item[] = [];
for (let i = 0; i < 40; i++) {
  items.push(...rawItems);
}

const columns: ColumnDefinition<Item>[] = [
  {
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeader: () => {
      return 'File';
    },
    renderCell: item => {
      return <DataGridCellLayout media={item.file.icon}>{item.file.label}</DataGridCellLayout>;
    },
  },
  {
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeader: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <DataGridCellLayout media={<Avatar badge={{ status: item.author.status }} />}>
          {item.author.label}
        </DataGridCellLayout>
      );
    },
  },
  {
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeader: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  },
  {
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeader: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <DataGridCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</DataGridCellLayout>;
    },
  },
];

export const DataGridExample = () => {
  const [sortState, setSortState] = React.useState<SortState>({ sortColumn: 'file', sortDirection: 'ascending' });
  const [selected, setSelected] = React.useState<Set<RowId>>(new Set<string>([]));

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectedRows={Array.from(selected)}
      sortState={sortState}
      onSortChange={setSortState}
      onSelectionChange={setSelected}
    >
      <DataGridHeader>
        <DataGridRow>{column => <DataGridHeaderCell>{column.renderHeader?.()}</DataGridHeaderCell>}</DataGridRow>
      </DataGridHeader>
      <DataGridVirtualBody>
        {(item: Item, style) => (
          <DataGridRow style={style}>{column => <DataGridCell>{column.renderCell?.(item)}</DataGridCell>}</DataGridRow>
        )}
      </DataGridVirtualBody>
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
      useColumnSizing(),
      useColumnOrdering(),
    ],
  );

  // eslint-disable-next-line deprecation/deprecation
  const navigationRef = useNavigationMode('cell');
  const ref = React.useRef<HTMLDivElement>(null);
  let componentState = useTable_unstable(
    { ...props, noNativeElements: true, role: 'grid' },
    useMergedRefs(ref, navigationRef, tableState.tableRef),
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
  let children = props.children;
  if (typeof children === 'function') {
    children = rows.map((row, i) => (
      <DataGridRowContext.Provider key={i} value={i}>
        {children(row.item)}
      </DataGridRowContext.Provider>
    ));
  }
  let componentState = useTableBody_unstable({ ...props, children }, ref);
  componentState = useTableBodyStyles_unstable(componentState);

  return renderTableBody_unstable(componentState);
};

const DataGridHeader: React.FC<DataGridHeaderProps> = props => {
  const ref = React.useRef<HTMLDivElement>(null);
  const moveColumn = useDataGridContext(ctx => ctx.state.columnOrdering.moveColumn);
  const tableColumns = useDataGridContext(ctx => ctx.state.columns);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const next = tableColumns.findIndex(col => col.columnId === over?.id);
      moveColumn(next, active.id);
    }
  };

  let componentState = useTableHeader_unstable(props, ref);
  componentState = useTableHeaderStyles_unstable(componentState);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tableColumns.map(col => col.columnId)} strategy={verticalListSortingStrategy}>
        <DataGridHeaderContext.Provider value={true}>
          {renderTableHeader_unstable(componentState)}
        </DataGridHeaderContext.Provider>
      </SortableContext>
    </DndContext>
  );
};

const DataGridRow: React.FC<DataGridRowProps> = props => {
  const isInHeader = React.useContext(DataGridHeaderContext);
  const contextRowId = React.useContext(DataGridRowContext);
  const rowId = props.rowId ?? contextRowId ?? '';
  const checked = useDataGridContext(ctx => ctx.state.selection.isRowSelected(rowId));
  const toggleRow = useDataGridContext(ctx => ctx.state.selection.toggleRow);
  const columnDefs = useDataGridContext(ctx => ctx.state.columns);
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

  let children = props.children;
  if (typeof children === 'function') {
    children = columnDefs.map(columnDef => (
      <DataGridCellContext.Provider value={columnDef.columnId} key={columnDef.columnId}>
        {children(columnDef)}
      </DataGridCellContext.Provider>
    ));
  }

  let componentState = useTableRow_unstable({ ...props, ...rowProps, children }, ref);
  componentState = useTableRowStyles_unstable(componentState);

  const { slots, slotProps } = getSlots<TableRowSlots>(componentState);

  return (
    <slots.root {...slotProps.root}>
      <DataGridSelectionCell />
      {slotProps.root.children}
    </slots.root>
  );
};

const DataGridCell: React.FC<DataGridCellProps> = props => {
  const contextColumnId = React.useContext(DataGridCellContext);
  const columnId = props.columnId ?? contextColumnId;
  const ref = React.useRef<HTMLDivElement>(null);
  const getColumnWidth = useDataGridContext(ctx => ctx.state.columnSizing.getColumnWidth);
  const columnStyles = {
    minWidth: columnId ? getColumnWidth(columnId) : undefined,
    maxWidth: columnId ? getColumnWidth(columnId) : undefined,
  };
  let componentState = useTableCell_unstable(
    { ...props, role: 'gridcell', tabIndex: 0, style: { ...columnStyles } },
    ref,
  );
  componentState = useTableCellStyles_unstable(componentState);

  return renderTableCell_unstable(componentState);
};

const DataGridHeaderCell: React.FC<DataGridHeaderCellProps> = props => {
  const contextColumnId = React.useContext(DataGridCellContext);
  const columnId = props.columnId ?? contextColumnId;
  const sortDirection = useDataGridContext(ctx => (columnId ? ctx.state.sort.getSortDirection(columnId) : undefined));
  const toggleColumnSort = useDataGridContext(ctx => ctx.state.sort.toggleColumnSort);
  const getColumnWidth = useDataGridContext(ctx => ctx.state.columnSizing.getColumnWidth);
  const getOnMouseDown = useDataGridContext(ctx => ctx.state.columnSizing.getOnMouseDown);
  const ref = React.useRef<HTMLDivElement>(null);
  const onClick = () => columnId && toggleColumnSort(columnId);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: columnId });

  const dragStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const columnStyles = {
    minWidth: columnId ? getColumnWidth(columnId) : undefined,
    maxWidth: columnId ? getColumnWidth(columnId) : undefined,
  };

  let componentState = useTableHeaderCell_unstable(
    { ...props, sortDirection, onClick, style: { ...columnStyles, ...dragStyles }, ...attributes, ...listeners },
    useMergedRefs(ref, setNodeRef),
  );

  componentState = useTableHeaderCellStyles_unstable(componentState);

  const { slots, slotProps } = getSlots<TableHeaderCellSlots>(componentState);

  return (
    <slots.root {...slotProps.root}>
      <slots.button {...slotProps.button} style={{ position: 'relative' }}>
        {slotProps.root.children}
        {slots.sortIcon && <slots.sortIcon {...slotProps.sortIcon} />}
        <div
          onPointerDown={e => e.stopPropagation()}
          onMouseDown={columnId ? getOnMouseDown(columnId) : () => null}
          style={{
            borderRight: '2px solid red',
            height: '100%',
            cursor: 'w-resize',
            paddingLeft: 4,
            paddingRight: 4,
            position: 'absolute',
            right: -8,
          }}
        />
      </slots.button>
    </slots.root>
  );
};

const DataGridSelectionCell: React.FC<DataGridSelectionCellProps> = props => {
  const isInHeader = React.useContext(DataGridHeaderContext);
  const rowId = React.useContext(DataGridRowContext) ?? '';
  const checked = useDataGridContext(ctx => {
    if (isInHeader) {
      return ctx.state.selection.allRowsSelected ? true : ctx.state.selection.someRowsSelected ? 'mixed' : false;
    }

    return ctx.state.selection.isRowSelected(rowId);
  });
  const toggleAll = useDataGridContext(ctx => {
    return ctx.state.selection.toggleAllRows;
  });

  const onClick = () => {
    if (isInHeader) {
      toggleAll();
    }
  };
  const ref = React.useRef<HTMLDivElement>(null);
  let componentState = useTableSelectionCell_unstable(
    { ...props, tabIndex: 0, checked, checkboxIndicator: { tabIndex: -1 }, onClick },
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

const DataGridVirtualBody: React.FC<DataGridBodyProps> = props => {
  const ref = React.useRef<HTMLDivElement>(null);
  const getRows = useDataGridContext(ctx => ctx.state.getRows);
  const sort = useDataGridContext(ctx => ctx.state.sort.sort);
  const itemCount = useDataGridContext(ctx => ctx.items.length);
  const getTotalWidth = useDataGridContext(ctx => ctx.state.columnSizing.getTotalWidth);
  const rows = sort(getRows());
  let children = props.children;
  let componentState = useTableBody_unstable({ ...props }, ref);
  componentState = useTableBodyStyles_unstable(componentState);

  const { slots, slotProps } = getSlots<TableBodySlots>(componentState);

  return (
    <slots.root {...slotProps.root}>
      <List height={600} itemCount={itemCount} itemSize={50} width={getTotalWidth()} itemData={rows}>
        {({ data, index, style }: ListChildComponentProps) => {
          const row: RowState<unknown> = data[index];
          return (
            <DataGridRowContext.Provider value={row.rowId}>{children(row.item, style)}</DataGridRowContext.Provider>
          );
        }}
      </List>
    </slots.root>
  );
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
const DataGridCellContext = React.createContext<ColumnId | undefined>(undefined);

const DataGridHeaderContext = React.createContext<boolean | undefined>(undefined);

type DataGridProps = TableProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDefinition<any>[];
  sortState?: SortState;
  defaultSortState?: SortState;
  onSelectionChange?: UseSelectionOptions['onSelectionChange'];
  onSortChange?: UseSortOptions['onSortChange'];
  selectedRows?: RowId[];
  defaultSelectedRows?: RowId[];
};
type DataGridCellLayoutProps = TableCellLayoutProps & {};
type DataGridSelectionCellProps = TableSelectionCellProps & {};
type DataGridHeaderCellProps = TableHeaderCellProps & { columnId?: ColumnId };
type DataGridCellProps = TableCellProps & { columnId?: ColumnId };
type DataGridRowProps = Omit<TableRowProps, 'children'> & {
  rowId?: RowId;
  children: RenderFunction<ColumnDefinition<unknown>> | React.ReactNode;
};
type DataGridHeaderProps = TableHeaderProps & {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderFunction<T = any> = (item: T) => React.ReactNode;
type DataGridBodyProps = Omit<TableBodyProps, 'children'> & {
  children: RenderFunction | React.ReactNode;
};
