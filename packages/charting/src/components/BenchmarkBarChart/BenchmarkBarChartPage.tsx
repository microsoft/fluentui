import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { BenchmarkBarChartBasicExample } from './examples/BenchmarkBarChart.Basic.Example';

const BenchmarkBarChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/BenchmarkBarChart/examples/BenchmarkBarChart.Basic.Example.tsx') as string;

export class BenchmarkBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="BenchmarkBarChart"
        componentName="BenchmarkBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="BenchmarkBarChart basic" code={BenchmarkBarChartBasicExampleCode}>
              <BenchmarkBarChartBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/charting/src/components/BenchmarkBarChart/BenchmarkBarChart.types.ts')]}
          />
        }
        overview={
          <div>
            <p>BenchmarkBarChart component is a bar chart with benchmark triangle</p>
          </div>
        }
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
