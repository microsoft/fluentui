A data grid displays tabular data that users can navigate cell by cell, sort and select. It follows the ARIA `grid` pattern: a single tab stop for the whole grid, and arrow keys to move between the cells.

The headless data grid adds no styles, icons or motion. Compose it from these parts:

- `DataGridHeader` and `DataGridBody` — group the rows. `DataGridBody` calls its `children` render function for each row
- `DataGridRow` — a row. Its `children` render function is called for each column. With selection enabled the row renders a `DataGridSelectionCell`
- `DataGridHeaderCell`, `DataGridCell` and `DataGridSelectionCell` — the cells

The items, columns, sorting and selection are configured on the `DataGrid`. Use `createTableColumn` to describe the columns.

### Keyboard navigation

Navigation relies on the web-platform `focusgroup` attribute rather than Tabster. In browsers without native support, load a focusgroup polyfill such as [`@microsoft/focusgroup-polyfill`](https://www.npmjs.com/package/@microsoft/focusgroup-polyfill).

`focusgroup` has no two-dimensional grid model, so the data grid combines it with a few DOM based interactions:

| Focus mode       | Keys                                                                                                                                                                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `cell` (default) | `ArrowLeft` and `ArrowRight` move between the cells (`focusgroup="toolbar inline"`). `ArrowUp` and `ArrowDown` move to the cell in the same column of the adjacent row. `Home` and `End` move to the first and last cell of the row. `Ctrl+Home` and `Ctrl+End` move to the first and last cell of the grid. |
| `row_unstable`   | `ArrowUp` and `ArrowDown` move between the rows (`focusgroup="toolbar block"`). The content of the cells is part of the tab order.                                                                                                                                                                           |
| `none`           | No keyboard navigation is added.                                                                                                                                                                                                                                                                             |

The `composite` focus mode and the `group` focus mode of cells rely on Tabster and are not available.

### Data attributes

| Element                 | Attribute             | Values                                             |
| ----------------------- | --------------------- | -------------------------------------------------- |
| `DataGrid`              | `data-focus-mode`     | `cell` / `row_unstable` / `none`                   |
| `DataGrid`              | `data-selection-mode` | `single` / `multiselect`, absent without selection |
| `DataGrid`              | `data-sortable`       | present when the grid is sortable                  |
| `DataGridRow`           | `data-selected`       | present while the row is selected                  |
| `DataGridRow`           | `data-header-row`     | present for the rows of the `DataGridHeader`       |
| `DataGridHeaderCell`    | `data-sortable`       | present when the column is sortable                |
| `DataGridHeaderCell`    | `data-sort-direction` | `ascending` / `descending`, absent when not sorted |
| `DataGridSelectionCell` | `data-checked`        | `''` when checked, `mixed` when partially checked  |
| `DataGridSelectionCell` | `data-selection-type` | `checkbox` / `radio`                               |

### Accessibility

The selection indicators are native inputs. Give them an accessible name with the `selectionCell` slot of `DataGridRow`, for example `selectionCell={{ checkboxIndicator: { 'aria-label': 'Select row' } }}`.
