import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGrid } from './DataGrid';
import { isConformant } from '../../testing/isConformant';
import { DataGridProps } from './DataGrid.types';
import { ColumnDefinition, RowState } from '../../hooks';
import { DataGridBody } from '../DataGridBody/DataGridBody';
import { DataGridRow } from '../DataGridRow/DataGridRow';
import { DataGridCell } from '../DataGridCell/DataGridCell';

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

  const testColumns: ColumnDefinition<Item>[] = [{ columnId: 'first' }, { columnId: 'second' }, { columnId: 'third' }];
  const testItems: Item[] = [
    { first: 'first', second: 'second', third: 'third' },
    { first: 'first', second: 'second', third: 'third' },
    { first: 'first', second: 'second', third: 'third' },
  ];

  it('renders a default state', () => {
    const result = render(
      <DataGrid items={testItems} columns={testColumns}>
        <DataGridBody>
          {({ item, rowId }: RowState<Item>) => (
            <DataGridRow key={rowId}>
              <DataGridCell>{item.first}</DataGridCell>
              <DataGridCell>{item.second}</DataGridCell>
              <DataGridCell>{item.third}</DataGridCell>
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
