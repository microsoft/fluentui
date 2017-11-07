import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { DynamicallyPositionedContainerBasicExample } from './examples/DynamicallyPositionedContainer.Basic.Example';
const CoachmarkBasicExampleCode = require('!raw-loader!experiments/src/components/DynamicallyPositionedContainer/examples/DynamicallyPositionedContainer.Basic.Example.tsx') as string;

export class DynamicallyPositionedContainerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Callout Container'
        componentName='DynamicallyPositionedContainer'
        exampleCards={
          <div>
            <ExampleCard title='Callout Container Basic' isOptIn={ true } code={ CoachmarkBasicExampleCode }>
              <DynamicallyPositionedContainerBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/DynamicallyPositionedContainer/DynamicallyPositionedContainer.Props.ts')
            ] }
          />
        }
        overview={
          <div />
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>@TODO Add dos</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>@TODO Add dos</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}