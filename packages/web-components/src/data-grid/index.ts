import { customElement, ViewTemplate } from '@microsoft/fast-element';
import {
  createDataGridCellTemplate,
  createDataGridRowTemplate,
  createDataGridTemplate,
  DataGrid,
  DataGridCell,
  DataGridRow,
} from '@microsoft/fast-foundation';
import { DataGridStyles as gridStyles } from './data-grid.styles';
import { DataGridRowStyles as rowStyles } from './data-grid-row.styles';
import { DataGridCellStyles as cellStyles } from './data-grid-cell.styles';

const cellTemplate: ViewTemplate = createDataGridCellTemplate('fluent');
const gridTemplate: ViewTemplate = createDataGridTemplate('fluent');
const rowTemplate: ViewTemplate = createDataGridRowTemplate('fluent');

/**
 * The Fluent Data Grid Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-data-grid\>
 */
@customElement({
  name: 'fluent-data-grid',
  template: gridTemplate,
  styles: gridStyles,
})
export class FluentDataGrid extends DataGrid {}

/**
 * Styles for DataGrid
 * @public
 */
export const DataGridStyles = gridStyles;

/**
 * The Fluent Data Grid Row Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-data-grid-row\>
 */
@customElement({
  name: 'fluent-data-grid-row',
  template: rowTemplate,
  styles: rowStyles,
})
export class FluentDataGridRow extends DataGridRow {}

/**
 * Styles for DataGrid row
 * @public
 */
export const DataGridRowStyles = rowStyles;

/**
 * The Fluent Data Grid Cell Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-data-grid-cell\>
 */
@customElement({
  name: 'fluent-data-grid-cell',
  template: cellTemplate,
  styles: cellStyles,
})
export class FluentDataGridCell extends DataGridCell {}

/**
 * Styles for DataGrid cell
 * @public
 */
export const DataGridCellStyles = cellStyles;
