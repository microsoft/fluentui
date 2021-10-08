---
id: data-grid
title: fluent-data-grid
sidebar_label: data-grid
---

The `fluent-data-grid` component is used to display tabular data. The `fluent-data-grid-row` and `fluent-data-grid-cell` components are typically created programmatically by the parent grid but some authors may find it useful to create them manually.

## Setup

```ts
import {
  providefluentDesignSystem,
  fluentDataGridCell,
  fluentDataGridRow,
  fluentDataGrid,
} from '@fluentui/web-components';

providefluentDesignSystem().register(fluentDataGridCell(), fluentDataGridRow(), fluentDataGrid());
```

## Usage

```html
<fluent-data-grid id="samplegrid"></fluent-data-grid>
```

Note that data must be provided to the grid by setting a property.

```ts
document.getElementById('samplegrid').rowsData = [
  { item1: 'value 1-1', item2: 'value 2-1' },
  { item1: 'value 1-2', item2: 'value 2-2' },
  { item1: 'value 1-3', item2: 'value 2-3' },
];
```

## Create your own design

### DataGridCell

```ts
import { dataGridCellTemplate, DataGridCell } from '@microsoft/fast-foundation';
import { dataGridCellStyles as cellStyles } from './my-data-grid-cell.styles';

export const myDataGridCell = DataGridCell.compose({
  baseName: 'data-grid-cell',
  template: dataGridCellTemplate,
  styles: cellStyles,
});
```

### DataGridRow

```ts
import { dataGridRowTemplate, DataGridRow } from '@microsoft/fast-foundation';
import { dataGridRowStyles as rowStyles } from './my-data-grid-row.styles';

export const myDataGridRow = DataGridRow.compose({
  baseName: 'data-grid-row',
  template: dataGridRowTemplate,
  styles: rowStyles,
});
```

### DataGrid

```ts
import { dataGridTemplate, DataGrid } from '@microsoft/fast-foundation';
import { dataGridStyles as gridStyles } from './my-data-grid.styles';

export const myDataGrid = DataGrid.compose({
  baseName: 'data-grid',
  template: dataGridTemplate,
  styles: gridStyles,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-data-grid)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/data-grid/data-grid.spec.md)
- [W3C Component Aria Practices](https://w3c.github.io/aria-practices/#grid)
- [Open UI Analysis](https://open-ui.org/components/table.research)
