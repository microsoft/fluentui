import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Calendar as FluentCalendar } from './calendar.js';
import './define.js';

type CalendarStoryArgs = Args & FluentCalendar;
type CalendarStoryMeta = Meta<CalendarStoryArgs>;

const storyTemplate = html<CalendarStoryArgs>`
  <style>
    div.docs-story > div:first-child {
      height: 285px;
      width: 472;
    }
  </style>
  <fluent-calendar
    ?show-slotted-link=${x => x.showSlottedLink}
    ?highlightCurrentMonth=${x => x.highlightCurrentMonth}
    ?monthPickerVisible=${x => x.monthPickerVisible}
    ?highlightSelectedMonth=${x => x.highlightSelectedMonth}
  >
  </fluent-calendar>
`;

export default {
  title: 'Components/Calendar',
  args: {
    showSlottedLink: true,
    highlightCurrentMonth: false,
    monthPickerVisible: true,
    highlightSelectedMonth: false,
  },
} as CalendarStoryMeta;

export const Calendar = renderComponent(storyTemplate).bind({});
