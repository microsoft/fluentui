import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage
} from '@uifabric/example-app-base';

import { ChicletBasicExample } from './examples/Chiclet.Basic.Example';
const ChicletBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Chiclet/examples/Chiclet.Basic.Example.tsx') as string;

export class ChicletPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Chiclet'
        componentName='Chiclet'
        exampleCards={
          <div>
            <ExampleCard title='Chiclet' isOptIn={ true } code={ ChicletBasicExampleCode }>
              <ChicletBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <div />
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
              <li>Use them to represent an item in a card with relevant metadata.</li>
            </ul>
          </div>
        }
        donts={ // @todo: fill in description
          <div>
            <ul>
              <li></li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
