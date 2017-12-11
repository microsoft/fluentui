import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { PositioningContainerBasicExample } from './examples/PositioningContainer.Basic.Example';
const CoachmarkBasicExampleCode = require
  ('!raw-loader!experiments/src/components/PositioningContainer/examples/PositioningContainer.Basic.Example.tsx') as string;

export class PositioningContainerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Positioning Container'
        componentName='PositioningContainer'
        exampleCards={
          <div>
            <ExampleCard title='Positioning Container Basic' isOptIn={ true } code={ CoachmarkBasicExampleCode }>
              <PositioningContainerBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/PositioningContainer/PositioningContainer.types.ts')
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