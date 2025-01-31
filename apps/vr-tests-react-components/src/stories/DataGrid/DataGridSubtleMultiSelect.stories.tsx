import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
} from '@fluentui/react-table';
import { withStoryWrightSteps } from '../../utilities';
import { columns, items, type Item } from './utils';

export default {
  title: 'DataGridConverged - subtle multi select',

  decorators: [
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .hover('.fui-DataGridHeader > .fui-DataGridRow')
          .snapshot('hover header row')
          .hover('.fui-DataGridBody > .fui-DataGridRow')
          .snapshot('hover row')
          .end(),
      }),
  ],
} satisfies Meta<typeof DataGrid>;

export const Default = () => {
  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      selectionMode="multiselect"
      subtleSelection
      // eslint-disable-next-line react/jsx-no-bind
      getRowId={(item: Item) => item.file.label}
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
Default.storyName = 'default';
