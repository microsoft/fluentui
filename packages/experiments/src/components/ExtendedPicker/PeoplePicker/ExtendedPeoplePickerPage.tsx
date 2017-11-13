import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ExtendedPeoplePickerTypesExample } from '../examples/ExtendedPeoplePicker.Basic.Example';

const ExtendedPeoplePickerBasicExampleCode = require(
  '!raw-loader!experiments/src/components/ExtendedPicker/examples/ExtendedPeoplePicker.Basic.Example.tsx'
) as string;

export class ExtendedPeoplePickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='ExtendedPeoplePicker'
        componentName='ExtendedPeoplePickerExample'
        exampleCards={
          <div>
            <ExampleCard title='Extended People Picker' code={ ExtendedPeoplePickerBasicExampleCode }>
              <ExtendedPeoplePickerTypesExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/ExtendedPicker/BaseExtendedPicker.types.ts')
            ] }
          />
        }
        overview={
          <div>
            <span>ExtendedPeoplePicker are used to pick recipients. The difference between this and the current PeoplePicker are:</span>
            <ul>
              <li>Will remove selected items on backspace even if there is text in the input area</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        bestPractices={
          <div>The ExtendedPeoplePicker is used to select one or more entities, such as people or groups. Entry points for
            ExtendedPeoplePicker are
            typically specialized TextField-like input fields known as a "well", which are used to search for recipients from a list. When
            a recipient is selected from the list, it is added to the well as a specialized Persona that can be interacted with or removed.
            Clicking on a Persona from the well should invoke a PersonaCard or open a profile pane for that recipient.</div>
        }
        dos={
          <div>
            <ul>
              <li>Use the ExtendedPeoplePicker to quickly search for a few people</li>
              <li>Use the ExtendedPeoplePicker to manage a group of people</li>
              <li>Use defaultSelectedItems when some people have already been selected</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use the ExtendedPeoplePicker to select something other than people</li>
              <li>Use the ExtendedPeoplePicker to only display people</li>
              <li>Use the ExtendedPeoplePicker without sufficient space</li>
            </ul>
          </div>
        }
      />
    );
  }

}