import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage } from '@uifabric/example-app-base';

import { StackBasicExample } from './examples/Stack.Basic.Example';
const StackBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Basic.Example.tsx') as string;

export class StackPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Stack"
        componentName="Stack"
        exampleCards={
          <div>
            <ExampleCard title="Basic Stack Component Example" code={StackBasicExampleCode}>
              <StackBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={<div />}
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
