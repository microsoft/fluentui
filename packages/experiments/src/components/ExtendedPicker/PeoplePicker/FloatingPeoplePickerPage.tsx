import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { FloatingPeoplePickerTypesExample } from '../PeoplePicker/examples/FloatingPeoplePicker.Basic.Example';

const FloatingPeoplePickerBasicExampleCode = require('!raw-loader!experiments/src/components/ExtendedPicker/PeoplePicker/examples/FloatingPeoplePicker.Basic.Example.tsx') as string;

export class FloatingPeoplePickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='FloatingPeoplePicker'
        componentName='FloatingPeoplePickerExample'
        exampleCards={
          <div>
            <ExampleCard title='Floating People Picker' code={ FloatingPeoplePickerBasicExampleCode }>
              <FloatingPeoplePickerTypesExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/ExtendedPicker/BaseFloatingPicker.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <span> FloatingPeoplePicker are used to pick recipients but do not need a well or necessarily keep track of selected people</span>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        bestPractices={
          <div>The FloatingPeoplePicker is used to select one or more entities, such as people or groups. Entry points for PeoplePickers are typically specialized TextField-like input fields known as a "well", which are used to search for recipients from a list. When a recipient is selected from the list, it is added to the well as a specialized Persona that can be interacted with or removed. Clicking on a Persona from the well should invoke a PersonaCard or open a profile pane for that recipient.</div>
        }
        dos={
          <div>
            <ul>
              <li>Use the FloatingPeoplePicker to quickly search for a few people</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use the FloatingPeoplePicker to select something other than people</li>
              <li>Use the FloatingPeoplePicker without sufficient space</li>
            </ul>
          </div>
        }
      />
    );
  }

}