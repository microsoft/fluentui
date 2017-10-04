import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ExtendedPeoplePickerTypesExample } from '../PeoplePicker/examples/ExtendedPeoplePicker.Basic.Example';

const PeoplePickerTypesExampleCode = require('!raw-loader!experiments/src/components/ExtendedPicker/PeoplePicker/examples/ExtendedPeoplePicker.Basic.Example.tsx') as string;

export class BaseWellPickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='WellPeoplePicker'
        componentName='PeoplePickerExample'
        exampleCards={
          <div>
            <ExampleCard title='People Pickers' code={ PeoplePickerTypesExampleCode }>
              <ExtendedPeoplePickerTypesExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/ExtendedPicker/BaseWellPicker.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <span> WellPeoplePicker are used to pick recipients. The difference between this and the PeoplePicker currently are:</span>
            <ul>
              <li>Will show suggestions on empty query</li>
              <li>Will remove selected items on backspace even if there is text in the input area</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        bestPractices={
          <div>The PeoplePicker is used to select one or more entities, such as people or groups. Entry points for PeoplePickers are typically specialized TextField-like input fields known as a "well", which are used to search for recipients from a list. When a recipient is selected from the list, it is added to the well as a specialized Persona that can be interacted with or removed. Clicking on a Persona from the well should invoke a PersonaCard or open a profile pane for that recipient.</div>
        }
        dos={
          <div>
            <ul>
              <li>Use the PeoplePicker to quickly search for a few people</li>
              <li>Use the PeoplePicker to manage a group of people</li>
              <li>Use defaultSelectedItems when some people have already been selected</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use the PeoplePicker to select something other than people</li>
              <li>Use the PeoplePicker to only display people</li>
              <li>Use the PeoplePicker without sufficient space</li>
            </ul>
          </div>
        }
      />
    );
  }

}