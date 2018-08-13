import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { StackedBarChartBasicExample } from './examples/StackedBarChart.Basic.Example';
import { StackedBarChartMultipleExample } from './examples/StackedBarChart.Multiple.Example';
import { StackedBarChartDynamicExample } from './examples/StackedBarChart.Dynamic.Example';
import { MultiStackedBarChartExample } from './examples/MultiStackedBarChart.Example';

const StackedBarChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/StackedBarChart.Basic.Example.tsx') as string;
const StackedBarChartMultipleExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/StackedBarChart.Multiple.Example.tsx') as string;
const StackedBarChartDynamicExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/StackedBarChart.Dynamic.Example.tsx') as string;
const MultiStackedBarChartExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/MultiStackedBarChart.Example.tsx') as string;

export class StackedBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="StackedBarChart"
        componentName="StackedBarChartExample"
        exampleCards={
          <div>
            <ExampleCard title="StackedBarChart basic" code={StackedBarChartBasicExampleCode}>
              <StackedBarChartBasicExample />
            </ExampleCard>
            <ExampleCard title="StackedBarChart with multiple data points" code={StackedBarChartMultipleExampleCode}>
              <StackedBarChartMultipleExample />
            </ExampleCard>
            <ExampleCard title="StackedBarChart dynamic" code={StackedBarChartDynamicExampleCode}>
              <StackedBarChartDynamicExample />
            </ExampleCard>
            <ExampleCard title="Multiple StackedBarCharts" code={MultiStackedBarChartExampleCode}>
              <MultiStackedBarChartExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/charting/src/components/StackedBarChart/StackedBarChart.types.ts')
            ]}
          />
        }
        overview={
          <div>
            <p>StackedBarChart description</p>
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
        related={
          <a href="https://dev.office.com/fabric-js/Components/StackedBarChart/StackedBarChart.html">Fabric JS</a>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
