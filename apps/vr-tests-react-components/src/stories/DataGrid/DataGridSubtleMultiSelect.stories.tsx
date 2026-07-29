import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  dataGridBodyClassNames,
  dataGridHeaderClassNames,
  dataGridRowClassNames,
} from '@fluentui/react-table';
import { fuiSelector } from '@fluentui/react-utilities';
import { columns, items, type Item } from './utils';

/*
 * Statics removal (migration/griffel-to-tailwind/reports/DECISIONS.md D16.1/D16.5).
 * `.fui-DataGridHeader` / `.fui-DataGridBody` / `.fui-DataGridRow` are no longer rendered; the
 * public handles are the Tailwind named-group markers these constants now resolve to. Left as
 * literals these selectors stayed VALID but matched nothing, so both hover steps silently
 * captured the rest state instead of the hover state. `fuiSelector()` escapes the `/`, which
 * terminates a class name in selector position. Structure (child combinator) is unchanged —
 * the substitution is class-for-class.
 */
const headerRowSelector = `${fuiSelector(dataGridHeaderClassNames.root)} > ${fuiSelector(dataGridRowClassNames.root)}`;
const bodyRowSelector = `${fuiSelector(dataGridBodyClassNames.root)} > ${fuiSelector(dataGridRowClassNames.root)}`;

export default {
  title: 'DataGridConverged - subtle multi select',

  parameters: {
    storyWright: {
      steps: new Steps()
        .hover(headerRowSelector)
        .snapshot('hover header row')
        .hover(bodyRowSelector)
        .snapshot('hover row')
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof DataGrid>;

export const Default = () => {
  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      selectionMode="multiselect"
      subtleSelection
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
