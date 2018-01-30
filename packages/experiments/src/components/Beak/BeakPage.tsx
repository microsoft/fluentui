import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { BeakBasicExample } from './examples/Beak.Basic.Example';
const BasicExampleCode =
  require('!raw-loader!experiments/src/components/Beak/examples/Beak.Basic.Example.tsx') as string;

export class BeakPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Beak'
        componentName='Beak'
        exampleCards={
          <div>
            <ExampleCard title='Beak Basic' isOptIn={ true } code={ BasicExampleCode }>
              <BeakBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/beak/Beak.types.ts')
            ] }
          />
        }
        overview={
          <div>
            A beak is a triangle that is attached to a Rectangular surface that aligns to a given target
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <p>Do use this</p>
        }
        donts={
          <p></p>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}