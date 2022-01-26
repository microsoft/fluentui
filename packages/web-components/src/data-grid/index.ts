import {
  DataGrid,
  DataGridCell,
  dataGridCellTemplate,
  DataGridRow,
  dataGridRowTemplate,
  dataGridTemplate,
} from '@microsoft/fast-foundation';
import { dataGridStyles as gridStyles } from './data-grid.styles';
import { dataGridRowStyles as rowStyles } from './data-grid-row.styles';
import { dataGridCellStyles as cellStyles } from './data-grid-cell.styles';

/**
 * The Fluent Data Grid Cell Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-data-grid-cell\>
 */
export const fluentDataGridCell = DataGridCell.compose({
  baseName: 'data-grid-cell',
  template: dataGridCellTemplate,
  styles: cellStyles,
});

/**
 * Styles for DataGrid cell
 * @public
 */
export const dataGridCellStyles = cellStyles;

/**
 * The Fluent Data Grid Row Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-data-grid-row\>
 */
export const fluentDataGridRow = DataGridRow.compose({
  baseName: 'data-grid-row',
  template: dataGridRowTemplate,
  styles: rowStyles,
});

/**
 * Styles for DataGrid row
 * @public
 */
export const dataGridRowStyles = rowStyles;

/**
 * The Fluent Data Grid Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-data-grid\>
 */
export const fluentDataGrid = DataGrid.compose({
  baseName: 'data-grid',
  template: dataGridTemplate,
  styles: gridStyles,
});

/**
 * Styles for DataGrid
 * @public
 */
export const dataGridStyles = gridStyles;

/**
 * Data grid base class definitions
 * @public
 */
export { DataGrid, DataGridCell, DataGridRow };
