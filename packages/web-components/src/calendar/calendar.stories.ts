import { Updates, html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { fontFamilyBase, fontSizeBase300, fontWeightRegular, lineHeightBase300 } from '../theme/design-tokens.js';
import type { Calendar as FluentCalendar } from './calendar.js';
import './define.js';

type CalendarStoryArgs = Args & FluentCalendar;
type CalendarStoryMeta = Meta<CalendarStoryArgs>;

function logSelectedDates() {
  Updates.enqueue(() => {
    const calendar = document.querySelector('.fluent-calendar');
    const selectedDatesContainer = document.querySelector('.selected-dates-container');

    selectedDatesContainer &&
      calendar?.addEventListener('selectedDatesChanged', () => {
        const selectedDatesString = calendar.getAttribute('selected-dates');

        if (selectedDatesString === '') {
          selectedDatesContainer.innerHTML = 'Selected Date: Not Set';
        } else {
          selectedDatesContainer.innerHTML = `Selected Date: ${selectedDatesString}`;
        }
      });
  });
}

const storyTemplate = html<CalendarStoryArgs>`
  <script>
    ${x => x.logSelectedDates()};
  </script>
  <style>
    div.docs-story > div:first-child {
      height: 295px;
    }
    .selected-dates-container {
      font: ${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};
      margin-bottom: 10px;
    }
  </style>
  <div class="selected-dates-container">Selected Date: Not Set</div>
  <fluent-calendar
    class="fluent-calendar"
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
    logSelectedDates,
    showSlottedLink: true,
    highlightCurrentMonth: false,
    monthPickerVisible: true,
    highlightSelectedMonth: false,
  },
} as CalendarStoryMeta;

export const Calendar = renderComponent(storyTemplate).bind({});
