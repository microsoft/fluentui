import * as React from 'react';
import { ExampleCard, ComponentPage, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { VirtualizedListBasicExample } from './examples/VirtualizedList.Basic.Example';
import { VirtualizedListBasicExample2 } from './examples/VirtualizedList.Basic2.Example';

const VirtualizedListBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/VirtualizedList/examples/VirtualizedList.Basic.Example.tsx') as string;
const VirtualizedListBasicExample2Code = require('!raw-loader!@uifabric/experiments/src/components/VirtualizedList/examples/VirtualizedList.Basic2.Example.tsx') as string;

export class VirtualizedListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="VirtualizedList"
        componentName="VirtualizedListExample"
        exampleCards={
          <div>
            <ExampleCard title="VirtualizedList" code={VirtualizedListBasicExampleCode}>
              <VirtualizedListBasicExample />
            </ExampleCard>

            <ExampleCard title="VirtualizedList 2" code={VirtualizedListBasicExample2Code}>
              <VirtualizedListBasicExample2 />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/VirtualizedList/VirtualizedList.types.ts')]}
          />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={<div />}
        donts={<div />}
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
