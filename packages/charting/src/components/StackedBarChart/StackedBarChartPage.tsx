import * as React from 'react';

import { ComponentPage, ExampleCard, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';

import { StackedBarChartBasicExample } from './examples/StackedBarChart.Basic.Example';
import { StackedBarChartBenchmarkExample } from './examples/StackedBarChart.Benchmark.Example';
import { StackedBarChartMultipleExample } from './examples/StackedBarChart.Multiple.Example';
import { StackedBarChartDynamicExample } from './examples/StackedBarChart.Dynamic.Example';
import { MultiStackedBarChartExample } from './examples/MultiStackedBarChart.Example';
import { StackedBarChartBaseBarExample } from './examples/StackedBarChart.BaseBar.Example';
import { MultiStackedBarChartWithPlaceholderExample } from './examples/MultiStackedBarChartWithPlaceHolder.Example';

const StackedBarChartBasicExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/StackedBarChart.Basic.Example.tsx') as string;
const StackedBarChartBenchmarkExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/StackedBarChart.Benchmark.Example.tsx') as string;
const StackedBarChartMultipleExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/StackedBarChart.Multiple.Example.tsx') as string;
const StackedBarChartDynamicExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/StackedBarChart.Dynamic.Example.tsx') as string;
const MultiStackedBarChartExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/MultiStackedBarChart.Example.tsx') as string;
const StackedBarChartBaseBarExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/StackedBarChart.BaseBar.Example.tsx') as string;
const MultiStackedBarChartWithPlaceholderExampleCode = require('!raw-loader!@uifabric/charting/src/components/StackedBarChart/examples/MultiStackedBarChartWithPlaceHolder.Example.tsx') as string;

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
            <ExampleCard title="StackedBarChart benchmark" code={StackedBarChartBenchmarkExampleCode}>
              <StackedBarChartBenchmarkExample />
            </ExampleCard>
            <ExampleCard title="StackBarChart Empty" code={StackedBarChartBaseBarExampleCode}>
              <StackedBarChartBaseBarExample />
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
            <ExampleCard title="Multiple StackedBarCharts with placeholder" code={MultiStackedBarChartWithPlaceholderExampleCode}>
              <MultiStackedBarChartWithPlaceholderExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/charting/src/components/StackedBarChart/StackedBarChart.types.ts')]}
          />
        }
        overview={
          <div>
            <p>
              StackedBarChart shows the data in a bar format. It has two variations single stacked and multi-stacked bar chart.Below are few
              points that will help you understand the stacked bar chart better:
            </p>
            <ul>
              <li>The stacked bar chart comes with a legends component inbuilt</li>
              <li>Single stacked bar chart takes 'data' attribute which is of type IChartDataPoint[]</li>
              <li>
                Multi-Stacked bar chart takes 'data' attribute which is of type IChartDataPoint[][]. It will the render chart based upon the
                values given to this attribute
              </li>
              <li>Ratio on top of the chart is shown if it has only two data points. For the rest of cases the ratio is not shown</li>
              <li>
                A number is displayed on the top of stacked bar chart if it has only one data point. This number shown is the data you pass
              </li>
              <li>
                MultiStackedBarChart has a option 'showRatio' this will help you hide the ratio for the chart. It is a boolean[], you can
                use the values to control displaying ratio for each chart in MultiStackedBarChart.
              </li>
              <li>If a chart in MultiStackedBarChart shows ratio, legends are not displayed for that chart and vice-versa.</li>
            </ul>
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
