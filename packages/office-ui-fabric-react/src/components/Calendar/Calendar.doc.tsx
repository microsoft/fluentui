import * as React from 'react';
import { DateRangeType, DayOfWeek } from '../../Calendar';
import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { CalendarButtonExample } from './examples/Calendar.Button.Example';
import { CalendarInlineExample } from './examples/Calendar.Inline.Example';
import { addMonths, addYears, addWeeks, addDays } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';

const CalendarButtonExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Calendar/examples/Calendar.Button.Example.tsx') as string;
const CalendarInlineExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Calendar/examples/Calendar.Inline.Example.tsx') as string;

const today = new Date(Date.now());

export const CalendarPageProps: IDocPageProps = {
  title: 'Calendar',
  componentName: 'Calendar',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Calendar',
  examples: [
    {
      title: 'Inline Calendar',
      code: CalendarInlineExampleCode,

      view: (
        <CalendarInlineExample
          isMonthPickerVisible={false}
          dateRangeType={DateRangeType.Day}
          autoNavigateOnSelection={false}
          showGoToToday={true}
        />
      )
    },
    {
      title: 'Inline Calendar with overlaid month picker when header is clicked',
      code: CalendarInlineExampleCode,

      view: (
        <CalendarInlineExample
          showMonthPickerAsOverlay={true}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          dateRangeType={DateRangeType.Day}
          autoNavigateOnSelection={false}
          showGoToToday={false}
        />
      )
    },
    {
      title: 'Inline Calendar with month picker and overlaid year picker when month header is clicked',
      code: CalendarInlineExampleCode,

      view: (
        <CalendarInlineExample
          dateRangeType={DateRangeType.Day}
          autoNavigateOnSelection={false}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={true}
        />
      )
    },
    {
      title: 'Inline Calendar with week selection and overlaid year picker when month header is clicked',
      code: CalendarInlineExampleCode,

      view: (
        <CalendarInlineExample
          dateRangeType={DateRangeType.Week}
          autoNavigateOnSelection={true}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={true}
          showNavigateButtons={true}
        />
      )
    },
    {
      title: `Inline Calendar with week selection, date boundary (minDate, maxDate), disabled dates (restrictedDates),
        and overlaid year picker when month header is clicked`,
      code: CalendarInlineExampleCode,

      view: (
        <CalendarInlineExample
          dateRangeType={DateRangeType.Week}
          autoNavigateOnSelection={true}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={true}
          showNavigateButtons={true}
          minDate={addWeeks(today, -2)}
          maxDate={addWeeks(today, 2)}
          restrictedDates={[addDays(today, -2), addDays(today, -8), addDays(today, 2), addDays(today, 8)]}
        />
      )
    },
    {
      title: 'Inline Calendar with month selection and overlaid year picker when month header is clicked',
      code: CalendarInlineExampleCode,

      view: (
        <CalendarInlineExample
          dateRangeType={DateRangeType.Month}
          autoNavigateOnSelection={true}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={true}
          showNavigateButtons={true}
        />
      )
    },
    {
      title: 'Inline Calendar with week numbers',
      code: CalendarInlineExampleCode,

      view: (
        <CalendarInlineExample
          isMonthPickerVisible={false}
          dateRangeType={DateRangeType.Day}
          autoNavigateOnSelection={false}
          showGoToToday={true}
          showWeekNumbers={true}
        />
      )
    },
    {
      title: 'Inline Calendar with 6 weeks display by default',
      code: CalendarInlineExampleCode,

      view: (
        <CalendarInlineExample
          isMonthPickerVisible={false}
          dateRangeType={DateRangeType.Day}
          autoNavigateOnSelection={false}
          showGoToToday={true}
          showSixWeeksByDefault={true}
        />
      )
    },
    {
      title: 'Inline Calendar with month picker, no day picker, and overlaid year picker when month header is clicked',
      code: CalendarInlineExampleCode,

      view: (
        <CalendarInlineExample
          dateRangeType={DateRangeType.Month}
          autoNavigateOnSelection={false}
          showGoToToday={true}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          isDayPickerVisible={false}
        />
      )
    },
    {
      title: `Inline Calendar with date boundary (minDate, maxDate), disabled dates (restrictedDates),
        and overlaid year picker when month header is clicked`,
      code: CalendarInlineExampleCode,

      view: (
        <CalendarInlineExample
          dateRangeType={DateRangeType.Day}
          autoNavigateOnSelection={true}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={false}
          minDate={addMonths(today, -1)}
          maxDate={addYears(today, 1)}
          restrictedDates={[addDays(today, -2), addDays(today, -8), addDays(today, 2), addDays(today, 8)]}
        />
      )
    },
    {
      title: `Calendar with workWeekDays = [T W, F, Sa] provided, first day of week = M, and overlaid year picker when
      month header is clicked`,
      code: CalendarButtonExampleCode,

      view: (
        <CalendarInlineExample
          dateRangeType={DateRangeType.WorkWeek}
          firstDayOfWeek={DayOfWeek.Monday}
          autoNavigateOnSelection={true}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={true}
          workWeekDays={[DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Friday, DayOfWeek.Saturday]}
        />
      )
    },
    {
      title: 'Calendar launched from a button',
      code: CalendarButtonExampleCode,

      view: <CalendarButtonExample highlightCurrentMonth={true} />
    },
    {
      title: 'Month picker launched from a button',
      code: CalendarButtonExampleCode,

      view: (
        <CalendarButtonExample
          isDayPickerVisible={false}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          buttonString={'Click for Month Picker'}
        />
      )
    },
    {
      title: 'Calendar with overlaid month picker launched from a button',
      code: CalendarButtonExampleCode,

      view: (
        <CalendarButtonExample
          showMonthPickerAsOverlay={true}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          buttonString={'Click for overlaid Day Picker and Month Picker'}
        />
      )
    },
    {
      title: 'Calendar with overlaid month picker launched from a button without show go to today button',
      code: CalendarButtonExampleCode,

      view: (
        <CalendarButtonExample
          showMonthPickerAsOverlay={true}
          showGoToToday={false}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          buttonString={'Click for overlaid Day Picker and Month Picker without go to today button'}
        />
      )
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Calendar/docs/CalendarOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Calendar/docs/CalendarDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Calendar/docs/CalendarDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
