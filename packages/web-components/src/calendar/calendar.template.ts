import { ElementViewTemplate } from '@microsoft/fast-element';
import { calendarTemplate, calendarTitleTemplate } from '@microsoft/fast-foundation';
import type { Calendar } from './calendar.js';

/**
 * The template for the Calendar component.
 * @public
 */

export const template: ElementViewTemplate<Calendar> = calendarTemplate({
  title: calendarTitleTemplate(),
  dataGrid: 'fast-data-grid',
  dataGridRow: 'fast-data-grid-row',
  dataGridCell: 'fast-data-grid-cell',
});
