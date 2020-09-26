import * as React from 'react';
import { ExampleCard, ComponentPage, PropertiesTableSet, Markdown } from '@uifabric/example-app-base';
import { CalendarButtonExample } from './Calendar.Button.Example';
import { CalendarInlineContiguousWorkWeekDaysExample } from './Calendar.Inline.ContiguousWorkWeekDays.Example';
import { CalendarInlineCustomDayCellRefExample } from './Calendar.Inline.CustomDayCellRef.Example';
import { CalendarInlineDateBoundariesExample } from './Calendar.Inline.DateBoundaries.Example';
import { CalendarInlineExample } from './Calendar.Inline.Example';
import { CalendarInlineMonthOnlyExample } from './Calendar.Inline.MonthOnly.Example';
import { CalendarInlineMultidayDayViewExample } from './Calendar.Inline.MultidayDayView.Example';
import { CalendarInlineNonContiguousWorkWeekDaysExample } from './Calendar.Inline.NonContiguousWorkWeekDays.Example';
import { CalendarInlineOverlayedMonthExample } from './Calendar.Inline.OverlayedMonthPicker.Example';
import { CalendarInlineSixWeeksExample } from './Calendar.Inline.SixWeeks';
import { CalendarInlineWeekNumbersExample } from './Calendar.Inline.WeekNumbers.Example';
import { CalendarInlineWeekSelectionExample } from './Calendar.Inline.WeekSelection.Example';
import { CalendarInlineMonthSelectionExample } from './Calendar.Inline.MonthSelection.Example';

const CalendarButtonExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Button.Example') as string;
const CalendarInlineContiguousWorkWeekDaysExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.ContiguousWorkWeekDays.Example') as string;
const CalendarInlineCustomDayCellRefExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.CustomDayCellRef.Example') as string;
const CalendarInlineDateBoundariesExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.DateBoundaries.Example') as string;
const CalendarInlineExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.Example') as string;
const CalendarInlineMonthOnlyExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.MonthOnly.Example') as string;
const CalendarInlineMultidayDayViewExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.MultidayDayView.Example') as string;
const CalendarInlineNonContiguousWorkWeekDaysExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.NonContiguousWorkWeekDays.Example') as string;
const CalendarInlineOverlayedMonthExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.OverlayedMonthPicker.Example') as string;
const CalendarInlineSixWeeksExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.SixWeeks') as string;
const CalendarInlineWeekNumbersExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.WeekNumbers.Example') as string;
const CalendarInlineWeekSelectionExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.WeekSelection.Example') as string;
const CalendarInlineMonthSelectionExampleCode = require('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/Calendar.Inline.MonthSelection.Example') as string;

export class CalendarPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Calendar"
        componentName="Calendar"
        exampleCards={
          <div>
            <ExampleCard title="Inline Calendar" code={CalendarInlineExampleCode}>
              <CalendarInlineExample />
            </ExampleCard>
            <ExampleCard
              title="Inline Calendar with overlayed month picker when header is clicked"
              code={CalendarInlineOverlayedMonthExampleCode}
            >
              <CalendarInlineOverlayedMonthExample />
            </ExampleCard>
            <ExampleCard title="Inline Calendar with week selection" code={CalendarInlineWeekSelectionExampleCode}>
              <CalendarInlineWeekSelectionExample />
            </ExampleCard>
            <ExampleCard title="Inline Calendar with month selection" code={CalendarInlineMonthSelectionExampleCode}>
              <CalendarInlineMonthSelectionExample />
            </ExampleCard>
            <ExampleCard title="Inline Calendar with week numbers" code={CalendarInlineWeekNumbersExampleCode}>
              <CalendarInlineWeekNumbersExample />
            </ExampleCard>
            <ExampleCard
              title="Inline Calendar with 6 weeks display by default"
              code={CalendarInlineSixWeeksExampleCode}
            >
              <CalendarInlineSixWeeksExample />
            </ExampleCard>
            <ExampleCard
              title="Inline Calendar with month picker and no day picker"
              code={CalendarInlineMonthOnlyExampleCode}
            >
              <CalendarInlineMonthOnlyExample />
            </ExampleCard>
            <ExampleCard
              title="Inline Calendar with date boundary (minDate, maxDate) and disabled dates (restrictedDates)"
              code={CalendarInlineDateBoundariesExampleCode}
            >
              <CalendarInlineDateBoundariesExample />
            </ExampleCard>
            <ExampleCard
              title={
                'Calendar with selectableDays = [Monday, Tuesday, Wednesday, Thursday, Friday] provided, ' +
                'first day of week = Sunday'
              }
              code={CalendarInlineContiguousWorkWeekDaysExampleCode}
            >
              <CalendarInlineContiguousWorkWeekDaysExample />
            </ExampleCard>
            <ExampleCard
              title={
                'Calendar with selectableDays = [Tuesday, Wednesday, Friday, Saturday] provided, ' +
                'first day of week = Monday'
              }
              code={CalendarInlineNonContiguousWorkWeekDaysExampleCode}
            >
              <CalendarInlineNonContiguousWorkWeekDaysExample />
            </ExampleCard>
            <ExampleCard
              title="Calendar with multiday view using dateRangeType = Day and daysToSelectInDayView = 4"
              code={CalendarInlineMultidayDayViewExampleCode}
            >
              <CalendarInlineMultidayDayViewExample />
            </ExampleCard>
            <ExampleCard
              title="Calendar with customDayCellRef applying a tooltip to each day and disabling weekends"
              code={CalendarInlineCustomDayCellRefExampleCode}
            >
              <CalendarInlineCustomDayCellRefExample />
            </ExampleCard>
            <ExampleCard title="Calendar launched from a button" code={CalendarButtonExampleCode}>
              <CalendarButtonExample highlightCurrentMonth={true} />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/date-time/src/components/Calendar/Calendar.types.ts')]}
          />
        }
        overview={
          <Markdown>
            {require<string>('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/docs/CalendarOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<
              string
            >('!raw-loader!@fluentui/react-examples/src/date-time/Calendar/docs/CalendarBestPractices.md')}
          </Markdown>
        }
      />
    );
  }
}
