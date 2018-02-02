import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage
} from '@uifabric/example-app-base';
import { KeytipBasicExample } from './examples/Keytip.Basic.Example';

export class KeytipPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Keytip'
        componentName='Keytip'
        exampleCards={
          <div>
            <ExampleCard title='Keytip Basic'>
              <KeytipBasicExample />
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