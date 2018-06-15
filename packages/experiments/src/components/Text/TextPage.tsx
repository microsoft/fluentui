import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { TextBasicExample } from './examples/Text.Basic.Example';
const TextBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Text/examples/Text.Basic.Example.tsx') as string;

export class TextPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Text"
        componentName="Text"
        exampleCards={
          <div>
            <ExampleCard title="Basic Text Component Example" code={TextBasicExampleCode}>
              <TextBasicExample />
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
