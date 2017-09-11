import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  ComponentStatus
} from '@uifabric/example-app-base';
import { LabelBasicExample } from './examples/Label.Basic.Example';
import { ComponentStatusState } from '../ComponentStatus/ComponentStatusState';

const LabelBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Label/examples/Label.Basic.Example.tsx') as string;

export class LabelPage extends React.Component<IComponentDemoPageProps, any> {
  public render() {
    return (
      <ComponentPage
        title='Label'
        componentName='LabelExample'
        exampleCards={
          <ExampleCard title='Label' code={ LabelBasicExampleCode }>
            <LabelBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Label/Label.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Labels give a name or title to a component or group of components. Labels should be in close proximity to the component or group they are paired with. Some components, such as TextField, Dropdown, or Toggle, already have Labels incorporated, but other components may optionally add a Label if it helps inform the user of the component’s purpose.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use sentence casing, e.g. “First name”.</li>
              <li>Be short and concise.</li>
              <li>When adding a Label to components, use the text as a noun or short noun phrase.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use Labels as instructional text, e.g. “Click to get started”.</li>
              <li>Don’t use full sentences or complex punctuation (colons, semicolons, etc.).</li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/Label/Label.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...ComponentStatusState.Label}
          >
          </ComponentStatus>
        }
      >
      </ComponentPage>
    );
  }
}
