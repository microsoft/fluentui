import * as React from 'react';
import { ExampleCard, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { DateRangeType } from '../Calendar/Calendar.types';
import { WeeklyDayPickerInlineExample } from '../WeeklyDayPicker/examples/WeeklyDayPicker.Inline.Example';

const WeeklyDayPickerInlineExampleCode = require('!raw-loader!@uifabric/date-time/src/components/WeeklyDayPicker/examples/WeeklyDayPicker.Inline.Example.tsx') as string;
const WeeklyDayPickerInlineExampleCodepen = require('!@uifabric/codepen-loader!@uifabric/date-time/src/components/WeeklyDayPicker/examples/WeeklyDayPicker.Inline.Example.tsx') as string;

export class WeeklyDayPickerPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="WeeklyDayPicker"
        componentName="WeeklyDayPicker"
        exampleCards={
          <div>
            <ExampleCard
              title="Inline WeeklyDayPicker"
              code={WeeklyDayPickerInlineExampleCode}
              codepenJS={WeeklyDayPickerInlineExampleCodepen}
            >
              <WeeklyDayPickerInlineExample
                isMonthPickerVisible={false}
                dateRangeType={DateRangeType.Day}
                autoNavigateOnSelection={false}
                showGoToToday={true}
              />
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
