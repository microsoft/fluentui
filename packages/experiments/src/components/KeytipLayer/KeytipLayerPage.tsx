import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage
} from '@uifabric/example-app-base';
import { KeytipLayerBasicExample } from './examples/KeytipLayer.Basic.Example';

export class KeytipLayerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Keytip Layer'
        componentName='KeytipLayer'
        exampleCards={
          <div>
            <ExampleCard title='KeytipLayer Basic'>
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