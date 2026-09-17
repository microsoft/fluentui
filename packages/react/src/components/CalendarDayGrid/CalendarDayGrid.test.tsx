import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIds } from '@fluentui/utilities';
import { CalendarDayGrid } from './CalendarDayGrid';
import { defaultCalendarStrings } from '../Calendar/index';
import { DateRangeType, DayOfWeek, FirstWeekOfYear } from '@fluentui/date-time-utilities';
import { isConformant } from '../../common/isConformant';

describe('CalendarDayGrid', () => {
  beforeEach(() => {
    resetIds();
  });

  // Regression test for https://github.com/microsoft/fluentui/issues/36721
  it('shows the week number of the visible week in collapsed single-week view', () => {
    // Fri Sep 11 2026 belongs to the week of Sep 6 - Sep 12, which is week 36.
    const navigatedDate = new Date(2026, 8, 11);
    const { container } = render(
      <CalendarDayGrid
        strings={defaultCalendarStrings}
        selectedDate={navigatedDate}
        navigatedDate={navigatedDate}
        dateRangeType={DateRangeType.Week}
        weeksToShow={1}
        showWeekNumbers={true}
        firstDayOfWeek={DayOfWeek.Sunday}
        firstWeekOfYear={FirstWeekOfYear.FirstFullWeek}
        dateTimeFormatter={{
          formatMonthDayYear: () => 'm/d/y',
          formatMonthYear: () => 'm/y',
          formatDay: () => 'd',
          formatMonth: () => 'm',
          formatYear: () => 'y',
        }}
      />,
    );

    const displayedWeekNumbers = Array.from(container.querySelectorAll('th[scope="row"] span')).map(
      cell => cell.textContent,
    );
    // The visible row must show 36 (its own week), not 35 (the first week-of-month number).
    expect(displayedWeekNumbers).toContain('36');
  });

  isConformant({
    Component: CalendarDayGrid,
    displayName: 'CalendarDayGrid',
    requiredProps: {
      strings: defaultCalendarStrings,
      selectedDate: new Date('2020-09-18T21:06:52.856Z'),
      navigatedDate: new Date('2020-09-18T21:06:52.856Z'),
      dateRangeType: DateRangeType.Day,
      firstDayOfWeek: DayOfWeek.Sunday,
      firstWeekOfYear: FirstWeekOfYear.FirstFullWeek,
      dateTimeFormatter: {
        formatMonthDayYear: () => 'm/d/y',
        formatMonthYear: () => 'm/y',
        formatDay: () => 'd',
        formatMonth: () => 'm',
        formatYear: () => 'y',
      },
    },
    disabledTests: [
      'component-handles-classname',
      'exported-top-level',
      'has-top-level-file',
      // This component is not currently intended to handle a ref
      'component-handles-ref',
      'component-has-root-ref',
    ],
  });
});
