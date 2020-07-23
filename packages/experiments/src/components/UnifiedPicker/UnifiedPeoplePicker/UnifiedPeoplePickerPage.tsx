import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { UnifiedPeoplePickerExample } from './examples/UnifiedPeoplePicker.Example';
const UnifiedPeoplePickerExampleCode = require('!raw-loader!./examples/UnifiedPeoplePicker.Example') as string;

import { UnifiedPeoplePickerDragDropExample } from './examples/UnifiedPeoplePicker.DragDrop.Example';
const UnifiedPeoplePickerDragDropExampleCode = require('!raw-loader!./examples/UnifiedPeoplePicker.DragDrop.Example') as string;

export class UnifiedPeoplePickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="UnifiedPeoplePicker"
        componentName="UnifiedPeoplePicker"
        exampleCards={
          <div>
            <ExampleCard title="Basic" isOptIn={true} code={UnifiedPeoplePickerExampleCode}>
              <UnifiedPeoplePickerExample />
            </ExampleCard>
            <ExampleCard title="DragDrop" isOptIn={true} code={UnifiedPeoplePickerDragDropExampleCode}>
              <UnifiedPeoplePickerDragDropExample />
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
