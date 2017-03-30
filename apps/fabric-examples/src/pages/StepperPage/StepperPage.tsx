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
              A Stepper...
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use a Stepper when...</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t use a Stepper when...</li>
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
