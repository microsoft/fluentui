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
import { PresenceBadgeStatus, Avatar, useMergedRefs } from '@fluentui/react-components';
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell as BaseTableHeaderCell } from '../..';
import { useTable, ColumnDefinition, useColumnOrdering } from '../../hooks';
import { TableCellLayout } from '../../components/TableCellLayout/TableCellLayout';
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
import { TableHeaderCellProps } from '../../components/TableHeaderCell/TableHeaderCell.types';

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
    label: 'File',
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  },
  {
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    label: 'Author',
    renderCell: item => {
      return (
        <TableCellLayout media={<Avatar badge={{ status: item.author.status }} />}>{item.author.label}</TableCellLayout>
      );
    },
  },
  {
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    label: 'Last updated',
    renderCell: item => {
      return item.lastUpdated.label;
    },
  },
  {
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    label: 'Last update',
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  },
];

const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps & { columnId: ColumnId }>(
  (props, ref) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.columnId });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <BaseTableHeaderCell
        {...props}
        ref={useMergedRefs(ref, setNodeRef)}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  },
);

export const ColumnOrdering = () => {
  const {
    getRows,
    columnOrdering: { moveColumn },
    columns: tableColumns,
  } = useTable(
    {
      columns,
      items,
    },
    [useColumnOrdering()],
  );

  const rows = getRows();
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

  return (
    <Table sortable>
      <TableHeader>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={tableColumns.map(col => col.columnId)} strategy={verticalListSortingStrategy}>
            <TableRow>
              {tableColumns.map(column => (
                <TableHeaderCell columnId={column.columnId} key={column.columnId}>
                  {column.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </SortableContext>
        </DndContext>
      </TableHeader>
      <TableBody>
        {rows.map(({ item }) => (
          <TableRow key={item.file.label}>
            {tableColumns.map(column => (
              <TableCell key={column.columnId}>{column.renderCell?.(item)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
