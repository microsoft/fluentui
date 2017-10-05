import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { WellPeoplePickerTypesExample } from '../PeoplePicker/examples/WellPeoplePicker.Basic.Example';

const WellPeoplePickerBasicExampleCode = require('!raw-loader!experiments/src/components/ExtendedPicker/PeoplePicker/examples/WellPeoplePicker.Basic.Example.tsx') as string;

export class WellPeoplePickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='WellPeoplePicker'
        componentName='WellPeoplePickerExample'
        exampleCards={
          <div>
            <ExampleCard title='Well People Picker' code={ WellPeoplePickerBasicExampleCode }>
              <WellPeoplePickerTypesExample />
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
            <span> WellPeoplePicker are used to pick recipients. The difference between this and the current PeoplePicker are:</span>
            <ul>
              <li>Will show suggestions on empty query</li>
              <li>Will remove selected items on backspace even if there is text in the input area</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        bestPractices={
          <div>The WellPeoplePicker is used to select one or more entities, such as people or groups. Entry points for WellPeoplePicker are typically specialized TextField-like input fields known as a "well", which are used to search for recipients from a list. When a recipient is selected from the list, it is added to the well as a specialized Persona that can be interacted with or removed. Clicking on a Persona from the well should invoke a PersonaCard or open a profile pane for that recipient.</div>
        }
        dos={
          <div>
            <ul>
              <li>Use the WellPeoplePicker to quickly search for a few people</li>
              <li>Use the WellPeoplePicker to manage a group of people</li>
              <li>Use defaultSelectedItems when some people have already been selected</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use the WellPeoplePicker to select something other than people</li>
              <li>Use the WellPeoplePicker to only display people</li>
              <li>Use the WellPeoplePicker without sufficient space</li>
            </ul>
          </div>
        }
      />
    );
  }

}