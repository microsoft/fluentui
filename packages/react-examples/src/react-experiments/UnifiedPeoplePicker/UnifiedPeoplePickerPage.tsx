import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';
import { UnifiedPeoplePickerExample } from './UnifiedPeoplePicker.Example';
import { UnifiedPeoplePickerWithEditExample } from './UnifiedPeoplePicker.WithEdit.Example';
import { DoubleUnifiedPeoplePickerExample } from './DoubleUnifiedPeoplePicker.Example';

const UnifiedPeoplePickerExampleCode = require('!raw-loader?esModule=false!./UnifiedPeoplePicker.Example') as string;
const UnifiedPeoplePickerWithEditExampleCode =
  require('!raw-loader?esModule=false!./UnifiedPeoplePicker.WithEdit.Example') as string;
const DoubleUnifiedPeoplePickerExampleCode =
  require('!raw-loader?esModule=false!./DoubleUnifiedPeoplePicker.Example') as string;

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
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/UnifiedPicker/UnifiedPeoplePicker/UnifiedPeoplePicker.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
