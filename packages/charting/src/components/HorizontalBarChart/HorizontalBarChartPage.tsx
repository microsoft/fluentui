import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { HorizontalBarChartBasicExample } from './examples/HorizontalBarChart.Basic.Example';
import { HorizontalBarChartBenchmarkExample } from './examples/HorizontalBarChart.Benchmark.Example';

const HorizontalBarChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/HorizontalBarChart/examples/HorizontalBarChart.Basic.Example.tsx') as string;

const HorizontalBarChartBenchmarkExampleCode = require('!raw-loader!@uifabric/charting/src/components/HorizontalBarChart/examples/HorizontalBarChart.Benchmark.Example.tsx') as string;

export class HorizontalBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="HorizontalBarChart"
        componentName="HorizontalBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="HorizontalBarChart basic" code={HorizontalBarChartBasicExampleCode}>
              <HorizontalBarChartBasicExample />
            </ExampleCard>
            <ExampleCard title="HorizontalBarChart with benchmark" code={HorizontalBarChartBenchmarkExampleCode}>
              <HorizontalBarChartBenchmarkExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/charting/src/components/HorizontalBarChart/HorizontalBarChart.types.ts')]}
          />
        }
        overview={
          <div>
            <p>HorizontalBarChart description</p>
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
