import * as React from 'react';
import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { CalendarButtonExample } from './Calendar.Button.Example';
import { CalendarInlineContiguousWorkWeekDaysExample } from './Calendar.Inline.ContiguousWorkWeekDays.Example';
import { CalendarInlineCustomDayCellRefExample } from './Calendar.Inline.CustomDayCellRef.Example';
import { CalendarInlineDateBoundariesExample } from './Calendar.Inline.DateBoundaries.Example';
import { CalendarInlineExample } from './Calendar.Inline.Example';
import { CalendarInlineMonthOnlyExample } from './Calendar.Inline.MonthOnly.Example';
import { CalendarInlineMultidayDayViewExample } from './Calendar.Inline.MultidayDayView.Example';
import { CalendarInlineNonContiguousWorkWeekDaysExample } from './Calendar.Inline.NonContiguousWorkWeekDays.Example';
import { CalendarInlineOverlaidMonthExample } from './Calendar.Inline.OverlaidMonthPicker.Example';
import { CalendarInlineSixWeeksExample } from './Calendar.Inline.SixWeeks';
import { CalendarInlineWeekNumbersExample } from './Calendar.Inline.WeekNumbers.Example';
import { CalendarInlineWeekSelectionExample } from './Calendar.Inline.WeekSelection.Example';
import { CalendarInlineMonthSelectionExample } from './Calendar.Inline.MonthSelection.Example';

const CalendarButtonExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Button.Example.tsx') as string;
const CalendarInlineContiguousWorkWeekDaysExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.ContiguousWorkWeekDays.Example.tsx') as string;
const CalendarInlineCustomDayCellRefExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.CustomDayCellRef.Example.tsx') as string;
const CalendarInlineDateBoundariesExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.DateBoundaries.Example.tsx') as string;
const CalendarInlineExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.Example.tsx') as string;
const CalendarInlineMonthOnlyExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.MonthOnly.Example.tsx') as string;
const CalendarInlineMultidayDayViewExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.MultidayDayView.Example.tsx') as string;
const CalendarInlineNonContiguousWorkWeekDaysExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.NonContiguousWorkWeekDays.Example.tsx') as string;
const CalendarInlineOverlaidMonthExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.OverlaidMonthPicker.Example.tsx') as string;
const CalendarInlineSixWeeksExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.SixWeeks.tsx') as string;
const CalendarInlineWeekNumbersExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.WeekNumbers.Example.tsx') as string;
const CalendarInlineWeekSelectionExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.WeekSelection.Example.tsx') as string;
const CalendarInlineMonthSelectionExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/Calendar.Inline.MonthSelection.Example.tsx') as string;

export const CalendarPageProps: IDocPageProps = {
  title: 'Calendar',
  componentName: 'Calendar',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Calendar',
  examples: [
    {
      title: 'Calendar',
      code: CalendarInlineExampleCode,
      view: <CalendarInlineExample />,
    },
    {
      title: 'Calendar with overlaid month picker when header is clicked',
      code: CalendarInlineOverlaidMonthExampleCode,
      view: <CalendarInlineOverlaidMonthExample />,
    },
    {
      title: 'Calendar with week selection',
      code: CalendarInlineWeekSelectionExampleCode,
      view: <CalendarInlineWeekSelectionExample />,
    },
    {
      title: 'Calendar with month selection',
      code: CalendarInlineMonthSelectionExampleCode,
      view: <CalendarInlineMonthSelectionExample />,
    },
    {
      title: 'Calendar with week numbers',
      code: CalendarInlineWeekNumbersExampleCode,
      view: <CalendarInlineWeekNumbersExample />,
    },
    {
      title: 'Calendar displaying 6 weeks',
      code: CalendarInlineSixWeeksExampleCode,
      view: <CalendarInlineSixWeeksExample />,
    },
    {
      title: 'Calendar with month picker and no day picker',
      code: CalendarInlineMonthOnlyExampleCode,
      view: <CalendarInlineMonthOnlyExample />,
    },
    {
      title: 'Calendar with date boundary and disabled dates',
      code: CalendarInlineDateBoundariesExampleCode,
      view: <CalendarInlineDateBoundariesExample />,
    },
    {
      title: 'Calendar with custom selectable days',
      code: CalendarInlineContiguousWorkWeekDaysExampleCode,
      view: <CalendarInlineContiguousWorkWeekDaysExample />,
    },
    {
      title: 'Calendar with custom selectable days, week starting on Monday',
      code: CalendarInlineNonContiguousWorkWeekDaysExampleCode,
      view: <CalendarInlineNonContiguousWorkWeekDaysExample />,
    },
    {
      title: 'Calendar with multi-day view',
      code: CalendarInlineMultidayDayViewExampleCode,
      view: <CalendarInlineMultidayDayViewExample />,
    },
    {
      title: 'Calendar a tooltip for each day and disabling weekends',
      code: CalendarInlineCustomDayCellRefExampleCode,
      view: <CalendarInlineCustomDayCellRefExample />,
    },
    {
      title: 'Calendar launched from a button',
      code: CalendarButtonExampleCode,
      view: <CalendarButtonExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/docs/CalendarOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Calendar/docs/CalendarBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
