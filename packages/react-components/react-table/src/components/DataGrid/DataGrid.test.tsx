import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGrid } from './DataGrid';
import { isConformant } from '../../testing/isConformant';
import { DataGridProps } from './DataGrid.types';
import { TableColumnDefinition, createTableColumn, TableRowData } from '../../hooks';
import { DataGridBody } from '../DataGridBody/DataGridBody';
import { DataGridRow } from '../DataGridRow/DataGridRow';
import { DataGridCell } from '../DataGridCell/DataGridCell';
import { DataGridHeader } from '../DataGridHeader/DataGridHeader';

interface Item {
  first: string;
  second: string;
  third: string;
}

const testColumns: TableColumnDefinition<Item>[] = [
  createTableColumn({ columnId: 'first', renderHeaderCell: () => 'first', renderCell: item => item.first }),
  createTableColumn({ columnId: 'second', renderHeaderCell: () => 'second', renderCell: item => item.second }),
  createTableColumn({ columnId: 'third', renderHeaderCell: () => 'third', renderCell: item => item.third }),
];
const testItems: Item[] = [
  { first: 'first', second: 'second', third: 'third' },
  { first: 'first', second: 'second', third: 'third' },
  { first: 'first', second: 'second', third: 'third' },
];

describe('DataGrid', () => {
  isConformant<DataGridProps>({
    Component: DataGrid,
    displayName: 'DataGrid',
    requiredProps: {
      items: testItems,
      columns: testColumns,
    },
  });

  it('renders a default state', () => {
    const result = render(
      <DataGrid items={testItems} columns={testColumns}>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }: TableColumnDefinition<Item>) => (
              <DataGridCell key={columnId}>{renderHeaderCell()}</DataGridCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }: TableRowData<Item>) => (
            <DataGridRow key={rowId}>
              {({ renderCell, columnId }: TableColumnDefinition<Item>) => (
                <DataGridCell key={columnId}>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('should render tabster attributes when `focusMode` has value `cell`', () => {
    const result = render(
      <DataGrid items={testItems} columns={testColumns} focusMode="cell">
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }: TableColumnDefinition<Item>) => (
              <DataGridCell key={columnId}>{renderHeaderCell()}</DataGridCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }: TableRowData<Item>) => (
            <DataGridRow key={rowId}>
              {({ renderCell, columnId }: TableColumnDefinition<Item>) => (
                <DataGridCell key={columnId}>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>,
    );

    expect(result.getByRole('grid').getAttribute('data-tabster')).toMatchInlineSnapshot(
      `"{\\"mover\\":{\\"cyclic\\":false,\\"direction\\":3}}"`,
    );
  });

  it('should none render tabster attributes when `focusMode` has value `none`', () => {
    const result = render(
      <DataGrid items={testItems} columns={testColumns} focusMode="none">
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }: TableColumnDefinition<Item>) => (
              <DataGridCell key={columnId}>{renderHeaderCell()}</DataGridCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }: TableRowData<Item>) => (
            <DataGridRow key={rowId}>
              {({ renderCell, columnId }: TableColumnDefinition<Item>) => (
                <DataGridCell key={columnId}>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>,
    );

    expect(result.getByRole('grid').hasAttribute('data-tabster')).toBe(false);
  });

  it('should render tabster attributes when `focusMode` prop is not set', () => {
    const result = render(
      <DataGrid items={testItems} columns={testColumns}>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }: TableColumnDefinition<Item>) => (
              <DataGridCell key={columnId}>{renderHeaderCell()}</DataGridCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }: TableRowData<Item>) => (
            <DataGridRow key={rowId}>
              {({ renderCell, columnId }: TableColumnDefinition<Item>) => (
                <DataGridCell key={columnId}>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>,
    );

    expect(result.getByRole('grid').getAttribute('data-tabster')).toMatchInlineSnapshot(
      `"{\\"mover\\":{\\"cyclic\\":false,\\"direction\\":3}}"`,
    );
  });
});
