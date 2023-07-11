import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { calendarTemplate, calendarTitleTemplate } from '@microsoft/fast-foundation';
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
 * The template for the Calendar component.
 * @public
 */

export const template: ElementViewTemplate<Calendar> = html`
  <div class="header">
    ${calendarTitleTemplate()}
    <div class="navicon-container">
      <span class="navicon-left" part="navicon-left" @click="${(x, c) => x.prevMonthHandler(c.event as MouseEvent)}">
        ${ChevronLeft16}
      </span>
      <span class="navicon-right" part="navicon-right" @click="${(x, c) => x.nextMonthHandler(c.event as MouseEvent)}">
        ${ChevronRight16}
      </span>
    </div>
  </div>
  ${calendarTemplate({
    title: '',
    dataGrid: 'fast-data-grid',
    dataGridRow: 'fast-data-grid-row',
    dataGridCell: 'fast-data-grid-cell',
  })}
`;
