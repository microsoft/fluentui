import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  dataGridCellTemplate,
  dataGridRowTemplate,
  dataGridTemplate,
} from '@microsoft/fast-foundation';
import { dataGridStyles as gridStyles } from './data-grid.styles';
import { dataGridRowStyles as rowStyles } from './data-grid-row.styles';
import { dataGridCellStyles as cellStyles } from './data-grid-cell.styles';

/**
 * The FAST Data Grid Cell Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fast-data-grid-cell\>
 */
export const fastDataGridCell = DataGridCell.compose({
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
 * The FAST Data Grid Row Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fast-data-grid-row\>
 */
export const fastDataGridRow = DataGridRow.compose({
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
 * The FAST Data Grid Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fast-data-grid\>
 */
export const fastDataGrid = DataGrid.compose({
  baseName: 'data-grid',
  template: dataGridTemplate,
  styles: gridStyles,
});

/**
 * Styles for DataGrid
 * @public
 */
export const dataGridStyles = gridStyles;
