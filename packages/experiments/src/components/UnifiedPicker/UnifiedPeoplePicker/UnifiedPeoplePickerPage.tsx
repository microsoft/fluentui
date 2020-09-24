import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { UnifiedPeoplePickerExample } from './examples/UnifiedPeoplePicker.Example';
import { UnifiedPeoplePickerWithEditExample } from './examples/UnifiedPeoplePicker.WithEdit.Example';
import { DoubleUnifiedPeoplePickerExample } from './examples/DoubleUnifiedPeoplePicker.Example';

const UnifiedPeoplePickerExampleCode = require('!raw-loader!./examples/UnifiedPeoplePicker.Example') as string;
const UnifiedPeoplePickerWithEditExampleCode = require('!raw-loader!./examples/UnifiedPeoplePicker.WithEdit.Example') as string;
const DoubleUnifiedPeoplePickerExampleCode = require('!raw-loader!./examples/DoubleUnifiedPeoplePicker.Example') as string;

export class UnifiedPeoplePickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="UnifiedPeoplePicker"
        componentName="UnifiedPeoplePicker"
        exampleCards={
          <div>
            <ExampleCard title="Single Well" isOptIn={true} code={UnifiedPeoplePickerExampleCode}>
              <UnifiedPeoplePickerExample />
            </ExampleCard>

            <ExampleCard title="Single Well" isOptIn={true} code={UnifiedPeoplePickerWithEditExampleCode}>
              <UnifiedPeoplePickerWithEditExample />
            </ExampleCard>

            <ExampleCard title="Double Well" isOptIn={true} code={DoubleUnifiedPeoplePickerExampleCode}>
              <DoubleUnifiedPeoplePickerExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader!@uifabric/experiments/src/components/UnifiedPicker/UnifiedPeoplePicker/UnifiedPeoplePicker.types.ts'),
            ]}
          />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use this component to pick people only</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use this component to pick anything other than people</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
