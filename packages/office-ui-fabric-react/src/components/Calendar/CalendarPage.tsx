import * as React from 'react';
import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DateRangeType } from 'office-ui-fabric-react/lib/Calendar';
import { CalendarButtonExample } from './examples/Calendar.Button.Example';
import { CalendarInlineExample } from './examples/Calendar.Inline.Example';

const CalendarButtonExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Calendar/examples/Calendar.Button.Example.tsx') as string;
const CalendarInlineExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Calendar/examples/Calendar.Inline.Example.tsx') as string;

export class CalendarPage extends React.Component<IComponentDemoPageProps, any> {
  public render() {
    return (
      <ComponentPage
        title='Calendar'
        componentName='CalendarExample'
        exampleCards={
          <div>
            <ExampleCard title='Inline Calendar' code={ CalendarInlineExampleCode }>
              <CalendarInlineExample isMonthPickerVisible={ false } dateRangeType={ DateRangeType.Day } autoNavigateOnSelection={ false }
                showGoToToday={ false } />
            </ExampleCard>
            <ExampleCard title='Inline Calendar with overlayed month picker when header is clicked' code={ CalendarInlineExampleCode }>
              <CalendarInlineExample isMonthPickerVisible={ true } showMonthPickerAsOverlay={ true } highlightCurrentMonth={ true } dateRangeType={ DateRangeType.Day } autoNavigateOnSelection={ false }
                showGoToToday={ true } />
            </ExampleCard>
            <ExampleCard title='Inline Calendar with month picker' code={ CalendarInlineExampleCode }>
              <CalendarInlineExample isMonthPickerVisible={ true } dateRangeType={ DateRangeType.Day } autoNavigateOnSelection={ false }
                showGoToToday={ true } />
            </ExampleCard>
            <ExampleCard title='Inline Calendar with week selection' code={ CalendarInlineExampleCode }>
              <CalendarInlineExample isMonthPickerVisible={ true } dateRangeType={ DateRangeType.Week } autoNavigateOnSelection={ true }
                showGoToToday={ true } showNavigateButtons={ true } />
            </ExampleCard>
            <ExampleCard title='Inline Calendar with month selection' code={ CalendarInlineExampleCode }>
              <CalendarInlineExample isMonthPickerVisible={ true } dateRangeType={ DateRangeType.Month } autoNavigateOnSelection={ true }
                showGoToToday={ true } showNavigateButtons={ true } />
            </ExampleCard>
            <ExampleCard title='Inline Calendar with month picker and no day picker' code={ CalendarInlineExampleCode }>
              <CalendarInlineExample isMonthPickerVisible={ true } dateRangeType={ DateRangeType.Month } autoNavigateOnSelection={ false }
                showGoToToday={ true } highlightCurrentMonth={ true } isDayPickerVisible={ false } />
            </ExampleCard>
            <ExampleCard title='Calendar launched from a button' code={ CalendarButtonExampleCode }>
              <CalendarButtonExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Calendar/Calendar.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              The calendar component allows a user to browse through a calendar and pick a date value.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use the control as a single entity.</li>
              <li>Set the default date to the current date unless a specific date is required for context (e.g. the date of the conference).</li>
              <li>The control is designed to resize relative to available screen width. Allow it to render in either wide or narrow as appropriate.</li>
              <li>When the control is engaged, the Calendar renders as a flyout and has defined widths (300px -narrow and 440px – wide). Plan your UI implementation accordingly.</li>
              <li>The control renders date in a specific format. If allowing for manual entry of date, provide helper text in the appropriate format.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't attempt to break apart year from month/day selectors. If granularity is required, use the Dropdown control or something similar.</li>
              <li>Don't attempt to force resize the control in any way.</li>
              <li>Don't force the control to render one mode vs. the other (year or month/day)</li>
              <li>The flyout selector is a light dismiss control. Don't modify this behavior in any way.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
