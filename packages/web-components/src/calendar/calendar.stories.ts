import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Calendar as FluentCalendar } from './calendar.js';
import './define.js';

type CalendarStoryArgs = Args & FluentCalendar;
type CalendarStoryMeta = Meta<CalendarStoryArgs>;

const storyTemplate = html<CalendarStoryArgs>`
  <fluent-calendar ?show-slotted-link=${x => x.showSlottedLink} ?highlightCurrentMonth=${x => x.highlightCurrentMonth}>
  </fluent-calendar>
`;

export default {
  title: 'Components/Calendar',
  args: {
    showSlottedLink: true,
    highlightCurrentMonth: false,
  },
} as CalendarStoryMeta;

export const Calendar = renderComponent(storyTemplate).bind({});
