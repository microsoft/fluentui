import './index';
import { fluentCalendar } from './index';

const now = new Date();
const years = new Array(9).fill(null).map((_, index) => (now.getFullYear() - 4 + index).toString());
const groupsToDates = matrix =>
  matrix.map(days => days.map(day => `${now.getMonth() + 1}-${day}-${now.getFullYear()}`).join(','));
const disabledDates = groupsToDates([
  [1, 2, 3, 4, now.getDate()],
  [6, 7, 10, 18],
  [8, 17, 24, 25],
  [4, 11, 18, 25],
]);

export default {
  title: 'Components/Calendar',
  component: fluentCalendar,
  argTypes: {
    month: {
      description: 'Month of the calendar to display.',
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      default: 'The current month',
    },
    year: {
      description: 'Year of the calendar to display.',
      control: { type: 'select' },
      options: years,
      default: 'The current year',
    },
    locale: {
      control: { type: 'select' },
      options: ['en-US', 'fr-FR', 'de-DE', 'th-TH-u-ca-buddhist-nu-thai', 'ar-XE-u-ca-islamic-nu-arab'],
      default: 'en-US',
      description:
        'Locale information which can include market (language and country), calendar type and numbering type.',
    },
    dayFormat: {
      description: 'Formatting for the numbered days.',
      options: ['2-digit', 'numeric'],
      control: { type: 'select' },
      default: 'numeric',
    },
    weekdayFormat: {
      description: 'Formatting for the weekday titles.',
      options: ['long', 'narrow', 'short'],
      control: { type: 'select' },
      default: 'short',
    },
    monthFormat: {
      description: 'Formatting for the month name in the title.',
      options: ['2-digit', 'long', 'narrow', 'numeric', 'short'],
      control: { type: 'select' },
      default: 'long',
    },
    yearFormat: {
      description: 'Formatting for the year in the title.',
      options: ['2-digit', 'numeric'],
      control: { type: 'select' },
      default: 'numeric',
    },
    disabledDates: {
      description: 'Dates to be shown as disabled.',
      options: disabledDates,
      control: { type: 'select' },
    },
    selectedDates: {
      description: 'Dates to be shown as selected',
      options: disabledDates,
      control: { type: 'select' },
    },
    readonly: {
      description: 'A readonly version of the calendar without AT interactions.',
      control: { type: 'boolean' },
      default: true,
    },
  },
};

const CalendarTemplate = ({
  month,
  year,
  locale,
  dayFormat,
  weekdayFormat,
  monthFormat,
  yearFormat,
  disabledDates,
  selectedDates,
  readonly,
}) =>
  `
  <style>
    div.docs-story > div:first-child {
      height: 22em !important;
    }
  </style>
  <fluent-calendar
    ${month ? `month="${month}"` : ''}
    ${year ? `year="${year}"` : ''}
    ${locale ? `locale="${locale}"` : ''}
    ${dayFormat ? `day-format="${dayFormat}"` : ''}
    ${weekdayFormat ? `weekday-format="${weekdayFormat}"` : ''}
    ${monthFormat ? `month-format="${monthFormat}"` : ''}
    ${yearFormat ? `year-format="${yearFormat}"` : ''}
    ${disabledDates ? `disabled-dates="${disabledDates}"` : ''}
    ${selectedDates ? `selected-dates="${selectedDates}"` : ''}
    ${readonly === false ? `readonly="false"` : ''}
    ></fluent-calendar>
  `;

export const Calendar = CalendarTemplate.bind({});

Calendar.args = {
  label: 'Calendar',
  month: (now.getMonth() + 1).toString(),
  year: now.getFullYear().toString(),
  locale: 'en-US',
  readonly: true,
  dayFormat: 'numeric',
  weekdayFormat: 'short',
  monthFormat: 'long',
  yearFormat: 'numeric',
};

const example = `
  <fluent-calendar></fluent-calendar>
  `;

Calendar.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
