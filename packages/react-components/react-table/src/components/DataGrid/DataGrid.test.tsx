import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGrid } from './DataGrid';
import { isConformant } from '../../testing/isConformant';
import { DataGridProps } from './DataGrid.types';
import { ColumnDefinition, createColumn, RowState } from '../../hooks';
import { DataGridBody } from '../DataGridBody/DataGridBody';
import { DataGridRow } from '../DataGridRow/DataGridRow';
import { DataGridCell } from '../DataGridCell/DataGridCell';
import { DataGridHeader } from '../DataGridHeader/DataGridHeader';

describe('DataGrid', () => {
  isConformant<DataGridProps>({
    Component: DataGrid,
    displayName: 'DataGrid',
  });

  interface Item {
    first: string;
    second: string;
    third: string;
  }

  const testColumns: ColumnDefinition<Item>[] = [
    createColumn({ columnId: 'first', renderHeaderCell: () => 'first', renderCell: item => item.first }),
    createColumn({ columnId: 'second', renderHeaderCell: () => 'second', renderCell: item => item.second }),
    createColumn({ columnId: 'third', renderHeaderCell: () => 'third', renderCell: item => item.third }),
  ];
  const testItems: Item[] = [
    { first: 'first', second: 'second', third: 'third' },
    { first: 'first', second: 'second', third: 'third' },
    { first: 'first', second: 'second', third: 'third' },
  ];

  it('renders a default state', () => {
    const result = render(
      <DataGrid items={testItems} columns={testColumns}>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }) => <DataGridCell key={columnId}>{renderHeaderCell()}</DataGridCell>}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }: RowState<Item>) => (
            <DataGridRow key={rowId}>
              {({ renderCell, columnId }) => <DataGridCell key={columnId}>{renderCell(item)}</DataGridCell>}
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
            {({ renderHeaderCell, columnId }) => <DataGridCell key={columnId}>{renderHeaderCell()}</DataGridCell>}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }: RowState<Item>) => (
            <DataGridRow key={rowId}>
              {({ renderCell, columnId }) => <DataGridCell key={columnId}>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>,
    );

    expect(result.getByRole('grid').getAttribute('data-tabster')).toMatchInlineSnapshot(
      `"{\\"mover\\":{\\"cyclic\\":false,\\"direction\\":3}}"`,
    );
  });

  it('should not render tabster attributes when `focusMode` has value `none`', () => {
    const result = render(
      <DataGrid items={testItems} columns={testColumns} focusMode="none">
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }) => <DataGridCell key={columnId}>{renderHeaderCell()}</DataGridCell>}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }: RowState<Item>) => (
            <DataGridRow key={rowId}>
              {({ renderCell, columnId }) => <DataGridCell key={columnId}>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>,
    );

    expect(result.getByRole('grid').hasAttribute('data-tabster')).toBe(false);
  });

  it('should not render tabster attributes when `focusMode` prop is not set', () => {
    const result = render(
      <DataGrid items={testItems} columns={testColumns}>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell, columnId }) => <DataGridCell key={columnId}>{renderHeaderCell()}</DataGridCell>}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }: RowState<Item>) => (
            <DataGridRow key={rowId}>
              {({ renderCell, columnId }) => <DataGridCell key={columnId}>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>,
    );

    expect(result.getByRole('grid').hasAttribute('data-tabster')).toBe(false);
  });
});
