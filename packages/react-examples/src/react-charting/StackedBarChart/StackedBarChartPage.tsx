import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { StackedBarChartBasicExample } from './StackedBarChart.Basic.Example';
import { StackedBarChartBenchmarkExample } from './StackedBarChart.Benchmark.Example';
import { StackedBarChartMultipleExample } from './StackedBarChart.Multiple.Example';
import { StackedBarChartDynamicExample } from './StackedBarChart.Dynamic.Example';
import { StackedBarChartBaseBarExample } from './StackedBarChart.BaseBar.Example';
import { StackedBarChartCustomAccessibilityExample } from './StackedBarChart.CustomAccessibility.Example';

const StackedBarChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Basic.Example.tsx') as string;
const StackedBarChartBenchmarkExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Benchmark.Example.tsx') as string;
const StackedBarChartMultipleExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Multiple.Example.tsx') as string;
const StackedBarChartDynamicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Dynamic.Example.tsx') as string;
const StackedBarChartBaseBarExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.BaseBar.Example.tsx') as string;
const StackedBarChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.CustomAccessibility.Example.tsx') as string;

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
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/docs/StackedBarChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/docs/StackedBarChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/docs/StackedBarChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/docs/StackedBarChartDonts.md')}
          </Markdown>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
