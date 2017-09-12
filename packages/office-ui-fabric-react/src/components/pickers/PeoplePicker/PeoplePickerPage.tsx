import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { PeoplePickerTypesExample } from './examples/PeoplePicker.Types.Example';

const PeoplePickerTypesExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.Types.Example.tsx') as string;

export class PeoplePickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='PeoplePicker'
        componentName='PeoplePickerExample'
        exampleCards={
          <div>
            <ExampleCard title='People Pickers' code={ PeoplePickerTypesExampleCode }>
              <PeoplePickerTypesExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/BasePicker.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/PeoplePicker'> PeoplePicker </Link>
            <span> are used to pick recipients.</span>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        related={
          <a href='https://dev.office.com/fabric-js/Components/PeoplePicker/PeoplePicker.html'>Fabric JS</a>
        }
        bestPractices={
          <div>The PeoplePicker is used to select one or more entities, such as people or groups. Entry points for PeoplePickers are typically specialized TextField-like input fields known as a "well", which are used to search for recipients from a list. When a recipient is selected from the list, it is added to the well as a specialized Persona that can be interacted with or removed. Clicking on a Persona from the well should invoke a PersonaCard or open a profile pane for that recipient.</div>
        }
        dos={
          <div>
            <ul>
              <li>Use the PeoplePicker to quickly search for a few people</li>
              <li>Use the PeoplePicker to manage a group of people</li>
              <li>Use the MemberList PeoplePicker to display selections below the input box</li>
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
