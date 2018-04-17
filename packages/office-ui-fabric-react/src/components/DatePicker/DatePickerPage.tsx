import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';
import { DatePickerBasicExample } from './examples/DatePicker.Basic.Example';
import { DatePickerWeekNumbersExample } from './examples/DatePicker.WeekNumbers.Example';
import { DatePickerRequiredExample } from './examples/DatePicker.Required.Example';
import { DatePickerInputExample } from './examples/DatePicker.Input.Example';
import { DatePickerFormatExample } from './examples/DatePicker.Format.Example';
import { DatePickerBoundedExample } from './examples/DatePicker.Bounded.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { DatePickerStatus } from './DatePicker.checklist';

const DatePickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Basic.Example.tsx') as string;
const DatePickerWeekNumbersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.WeekNumbers.Example.tsx') as string;
const DatePickerRequiredExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Required.Example.tsx') as string;
const DatePickerInputExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Input.Example.tsx') as string;
const DatePickerFormatExampleCode = require
  ('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Format.Example.tsx') as string;
const DatePickerBoundedExampleCode = require
  ('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Bounded.Example.tsx') as string;

export class DatePickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='DatePicker'
        componentName='DatePickerExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DatePicker'
        exampleCards={
          <div>
            <ExampleCard title='Default DatePicker' code={ DatePickerBasicExampleCode }>
              <DatePickerBasicExample />
            </ExampleCard>
            <ExampleCard title='DatePicker with week numbers' code={ DatePickerWeekNumbersExampleCode }>
              <DatePickerWeekNumbersExample />
            </ExampleCard>
            <ExampleCard title='DatePicker with required field' code={ DatePickerRequiredExampleCode }>
              <DatePickerRequiredExample />
            </ExampleCard>
            <ExampleCard title='DatePicker allows input date string' code={ DatePickerInputExampleCode }>
              <DatePickerInputExample />
            </ExampleCard>
            <ExampleCard title='DatePicker allows dates to be formatted' code={ DatePickerFormatExampleCode }>
              <DatePickerFormatExample />
            </ExampleCard>
            <ExampleCard title='DatePicker with date boundary (minDate, maxDate)' code={ DatePickerBoundedExampleCode }>
              <DatePickerBoundedExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/DatePicker/DatePicker.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/DatePicker/docs/DatePickerOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/DatePicker/docs/DatePickerDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/DatePicker/docs/DatePickerDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...DatePickerStatus }
          />
        }
      />
    );
  }
}
