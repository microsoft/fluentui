import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { StepperBasicExample } from './examples/Stepper.Basic.Example';

const StepperBasicExampleCode = require('./examples/Stepper.Basic.Example.tsx') as string;

export class StepperPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Stepper'
        componentName='StepperExample'
        exampleCards={
          <ExampleCard
            title='Various Stepper Types'
            code={ StepperBasicExampleCode }>
            <StepperBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('office-ui-fabric-react/lib/components/Stepper/Stepper.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A Stepper allows the user to incrementaly adjust a value in small steps. It is mainly used for numeric values, but other values are supported too.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use a Stepper when changing a value with precise control.</li>
              <li>Use a Stepper when values are tied to a unit.</li>
              <li>Include a label indicating what value the Stepper changes.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t use a Stepper if the range of values is large.</li>
              <li>Don’t use a Slider for binary settings.</li>
              <li>Don't use a Stepper for a range of three values or less.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/Stepper/Stepper.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
