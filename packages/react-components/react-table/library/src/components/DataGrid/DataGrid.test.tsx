import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { DataGrid } from './DataGrid';
import { isConformant } from '../../testing/isConformant';
import type { DataGridProps } from './DataGrid.types';
import type { TableColumnDefinition, TableRowData } from '../../hooks';
import { createTableColumn } from '../../hooks';
import { DataGridBody } from '../DataGridBody/DataGridBody';
import { DataGridRow } from '../DataGridRow/DataGridRow';
import { DataGridCell } from '../DataGridCell/DataGridCell';
import { DataGridHeader } from '../DataGridHeader/DataGridHeader';

const measureElementRef = jest.fn();
jest.mock('../../hooks/useMeasureElement', () => {
  return { useMeasureElement: () => ({ width: 1000, measureElementRef }) };
});

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
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    requiredProps: {
      items: testItems,
      columns: testColumns,
    },
    testOptions: {
      // This component renders another component's ROOT — a DataGrid IS a Table — so the
      // element legitimately carries BOTH markers (DECISIONS.md D16.3). Declaring the whole
      // set keeps `component-has-group-marker` running as an exact set comparison, and keeps
      // its `classList[0]` half — the D16.2 invariant nwsapi's jsdom `:scope` polyfill
      // depends on — asserted here.
      'has-group-marker': {
        markers: ['group/fui-table', 'group/fui-data-grid'],
      },
      'consistent-callback-args': {
        legacyCallbacks: ['onSortChange', 'onSelectionChange', 'onColumnResize'],
      },
    },
    // TODO: https://github.com/microsoft/fluentui/issues/19618
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

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
      `"{\\"mover\\":{\\"cyclic\\":false,\\"direction\\":3,\\"memorizeCurrent\\":true}}"`,
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
      `"{\\"mover\\":{\\"cyclic\\":false,\\"direction\\":3,\\"memorizeCurrent\\":true}}"`,
    );
  });
});
