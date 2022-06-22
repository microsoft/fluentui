import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { StackedBarChartBasicExample } from './StackedBarChart.Basic.Example';
import { StackedBarChartBenchmarkExample } from './StackedBarChart.Benchmark.Example';
import { StackedBarChartMultipleExample } from './StackedBarChart.Multiple.Example';
import { StackedBarChartDynamicExample } from './StackedBarChart.Dynamic.Example';
import { StackedBarChartBaseBarExample } from './StackedBarChart.BaseBar.Example';
import { StackedBarChartCustomAccessibilityExample } from './StackedBarChart.CustomAccessibility.Example';

const StackedBarChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Basic.Example.tsx') as string;
const StackedBarChartBenchmarkExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Benchmark.Example.tsx') as string;
const StackedBarChartMultipleExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Multiple.Example.tsx') as string;
const StackedBarChartDynamicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Dynamic.Example.tsx') as string;
const StackedBarChartBaseBarExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.BaseBar.Example.tsx') as string;
const StackedBarChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.CustomAccessibility.Example.tsx') as string;

export class StackedBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Stacked Bar Chart"
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
            <ExampleCard
              title="StackedBarChart Custom Accessibility"
              code={StackedBarChartCustomAccessibilityExampleCode}
            >
              <StackedBarChartCustomAccessibilityExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/StackedBarChart/StackedBarChart.types.ts'),
            ]}
          />
        }
        overview={
          <div>
            <p>
              StackedBarChart shows the data in a bar format. It has two variations: single stacked and multi-stacked.
              Below are a few points that will help you understand the stacked bar chart better:
            </p>
            <ul>
              <li>The stacked bar chart comes with a legends component built in.</li>
              <li>Single stacked bar chart takes 'data' attribute which is of type IChartDataPoint[]</li>
              <li>
                Multi-stacked bar chart takes 'data' attribute which is of type IChartDataPoint[][]. It will render the
                chart based upon the values given to this attribute.
              </li>
              <li>
                Ratio on top of the chart is shown if it has only two data points. For the rest of cases the ratio is
                not shown
              </li>
              <li>
                A number is displayed on the top of stacked bar chart if it has only one data point. This number shown
                is the data you pass
              </li>
              <li>
                MultiStackedBarChart has a option 'showRatio' this will help you hide the ratio for the chart. It is a
                boolean[], you can use the values to control displaying ratio for each chart in MultiStackedBarChart.
              </li>
              <li>
                If a chart in MultiStackedBarChart shows ratio, legends are not displayed for that chart and vice-versa.
              </li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
