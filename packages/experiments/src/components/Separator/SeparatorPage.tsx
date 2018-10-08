import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { SeparatorBasicExample } from './examples/Separator.Basic.Example';
const SeparatorBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Separator/examples/Separator.Basic.Example.tsx') as string;
import { SeparatorThemingExample } from './examples/Separator.Theming.Example';
const SeparatorThemingExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Separator/examples/Separator.Theming.Example.tsx') as string;

export class SeparatorPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Separator"
        componentName="Separator"
        exampleCards={
          <div>
            <ExampleCard title="Basic Separator with Text" isOptIn={true} code={SeparatorBasicExampleCode}>
              <SeparatorBasicExample />
            </ExampleCard>
            <ExampleCard title="Basic Themed Separator with Text" isOptIn={true} code={SeparatorThemingExampleCode}>
              <SeparatorThemingExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Separator/Separator.types.ts')]}
          />
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
          // @todo: fill in description
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
