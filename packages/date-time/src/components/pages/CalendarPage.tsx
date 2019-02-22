import * as React from 'react';
import { ExampleCard, ComponentPage, PropertiesTableSet, PageMarkdown } from '@uifabric/example-app-base';
import { DateRangeType, DayOfWeek } from '../Calendar/Calendar.types';
import { CalendarButtonExample } from '../Calendar/examples/Calendar.Button.Example';
import { CalendarInlineExample } from '../Calendar/examples/Calendar.Inline.Example';
import { addMonths, addYears, addDays } from '../../utilities/dateMath/DateMath';

const CalendarButtonExampleCode = require('!raw-loader!@uifabric/date-time/src/components/Calendar/examples/Calendar.Button.Example.tsx') as string;
const CalendarButtonExampleCodepen = require('!raw-loader!@uifabric/date-time/lib/codepen/components/Calendar/Calendar.Button.Example.Codepen.txt') as string;
const CalendarInlineExampleCode = require('!raw-loader!@uifabric/date-time/src/components/Calendar/examples/Calendar.Inline.Example.tsx') as string;
const CalendarInlineExampleCodepen = require('!raw-loader!@uifabric/date-time/lib/codepen/components/Calendar/Calendar.Inline.Example.Codepen.txt') as string;

const today = new Date(Date.now());

export class CalendarPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Calendar"
        componentName="Calendar"
        exampleCards={
          <div>
            <ExampleCard title="Inline Calendar" code={CalendarInlineExampleCode} codepenJS={CalendarInlineExampleCodepen}>
              <CalendarInlineExample
                isMonthPickerVisible={false}
                dateRangeType={DateRangeType.Day}
                autoNavigateOnSelection={false}
                showGoToToday={true}
              />
            </ExampleCard>
            <ExampleCard title="Inline Calendar with overlayed month picker when header is clicked" code={CalendarInlineExampleCode}>
              <CalendarInlineExample
                showMonthPickerAsOverlay={true}
                highlightCurrentMonth={false}
                highlightSelectedMonth={true}
                dateRangeType={DateRangeType.Day}
                autoNavigateOnSelection={false}
                showGoToToday={false}
              />
            </ExampleCard>
            <ExampleCard title="Inline Calendar with month picker" code={CalendarInlineExampleCode}>
              <CalendarInlineExample
                dateRangeType={DateRangeType.Day}
                autoNavigateOnSelection={false}
                highlightCurrentMonth={false}
                highlightSelectedMonth={true}
                showGoToToday={true}
              />
            </ExampleCard>
            <ExampleCard title="Inline Calendar with week selection" code={CalendarInlineExampleCode}>
              <CalendarInlineExample
                dateRangeType={DateRangeType.Week}
                autoNavigateOnSelection={true}
                highlightCurrentMonth={false}
                highlightSelectedMonth={true}
                showGoToToday={true}
                showNavigateButtons={true}
              />
            </ExampleCard>
            <ExampleCard title="Inline Calendar with month selection" code={CalendarInlineExampleCode}>
              <CalendarInlineExample
                dateRangeType={DateRangeType.Month}
                autoNavigateOnSelection={true}
                highlightCurrentMonth={false}
                highlightSelectedMonth={true}
                showGoToToday={true}
                showNavigateButtons={true}
              />
            </ExampleCard>
            <ExampleCard title="Inline Calendar with week numbers" code={CalendarInlineExampleCode}>
              <CalendarInlineExample
                isMonthPickerVisible={false}
                dateRangeType={DateRangeType.Day}
                autoNavigateOnSelection={false}
                showGoToToday={true}
                showWeekNumbers={true}
              />
            </ExampleCard>
            <ExampleCard title="Inline Calendar with 6 weeks display by default" code={CalendarInlineExampleCode}>
              <CalendarInlineExample
                isMonthPickerVisible={false}
                dateRangeType={DateRangeType.Day}
                autoNavigateOnSelection={false}
                showGoToToday={true}
                showSixWeeksByDefault={true}
              />
            </ExampleCard>
            <ExampleCard title="Inline Calendar with month picker and no day picker" code={CalendarInlineExampleCode}>
              <CalendarInlineExample
                dateRangeType={DateRangeType.Month}
                autoNavigateOnSelection={false}
                showGoToToday={true}
                highlightCurrentMonth={false}
                highlightSelectedMonth={true}
                isDayPickerVisible={false}
              />
            </ExampleCard>
            <ExampleCard
              title="Inline Calendar with date boundary (minDate, maxDate) and disabled dates (restrictedDates)"
              code={CalendarInlineExampleCode}
            >
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
            </ExampleCard>
            <ExampleCard
              title="Calendar with selectableDays = [Tuesday, Wednesday, Friday, Saturday] provided, first day of week = Monday"
              code={CalendarInlineExampleCode}
            >
              <CalendarInlineExample
                dateRangeType={DateRangeType.WorkWeek}
                firstDayOfWeek={DayOfWeek.Monday}
                autoNavigateOnSelection={true}
                highlightCurrentMonth={false}
                highlightSelectedMonth={true}
                showGoToToday={true}
                workWeekDays={[DayOfWeek.Tuesday, DayOfWeek.Saturday, DayOfWeek.Wednesday, DayOfWeek.Friday]}
              />
            </ExampleCard>
            <ExampleCard title="Calendar launched from a button" code={CalendarButtonExampleCode} codepenJS={CalendarButtonExampleCodepen}>
              <CalendarButtonExample highlightCurrentMonth={true} />
            </ExampleCard>
            <ExampleCard title="Month picker launched from a button" code={CalendarButtonExampleCode}>
              <CalendarButtonExample
                isDayPickerVisible={false}
                highlightCurrentMonth={false}
                highlightSelectedMonth={true}
                buttonString={'Click for Month Picker'}
              />
            </ExampleCard>
            <ExampleCard title="Calendar with overlayed month picker launched from a button" code={CalendarButtonExampleCode}>
              <CalendarButtonExample
                showMonthPickerAsOverlay={true}
                highlightCurrentMonth={false}
                highlightSelectedMonth={true}
                buttonString={'Click for Overlayed Day Picker and Month Picker'}
              />
            </ExampleCard>
            <ExampleCard
              title="Calendar with overlayed month picker launched from a button without show go to today button"
              code={CalendarButtonExampleCode}
            >
              <CalendarButtonExample
                showMonthPickerAsOverlay={true}
                showGoToToday={false}
                highlightCurrentMonth={false}
                highlightSelectedMonth={true}
                buttonString={'Click for Overlayed Day Picker and Month Picker without go to today button'}
              />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/date-time/src/components/Calendar/Calendar.types.ts')]} />
        }
        overview={
          <PageMarkdown>{require<string>('!raw-loader!@uifabric/date-time/src/components/Calendar/docs/CalendarOverview.md')}</PageMarkdown>
        }
        bestPractices={<div />}
        dos={<PageMarkdown>{require<string>('!raw-loader!@uifabric/date-time/src/components/Calendar/docs/CalendarDos.md')}</PageMarkdown>}
        donts={
          <PageMarkdown>{require<string>('!raw-loader!@uifabric/date-time/src/components/Calendar/docs/CalendarDonts.md')}</PageMarkdown>
        }
      />
    );
  }
}
