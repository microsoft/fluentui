import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  ComponentStatus
} from '@uifabric/example-app-base';
import { SpinButtonBasicExample } from './examples/SpinButton.Basic.Example';
import { SpinButtonBasicDisabledExample } from './examples/SpinButton.BasicDisabled.Example';
import { SpinButtonStatefulExample } from './examples/SpinButton.Stateful.Example';
import { SpinButtonBasicWithIconExample } from './examples/SpinButton.BasicWithIcon.Example';
import { SpinButtonBasicWithEndPositionExample } from './examples/SpinButton.BasicWithEndPosition.Example';
import { SpinButtonCustomStyledExample } from './examples/SpinButton.CustomStyled.Example';
import { ComponentStatusState } from '../ComponentStatusState';

const SpinButtonBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Basic.Example.tsx') as string;
const SpinButtonBasicDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicDisabled.Example.tsx') as string;
const SpinButtonStatefulExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Stateful.Example.tsx') as string;
const SpinButtonBasicWithIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithIcon.Example.tsx') as string;
const SpinButtonBasicWithEndPositionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithEndPosition.Example.tsx') as string;
const SpinButtonCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.CustomStyled.Example.tsx') as string;

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
              title={ 'Basic Disabled SpinButton' }
              code={ SpinButtonBasicDisabledExampleCode }>
              <SpinButtonBasicDisabledExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Stateful SpinButton' }
              code={ SpinButtonBasicExampleCode }>
              <SpinButtonStatefulExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Basic SpinButton With Icon' }
              code={ SpinButtonBasicWithIconExampleCode }>
              <SpinButtonBasicWithIconExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Basic SpinButton With Icon and Positioned at the End' }
              code={ SpinButtonBasicWithEndPositionExampleCode }>
              <SpinButtonBasicWithEndPositionExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Custom Styled SpinButton' }
              code={ SpinButtonCustomStyledExampleCode }>
              <SpinButtonCustomStyledExample />
            </ExampleCard>

          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/SpinButton.Props.ts')
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
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...ComponentStatusState.Button}>
          </ComponentStatus>
        }>
      </ComponentPage>
    );
  }
}
