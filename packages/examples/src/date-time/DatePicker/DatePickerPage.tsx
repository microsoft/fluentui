import * as React from 'react';
import { DatePickerBasicExample } from './DatePicker.Basic.Example';
import { DatePickerDisabledExample } from './DatePicker.Disabled.Example';
import { DatePickerWeekNumbersExample } from './DatePicker.WeekNumbers.Example';
import { DatePickerRequiredExample } from './DatePicker.Required.Example';
import { DatePickerInputExample } from './DatePicker.Input.Example';
import { DatePickerFormatExample } from './DatePicker.Format.Example';
import { DatePickerBoundedExample } from './DatePicker.Bounded.Example';
import { ExampleCard, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { Markdown } from '@uifabric/example-app-base/lib/index2';

const DatePickerBasicExampleCode = require('!raw-loader!@fluentui/examples/src/date-time/DatePicker/DatePicker.Basic.Example.tsx') as string;
const DatePickerDisabledExampleCode = require('!raw-loader!@fluentui/examples/src/date-time/DatePicker/DatePicker.Disabled.Example.tsx') as string;
const DatePickerWeekNumbersExampleCode = require('!raw-loader!@fluentui/examples/src/date-time/DatePicker/DatePicker.WeekNumbers.Example.tsx') as string;
const DatePickerRequiredExampleCode = require('!raw-loader!@fluentui/examples/src/date-time/DatePicker/DatePicker.Required.Example.tsx') as string;
const DatePickerInputExampleCode = require('!raw-loader!@fluentui/examples/src/date-time/DatePicker/DatePicker.Input.Example.tsx') as string;
const DatePickerFormatExampleCode = require('!raw-loader!@fluentui/examples/src/date-time/DatePicker/DatePicker.Format.Example.tsx') as string;
const DatePickerBoundedExampleCode = require('!raw-loader!@fluentui/examples/src/date-time/DatePicker/DatePicker.Bounded.Example.tsx') as string;

export class DatePickerPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="DatePicker"
        componentName="DatePicker"
        exampleCards={
          <div>
            <ExampleCard title="Default DatePicker" code={DatePickerBasicExampleCode}>
              <DatePickerBasicExample />
            </ExampleCard>
            <ExampleCard title="Disabled DatePicker" code={DatePickerDisabledExampleCode}>
              <DatePickerDisabledExample />
            </ExampleCard>
            <ExampleCard title="DatePicker with week numbers" code={DatePickerWeekNumbersExampleCode}>
              <DatePickerWeekNumbersExample />
            </ExampleCard>
            <ExampleCard title="DatePicker with required field" code={DatePickerRequiredExampleCode}>
              <DatePickerRequiredExample />
            </ExampleCard>
            <ExampleCard title="DatePicker allows input date string" code={DatePickerInputExampleCode}>
              <DatePickerInputExample />
            </ExampleCard>
            <ExampleCard title="DatePicker allows dates to be formatted" code={DatePickerFormatExampleCode}>
              <DatePickerFormatExample />
            </ExampleCard>
            <ExampleCard title="DatePicker with date boundary (minDate, maxDate)" code={DatePickerBoundedExampleCode}>
              <DatePickerBoundedExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/date-time/src/components/DatePicker/DatePicker.types.ts')]}
          />
        }
        overview={
          <Markdown>
            {require<string>('!raw-loader!@fluentui/examples/src/date-time/DatePicker/docs/DatePickerOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader!@fluentui/examples/src/date-time/DatePicker/docs/DatePickerBestPractices.md')}
          </Markdown>
        }
      />
    );
  }
}
