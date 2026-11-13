A table displays tabular data. It renders semantic `table`, `thead`, `tbody`, `tr`, `th` and `td` elements, or `div`s with the matching ARIA roles when `noNativeElements` is set.

The headless table adds no styles, icons or motion. Compose it from these parts:

- `TableHeader` and `TableBody` — group the rows
- `TableRow` — a row
- `TableHeaderCell` — a column header. When `sortable`, its content is rendered inside a button that reports the interaction; sorting the data is up to the consumer or to `useTableFeatures` and `useTableSort`
- `TableCell` — a cell
- `TableSelectionCell` — a cell with a native checkbox or radio. Give the indicator an accessible name with `checkboxIndicator` or `radioIndicator`
- `TableCellLayout` and `TableCellActions` — layout for the content and the actions of a cell
- `TableResizeHandle` — the handle used to resize a column

### Data attributes

Style the state of the table with these attributes:

| Element              | Attribute             | Values                                             |
| -------------------- | --------------------- | -------------------------------------------------- |
| `Table`              | `data-sortable`       | present when the table is sortable                 |
| `TableRow`           | `data-header-row`     | present when the row is in the `TableHeader`       |
| `TableHeaderCell`    | `data-sortable`       | present when the column is sortable                |
| `TableHeaderCell`    | `data-sort-direction` | `ascending` / `descending`, absent when not sorted |
| `TableSelectionCell` | `data-checked`        | `''` when checked, `mixed` when partially checked  |
| `TableSelectionCell` | `data-selection-type` | `checkbox` / `radio`                               |
| `TableSelectionCell` | `data-invisible`      | present when the cell is hidden but takes up space |
| `TableCellActions`   | `data-visible`        | present when the actions are forced visible        |
