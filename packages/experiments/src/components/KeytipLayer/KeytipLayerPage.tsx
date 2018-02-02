import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage
} from '@uifabric/example-app-base';
import { KeytipLayerBasicExample } from './examples/KeytipLayer.Basic.Example';

const KeytipLayerBasicExampleCode = require(
  '!raw-loader!experiments/src/components/KeytipLayer/examples/KeytipLayer.Basic.Example.tsx'
) as string;

export class KeytipLayerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Keytip Layer'
        componentName='KeytipLayer'
        exampleCards={
          <div>
            <ExampleCard title='KeytipLayerBasic Example' code={ KeytipLayerBasicExampleCode }>
              <KeytipLayerBasicExample />
            </ExampleCard>
          </div>
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