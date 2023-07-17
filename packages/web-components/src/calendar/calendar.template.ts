import { ElementViewTemplate, html, repeat, ViewTemplate } from '@microsoft/fast-element';
import {
  CalendarOptions,
  calendarTemplate,
  calendarTitleTemplate,
  FASTCalendar,
  tagFor,
} from '@microsoft/fast-foundation';
import type { Calendar } from './calendar.js';

const ChevronLeft16 = html.partial(`
<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z" fill="currentColor" />
</svg>`);

const ChevronRight16 = html.partial(`
<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z" fill="currentColor" />
</svg>
`);

/**
 * A month picker title template that includes the year
 * @returns - A month picker title template
 * @public
 */
export function calendarMonthTitleTemplate<T extends FASTCalendar>(): ViewTemplate<T> {
  return html`
    <div class="month-picker-title" part="month-picker-title">
      <span>${(x: T) => x.dateFormatter.getYear(x.year)}</span>
    </div>
  `;
}

/**
 * Calendar weekday label template
 * @returns - The weekday labels template
 * @public
 */
export function monthPickerCellTemplate(options: CalendarOptions, todayMonth: string): ViewTemplate {
  const cellTag = html.partial(tagFor(options.dataGridCell));
  return html`
      <${cellTag}
          class="month-cell"
          part="month-cell"
          tabindex="-1"
          role="gridcell"
          grid-column="${(x, c) => c.index + 1}"
      >
      ${x => console.log(x)}
        <div
        class="month">
          ${x => x.text}
        </div>
        </slot></slot>
      </${cellTag}>
  `;
}

/**
 *
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @param todayString - A string representation for todays date
 * @returns - A template for a week of days
 * @public
 */
export function monthPickerRowTemplate(options: CalendarOptions, todayMonth: string): ViewTemplate {
  const rowTag = html.partial(tagFor(options.dataGridRow));
  return html`
      <${rowTag}
          class="month-row"
          part="month-row"
          role="row"
          role-type="default"
          grid-template-columns="1fr 1fr 1fr 1fr"
      >
      ${x => console.log(x)}
      ${repeat(x => x, monthPickerCellTemplate(options, todayMonth))}
      </${rowTag}>
  `;
}

/**
 * Interactive template using DataGrid
 * @param context - The templates context
 * @param todayString - string representation of todays date
 * @returns - interactive calendar template
 *
 * @internal
 */
export function interactiveMonthPickerGridTemplate<T extends FASTCalendar>(
  options: CalendarOptions,
  todayMonth: string,
): ViewTemplate<T> {
  const gridTag = html.partial(tagFor(options.dataGrid));

  return html<T>`
  <${gridTag} class="months interact" part="months" generate-header="none">
      ${repeat(x => x.getMonthText(), monthPickerRowTemplate(options, todayMonth))}
  </${gridTag}>
  `;
}

/**
 *
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @param definition - Foundation element definition
 * @returns - a template for a calendar month
 * @public
 */
export function MonthPickerTemplate<T extends FASTCalendar>(options: CalendarOptions): ElementViewTemplate<T> {
  const today: Date = new Date();
  const todayMonth: string = `${today.getMonth() + 1}`;
  return html<T>`
    <slot></slot>
    ${interactiveMonthPickerGridTemplate(options, todayMonth)}
  `;
}

/**
 * The template for the Calendar component.
 * @public
 */
export const template: ElementViewTemplate<Calendar> = html`
  <div class="control">
    <div class="date-view">
      <div class="header">
        ${calendarTitleTemplate()}
        <div class="navicon-container">
          <span
            class="navicon-left"
            part="navicon-left"
            @click="${(x, c) => x.switchMonth(x.getMonthInfo().previous.month, x.getMonthInfo().previous.year)}"
          >
            ${ChevronLeft16}
          </span>
          <span
            class="navicon-right"
            part="navicon-right"
            @click="${(x, c) => x.switchMonth(x.getMonthInfo().next.month, x.getMonthInfo().next.year)}"
          >
            ${ChevronRight16}
          </span>
        </div>
      </div>
      ${calendarTemplate({
        dataGrid: 'fast-data-grid',
        dataGridRow: 'fast-data-grid-row',
        dataGridCell: 'fast-data-grid-cell',
      })}
      <div class="footer" part="footer">
        <div class=${x => x.getLinkClassNames()} @click="${(x, c) => x.handleGoToToday(c.event as MouseEvent)}">
          Go to today
        </div>
      </div>
    </div>
    <div class="month-picker">
      ${calendarMonthTitleTemplate()}
      ${MonthPickerTemplate({
        dataGrid: 'fast-data-grid',
        dataGridRow: 'fast-data-grid-row',
        dataGridCell: 'fast-data-grid-cell',
      })}
    </div>
  </div>
`;
