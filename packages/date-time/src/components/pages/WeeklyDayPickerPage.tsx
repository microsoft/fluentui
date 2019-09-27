import * as React from 'react';
import { ExampleCard, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { WeeklyDayPickerInlineExample } from '../WeeklyDayPicker/examples/WeeklyDayPicker.Inline.Example';
import { WeeklyDayPickerInlineExpandableExample } from '../WeeklyDayPicker/examples/WeeklyDayPicker.Inline.Expandable.Example';

const WeeklyDayPickerInlineExampleCode = require('!raw-loader!@uifabric/date-time/src/components/WeeklyDayPicker/examples/WeeklyDayPicker.Inline.Example.tsx') as string;
const WeeklyDayPickerInlineExpandableExampleCode = require('!raw-loader!@uifabric/date-time/src/components/WeeklyDayPicker/examples/WeeklyDayPicker.Inline.Expandable.Example.tsx') as string;

export class WeeklyDayPickerPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="WeeklyDayPicker"
        componentName="WeeklyDayPicker"
        exampleCards={
          <div>
            <ExampleCard title="Inline WeeklyDayPicker" code={WeeklyDayPickerInlineExampleCode}>
              <WeeklyDayPickerInlineExample />
            </ExampleCard>
            <ExampleCard title="Inline WeeklyDayPicker with externally controlled date" code={WeeklyDayPickerInlineExampleCode}>
              <WeeklyDayPickerInlineExample showNavigateButtons={true} />
            </ExampleCard>
            <ExampleCard
              title="Inline WeeklyDayPicker that can be expanded to full month picker"
              code={WeeklyDayPickerInlineExpandableExampleCode}
            >
              <WeeklyDayPickerInlineExpandableExample showExpandButton={true} weeksToShow={6} />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/date-time/src/components/WeeklyDayPicker/WeeklyDayPicker.types.ts')]}
          />
        }
      />
    );
  }
}
