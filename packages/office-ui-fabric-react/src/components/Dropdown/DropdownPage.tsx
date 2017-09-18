import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DropdownBasicExample } from './examples/Dropdown.Basic.Example';
import { DropdownCustomExample } from './examples/Dropdown.Custom.Example';

const DropdownBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Basic.Example.tsx') as string;
const DropdownCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Custom.Example.tsx') as string;

export class DropdownPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Dropdown'
        componentName='DropdownExample'
        exampleCards={
          <div>
            <ExampleCard title='Dropdown' code={ DropdownBasicExampleCode }>
              <DropdownBasicExample />
            </ExampleCard>

            <ExampleCard title='Customized Dropdown' code={ DropdownCustomExampleCode }>
              <DropdownCustomExample />
            </ExampleCard>

          </div>

        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/Dropdown.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A Dropdown is a list in which the selected item is always visible, and the others are visible on demand by clicking a drop-down button. They are used to simplify the design and make a choice within the UI. When closed, only the selected item is visible. When users click the drop-down button, all the options become visible. To change the value, users open the list and click another value or use the arrow keys (up and down) to select a new value.
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use a Dropdown when there are multiple choices that can be collapsed under one title. Or if the list of items is long or when space is constrained.</li>
              <li>Dropdowns contain shortened statements or words.</li>
              <li>Use a Dropdown when the selected option is more important than the alternatives (in contrast to radio buttons where all the choices are visible putting more emphasis on the other options).</li>
            </ul>
          </div>
        }
        donts={
          <div />
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}