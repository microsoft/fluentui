import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { UnifiedPeoplePickerExample, DoubleUnifiedPeoplePickerExample } from './examples/UnifiedPeoplePicker.Example';

const UnifiedPeoplePickerExampleCode = require('!raw-loader!./examples/UnifiedPeoplePicker.Example') as string;

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

            <ExampleCard title="Double Well" isOptIn={true} code={UnifiedPeoplePickerExampleCode}>
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
