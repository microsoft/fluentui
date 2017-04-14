import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { SpinButtonBasicExample } from './examples/SpinButton.Basic.Example';
import { SpinButtonStatefulExample } from './examples/SpinButton.Stateful.Example';

const SpinButtonBasicExampleCode = require('./examples/SpinButton.Basic.Example.tsx') as string;
const SpinButtonStatefulExampleCode = require('./examples/SpinButton.Stateful.Example.tsx') as string;

export class SpinButtonPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='SpinButton'
        componentName='SpinButtonExample'
        exampleCards={
          <div>
            <ExampleCard
              title={ 'Basic SpinButton' }
              code={ SpinButtonBasicExampleCode }>
              <SpinButtonBasicExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Stateful SpinButton' }
              code={ SpinButtonBasicExampleCode }>
              <SpinButtonStatefulExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('office-ui-fabric-react/lib/components/SpinButton/SpinButton.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A SpinButton allows the user to incrementaly adjust a value in small steps. It is mainly used for numeric values, but other values are supported too.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use a SpinButton when changing a value with precise control.</li>
              <li>Use a SpinButton when values are tied to a unit.</li>
              <li>Include a label indicating what value the SpinButton changes.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t use a SpinButton if the range of values is large.</li>
              <li>Don’t use a SpinButton for binary settings.</li>
              <li>Don't use a SpinButton for a range of three values or less.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/SpinButton/SpinButton.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
