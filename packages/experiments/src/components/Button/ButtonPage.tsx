import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { ButtonExample } from './examples/Button.Example';
const ButtonExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Example.tsx') as string;

export class ButtonPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title=" Button"
        componentName=" Button"
        exampleCards={
          <div>
            <ExampleCard title=" Button Ramps" code={ButtonExampleCode}>
              <ButtonExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Button/Button.types.tsx')]} />
        }
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
