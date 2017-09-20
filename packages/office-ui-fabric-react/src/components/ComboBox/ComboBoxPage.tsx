import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ComboBoxBasicExample } from './examples/ComboBox.Basic.Example';
import { ComboBoxCustomStyledExample } from './examples/ComboBox.CustomStyled.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ComboBoxStatus } from './ComboBox.checklist';

const ComboBoxBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.Basic.Example.tsx') as string;
const ComboBoxCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ComboBox/examples/ComboBox.CustomStyled.Example.tsx') as string;

export class ComboBoxPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='ComboBox'
        componentName='ComboBoxExample'
        exampleCards={
          <div>
            <ExampleCard title='ComboBox' code={ ComboBoxBasicExampleCode }>
              <ComboBoxBasicExample />
            </ExampleCard>
            <ExampleCard title='ComboBoxCustomStyled' code={ ComboBoxCustomStyledExampleCode }>
              <ComboBoxCustomStyledExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ComboBox/ComboBox.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A ComboBox is a list in which the selected item is always visible, and the others are visible on demand by clicking a drop-down button or by typing in the input (unless allowFreeform and autoComplete are both false). They are used to simplify the design and make a choice within the UI. When closed, only the selected item is visible. When users click the drop-down button, all the options become visible. To change the value, users open the list and click another value or use the arrow keys (up and down) to select a new value. When collapsed if autoComplete and/or allowFreeform are true, the user can select a new value by typing.
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use a ComboBox when there are multiple choices that can be collapsed under one title. Or if the list of items is long or when space is constrained.</li>
              <li>ComboBoxs contain shortened statements or words.</li>
              <li>Use a ComboBox when the selected option is more important than the alternatives (in contrast to radio buttons where all the choices are visible putting more emphasis on the other options).</li>
            </ul>
          </div>
        }
        donts={
          <div />
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/ComboBox/ComboBox.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...ComboBoxStatus}
          />
        }
      />
    );
  }
}
